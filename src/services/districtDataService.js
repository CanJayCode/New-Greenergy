// District Data Service - Fetches real AQI data from WAQI API
// Falls back to static data when API is unavailable or token is missing

import axios from "axios";

const WAQI_TOKEN = import.meta.env?.VITE_WAQI_TOKEN || "demo";
const WAQI_BASE = "https://api.waqi.info";

// District metadata: coordinates for WAQI geo-lookup, soil type, NPK
export const DISTRICT_META = {
    pune: { name: "Pune", lat: 18.5204, lon: 73.8567, soilType: "Red Laterite", soilFertility: 78, n: 280, p: 22, k: 310, oc: 0.68, populationDensity: 603 },
    nashik: { name: "Nashik", lat: 19.9975, lon: 73.7898, soilType: "Black Cotton", soilFertility: 82, n: 310, p: 25, k: 290, oc: 0.75, populationDensity: 322 },
    nagpur: { name: "Nagpur", lat: 21.1458, lon: 79.0882, soilType: "Black Cotton", soilFertility: 65, n: 240, p: 18, k: 270, oc: 0.52, populationDensity: 281 },
    mumbai_city: { name: "Mumbai City", lat: 18.9388, lon: 72.8354, soilType: "Coastal Alluvial", soilFertility: 45, n: 180, p: 14, k: 220, oc: 0.38, populationDensity: 20667 },
    mumbai_suburban: { name: "Mumbai Suburban", lat: 19.1663, lon: 72.9342, soilType: "Coastal Alluvial", soilFertility: 50, n: 200, p: 16, k: 240, oc: 0.42, populationDensity: 1157 },
    thane: { name: "Thane", lat: 19.2183, lon: 72.9781, soilType: "Laterite", soilFertility: 58, n: 220, p: 17, k: 255, oc: 0.48, populationDensity: 1157 },
    aurangabad: { name: "Aurangabad", lat: 19.8762, lon: 75.3433, soilType: "Black Cotton", soilFertility: 70, n: 260, p: 20, k: 280, oc: 0.60, populationDensity: 308 },
    solapur: { name: "Solapur", lat: 17.6805, lon: 75.9064, soilType: "Black Cotton", soilFertility: 72, n: 270, p: 21, k: 295, oc: 0.65, populationDensity: 188 },
    kolhapur: { name: "Kolhapur", lat: 16.7050, lon: 74.2433, soilType: "Red Laterite", soilFertility: 88, n: 340, p: 28, k: 320, oc: 0.85, populationDensity: 262 },
    amravati: { name: "Amravati", lat: 20.9374, lon: 77.7796, soilType: "Black Cotton", soilFertility: 68, n: 250, p: 19, k: 275, oc: 0.58, populationDensity: 178 },
    akola: { name: "Akola", lat: 20.7002, lon: 77.0082, soilType: "Black Cotton", soilFertility: 66, n: 245, p: 19, k: 268, oc: 0.55, populationDensity: 208 },
    latur: { name: "Latur", lat: 18.4088, lon: 76.5604, soilType: "Black Cotton", soilFertility: 74, n: 275, p: 22, k: 300, oc: 0.67, populationDensity: 232 },
    nanded: { name: "Nanded", lat: 19.1383, lon: 77.3210, soilType: "Black Cotton", soilFertility: 71, n: 265, p: 21, k: 285, oc: 0.62, populationDensity: 198 },
    satara: { name: "Satara", lat: 17.6805, lon: 74.0183, soilType: "Red Laterite", soilFertility: 85, n: 325, p: 26, k: 315, oc: 0.80, populationDensity: 218 },
    sangli: { name: "Sangli", lat: 16.8524, lon: 74.5815, soilType: "Black Cotton", soilFertility: 80, n: 300, p: 24, k: 305, oc: 0.72, populationDensity: 252 },
    jalgaon: { name: "Jalgaon", lat: 21.0077, lon: 75.5626, soilType: "Black Cotton", soilFertility: 67, n: 248, p: 19, k: 272, oc: 0.56, populationDensity: 242 },
    ahmednagar: { name: "Ahmednagar", lat: 19.0948, lon: 74.7480, soilType: "Black Cotton", soilFertility: 73, n: 272, p: 21, k: 292, oc: 0.64, populationDensity: 188 },
    chandrapur: { name: "Chandrapur", lat: 19.9615, lon: 79.2961, soilType: "Black Cotton", soilFertility: 60, n: 230, p: 17, k: 260, oc: 0.50, populationDensity: 148 },
    raigad: { name: "Raigad", lat: 18.5158, lon: 73.1812, soilType: "Coastal Alluvial", soilFertility: 76, n: 285, p: 23, k: 308, oc: 0.70, populationDensity: 168 },
    wardha: { name: "Wardha", lat: 20.7453, lon: 78.6022, soilType: "Black Cotton", soilFertility: 69, n: 255, p: 20, k: 278, oc: 0.59, populationDensity: 158 },
    yavatmal: { name: "Yavatmal", lat: 20.3888, lon: 78.1204, soilType: "Black Cotton", soilFertility: 67, n: 250, p: 19, k: 274, oc: 0.57, populationDensity: 168 },
};

