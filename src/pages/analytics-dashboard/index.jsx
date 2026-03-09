import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';


import Header from 'components/ui/Header';
import Breadcrumbs from 'components/ui/Breadcrumbs';

import Button from 'components/ui/Button';

import FilterPanel from './components/FilterPanel';
import AQIBarChart from './components/AQIBarChart';
import SoilPieChart from './components/SoilPieChart';
import ScatterPlotChart from './components/ScatterPlotChart';
import RadarMineralChart from './components/RadarMineralChart';
import DistrictComparisonTable from './components/DistrictComparisonTable';
import PerformanceCards from './components/PerformanceCards';
import ExportPanel from './components/ExportPanel';
import { useAllDistrictsData, buildAnalyticsArray } from 'hooks/useDistrictData';

const DEFAULT_DISTRICTS = ['Pune', 'Nashik', 'Nagpur', 'Mumbai City', 'Kolhapur', 'Satara'];
const DEFAULT_METRICS = ['aqi', 'soilFertility', 'nitrogen', 'phosphorus', 'potassium', 'organicCarbon'];

export default function AnalyticsDashboard() {
  const navigate = useNavigate();
  const { data: rawData, loading, dataSource, refresh } = useAllDistrictsData();
  const [selectedDistricts, setSelectedDistricts] = useState(DEFAULT_DISTRICTS);
  const [activeMetrics, setActiveMetrics] = useState(DEFAULT_METRICS);
  const [selectedDistrict, setSelectedDistrict] = useState('Pune');

  // Build flat analytics array from API data
  const ALL_DISTRICT_DATA = useMemo(() => buildAnalyticsArray(rawData), [rawData]);

  const handleMetricToggle = (key) => {
    setActiveMetrics(prev =>
      prev?.includes(key) ? (prev?.length > 1 ? prev?.filter(k => k !== key) : prev) : [...prev, key]
    );
  };

  const handleReset = () => {
    setSelectedDistricts(DEFAULT_DISTRICTS);
    setActiveMetrics(DEFAULT_METRICS);
  };

  const filteredData = useMemo(() =>
    ALL_DISTRICT_DATA?.filter(d => selectedDistricts?.includes(d?.district)),
    [selectedDistricts, ALL_DISTRICT_DATA]
  );

  const barData = useMemo(() => filteredData?.map(d => ({ district: d?.district?.length > 8 ? d?.district?.slice(0, 8) + '…' : d?.district, aqi: d?.aqi })), [filteredData]);
  const scatterData = useMemo(() => filteredData?.map(d => ({ district: d?.district, x: d?.populationDensity, y: d?.aqi })), [filteredData]);

  const radarData = useMemo(() => {
    const metrics = [
      { metric: 'Nitrogen', ...Object.fromEntries(filteredData?.map(d => [d?.district, d?.nitrogen])) },
      { metric: 'Phosphorus', ...Object.fromEntries(filteredData?.map(d => [d?.district, d?.phosphorus])) },
      { metric: 'Potassium', ...Object.fromEntries(filteredData?.map(d => [d?.district, Math.round(d?.potassium / 10)])) },
      { metric: 'Org. Carbon', ...Object.fromEntries(filteredData?.map(d => [d?.district, Math.round(d?.organicCarbon * 100)])) },
      { metric: 'Fertility', ...Object.fromEntries(filteredData?.map(d => [d?.district, d?.soilFertility])) },
      { metric: 'AQI/10', ...Object.fromEntries(filteredData?.map(d => [d?.district, Math.round(d?.aqi / 10)])) },
    ];
    return metrics;
  }, [filteredData]);

  const soilDist = useMemo(() => {
    const counts = {};
    ALL_DISTRICT_DATA?.forEach(d => { counts[d?.soilType] = (counts?.[d?.soilType] || 0) + 1; });
    return Object.entries(counts)?.map(([name, value]) => ({ name, value }));
  }, [ALL_DISTRICT_DATA]);

  const stats = useMemo(() => {
    if (!filteredData?.length) return { avgAqi: 0, bestDistrict: '-', avgFertility: '0', treesNeeded: '0' };
    const avgAqi = Math.round(filteredData?.reduce((s, d) => s + d?.aqi, 0) / filteredData?.length);
    const best = filteredData?.reduce((a, b) => a?.aqi < b?.aqi ? a : b);
    const avgFertility = Math.round(filteredData?.reduce((s, d) => s + d?.soilFertility, 0) / filteredData?.length);
    const trees = filteredData?.reduce((s, d) => s + Math.round(d?.aqi * 1200), 0);
    return {
      avgAqi,
      bestDistrict: best?.district,
      avgFertility,
      treesNeeded: trees?.toLocaleString('en-IN'),
    };
  }, [filteredData]);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-6 lg:py-8 space-y-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs items={[{ label: "Dashboard", path: "/dashboard-overview" }, { label: "Analytics Dashboard", path: "/analytics-dashboard" }]} />
          <div className="flex items-center gap-2">
            {loading ? (
              <span className="font-caption text-xs px-2 py-1 rounded-full" style={{ background: "var(--color-muted)", color: "var(--color-muted-foreground)" }}>Loading data…</span>
            ) : (
              <span className="font-caption text-xs px-2 py-1 rounded-full" style={{ background: dataSource === "api" ? "rgba(45,90,61,0.12)" : "var(--color-muted)", color: dataSource === "api" ? "var(--color-primary)" : "var(--color-muted-foreground)" }}>
                {dataSource === "api" ? "● Live API" : "● Static Data"}
              </span>
            )}
            <Button variant="outline" iconName="RefreshCw" iconPosition="left" onClick={refresh} disabled={loading}>Refresh</Button>
          </div>
        </div>

        <PerformanceCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="lg:col-span-1">
            <FilterPanel
              allDistricts={ALL_DISTRICT_DATA?.map(d => d?.district)}
              selectedDistricts={selectedDistricts}
              onDistrictToggle={(d) => setSelectedDistricts(prev => prev?.includes(d) ? prev?.filter(x => x !== d) : [...prev, d])}
              activeMetrics={activeMetrics}
              onMetricToggle={handleMetricToggle}
              onReset={handleReset}
            />
          </div>
          <div className="lg:col-span-3 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <AQIBarChart data={barData} />
              <SoilPieChart data={soilDist} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ScatterPlotChart data={scatterData} />
              <RadarMineralChart data={radarData} districts={selectedDistricts} />
            </div>
            <DistrictComparisonTable
              data={filteredData}
              activeMetrics={activeMetrics}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
            />
            <ExportPanel data={filteredData} />
          </div>
        </div>
      </main>
    </div>
  );
}