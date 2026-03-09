import { useState, useEffect, useCallback, useRef } from "react";
import { fetchAllDistrictsData, fetchDistrictData, DISTRICT_META, STATIC_AQI_DATA, getAQILevel, getAQIMultiplier } from "../services/districtDataService";

// Cache to avoid re-fetching within the same session
const cache = { all: null, districts: {} };

// Hook: fetch all 21 districts
export function useAllDistrictsData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState("static");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (cache?.all) {
        setData(cache?.all);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const result = await fetchAllDistrictsData();
        if (!cancelled) {
          cache.all = result;
          setData(result);
          const sources = Object.values(result)?.map((d) => d?.source);
          setDataSource(sources?.some((s) => s === "api") ? "api" : "static");
        }
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const refresh = useCallback(() => {
    cache.all = null;
    setData(null);
    setLoading(true);
    setError(null);
    fetchAllDistrictsData()?.then((result) => {
      cache.all = result;
      setData(result);
      const sources = Object.values(result)?.map((d) => d?.source);
      setDataSource(sources?.some((s) => s === "api") ? "api" : "static");
      setLoading(false);
    })?.catch((err) => {
      setError(err);
      setLoading(false);
    });
  }, []);

  return { data, loading, error, dataSource, refresh };
}

// Hook: fetch a single district
export function useDistrictData(districtId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const prevId = useRef(null);

  useEffect(() => {
    if (!districtId) { setData(null); return; }
    if (prevId?.current === districtId && cache?.districts?.[districtId]) {
      setData(cache?.districts?.[districtId]);
      return;
    }
    prevId.current = districtId;
    let cancelled = false;
    setLoading(true);
    fetchDistrictData(districtId)?.then((result) => {
      if (!cancelled) {
        cache.districts[districtId] = result;
        setData(result);
        setLoading(false);
      }
    })?.catch((err) => {
      if (!cancelled) { setError(err); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [districtId]);

  return { data, loading, error };
}

// Utility: build flat array for analytics dashboard
export function buildAnalyticsArray(allData) {
  if (!allData) return [];
  return Object.values(allData)?.map((d) => ({
    district:         d?.name,
    aqi:              d?.aqi,
    soilType:         d?.soilType?.includes("Black") ? "Black" : d?.soilType?.includes("Loamy") ? "Loamy" : d?.soilType?.includes("Clay") ? "Clay" : "Sandy",
    soilFertility:    d?.soilFertility,
    nitrogen:         d?.n,
    phosphorus:       d?.p,
    potassium:        d?.k,
    organicCarbon:    d?.oc,
    populationDensity: d?.populationDensity,
  }));
}

export { DISTRICT_META, STATIC_AQI_DATA, getAQILevel, getAQIMultiplier };