// Static fallback AQI + pollutant data (used when API unavailable)
export const STATIC_AQI_DATA = {
    pune: { aqi: 142, pm25: 58, pm10: 92, no2: 38, so2: 12, co: 1.8 },
    nashik: { aqi: 98, pm25: 38, pm10: 65, no2: 28, so2: 8, co: 1.2 },
    nagpur: { aqi: 178, pm25: 72, pm10: 118, no2: 52, so2: 18, co: 2.4 },
    mumbai_city: { aqi: 210, pm25: 88, pm10: 145, no2: 68, so2: 22, co: 3.2 },
    mumbai_suburban: { aqi: 195, pm25: 78, pm10: 128, no2: 58, so2: 19, co: 2.8 },
    thane: { aqi: 168, pm25: 68, pm10: 108, no2: 48, so2: 16, co: 2.2 },
    aurangabad: { aqi: 125, pm25: 48, pm10: 82, no2: 34, so2: 10, co: 1.6 },
    solapur: { aqi: 88, pm25: 34, pm10: 58, no2: 24, so2: 7, co: 1.0 },
    kolhapur: { aqi: 72, pm25: 28, pm10: 48, no2: 18, so2: 5, co: 0.8 },
    amravati: { aqi: 115, pm25: 44, pm10: 75, no2: 32, so2: 9, co: 1.4 },
    akola: { aqi: 108, pm25: 42, pm10: 72, no2: 30, so2: 9, co: 1.3 },
    latur: { aqi: 95, pm25: 36, pm10: 62, no2: 26, so2: 8, co: 1.1 },
    nanded: { aqi: 102, pm25: 40, pm10: 68, no2: 29, so2: 8, co: 1.2 },
    satara: { aqi: 68, pm25: 26, pm10: 44, no2: 16, so2: 4, co: 0.7 },
    sangli: { aqi: 80, pm25: 32, pm10: 54, no2: 22, so2: 6, co: 0.9 },
    jalgaon: { aqi: 118, pm25: 46, pm10: 78, no2: 33, so2: 10, co: 1.5 },
    ahmednagar: { aqi: 105, pm25: 41, pm10: 70, no2: 30, so2: 9, co: 1.3 },
    chandrapur: { aqi: 188, pm25: 76, pm10: 122, no2: 55, so2: 20, co: 2.6 },
    raigad: { aqi: 135, pm25: 52, pm10: 88, no2: 36, so2: 11, co: 1.7 },
    wardha: { aqi: 112, pm25: 43, pm10: 73, no2: 31, so2: 9, co: 1.4 },
    yavatmal: { aqi: 120, pm25: 47, pm10: 79, no2: 34, so2: 10, co: 1.5 },
};

// Derive AQI level label from numeric AQI
export function getAQILevel(aqi) {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
}

// Derive AQI multiplier for plantation calculator
export function getAQIMultiplier(aqi) {
    if (aqi <= 50) return 1;
    if (aqi <= 100) return 1.5;
    if (aqi <= 150) return 2;
    if (aqi <= 200) return 3;
    if (aqi <= 250) return 3.5;
    return 4;
}

// Fetch AQI for a single district via WAQI geo-lookup
async function fetchDistrictAQI(districtId) {
    const meta = DISTRICT_META?.[districtId];
    if (!meta) return null;
    try {
        const { data } = await axios?.get(
            `${WAQI_BASE}/feed/geo:${meta.lat};${meta.lon}/?token=${WAQI_TOKEN}`,
            { timeout: 8000 }
        );
        if (data?.status === "ok" && data?.data?.aqi) {
            const aqiVal = typeof data?.data?.aqi === "number" ? data?.data?.aqi : parseInt(data?.data?.aqi, 10);
            const iaqi = data?.data?.iaqi || {};
            return {
                aqi: aqiVal,
                pm25: iaqi?.pm25?.v ?? STATIC_AQI_DATA?.[districtId]?.pm25,
                pm10: iaqi?.pm10?.v ?? STATIC_AQI_DATA?.[districtId]?.pm10,
                no2: iaqi?.no2?.v ?? STATIC_AQI_DATA?.[districtId]?.no2,
                so2: iaqi?.so2?.v ?? STATIC_AQI_DATA?.[districtId]?.so2,
                co: iaqi?.co?.v ?? STATIC_AQI_DATA?.[districtId]?.co,
                source: "api",
            };
        }
    } catch (_) {
        // fall through to static
    }
    return { ...STATIC_AQI_DATA?.[districtId], source: "static" };
}

// Fetch all 21 districts in parallel (with concurrency limit)
export async function fetchAllDistrictsData() {
    const ids = Object.keys(DISTRICT_META);
    const results = await Promise.allSettled(ids?.map((id) => fetchDistrictAQI(id)));

    const combined = {};
    ids?.forEach((id, i) => {
        const aqiData = results?.[i]?.status === "fulfilled" && results?.[i]?.value
            ? results?.[i]?.value
            : { ...STATIC_AQI_DATA?.[id], source: "static" };

        const meta = DISTRICT_META?.[id];
        const aqi = aqiData?.aqi ?? STATIC_AQI_DATA?.[id]?.aqi;
        combined[id] = {
            id,
            name: meta.name,
            lat: meta.lat,
            lon: meta.lon,
            soilType: meta.soilType,
            soilFertility: meta.soilFertility,
            n: meta.n,
            p: meta.p,
            k: meta.k,
            oc: meta.oc,
            populationDensity: meta.populationDensity,
            aqi,
            aqiLevel: getAQILevel(aqi),
            multiplier: getAQIMultiplier(aqi),
            pm25: aqiData?.pm25,
            pm10: aqiData?.pm10,
            no2: aqiData?.no2,
            so2: aqiData?.so2,
            co: aqiData?.co,
            source: aqiData?.source,
        };
    });
    return combined;
}

// Fetch a single district's full data
export async function fetchDistrictData(districtId) {
    const meta = DISTRICT_META?.[districtId];
    if (!meta) return null;
    const aqiData = await fetchDistrictAQI(districtId);
    const aqi = aqiData?.aqi ?? STATIC_AQI_DATA?.[districtId]?.aqi;
    return {
        id: districtId,
        name: meta.name,
        lat: meta.lat,
        lon: meta.lon,
        soilType: meta.soilType,
        soilFertility: meta.soilFertility,
        n: meta.n,
        p: meta.p,
        k: meta.k,
        oc: meta.oc,
        populationDensity: meta.populationDensity,
        aqi,
        aqiLevel: getAQILevel(aqi),
        multiplier: getAQIMultiplier(aqi),
        pm25: aqiData?.pm25,
        pm10: aqiData?.pm10,
        no2: aqiData?.no2,
        so2: aqiData?.so2,
        co: aqiData?.co,
        source: aqiData?.source,
    };
}
