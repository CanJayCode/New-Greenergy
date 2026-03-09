import React, { useState, useEffect } from "react";
import Header from "components/ui/Header";
import Breadcrumbs from "components/ui/Breadcrumbs";
import MetricCard from "./components/MetricCard";
import QuickAccessToolbar from "./components/QuickAccessToolbar";
import RecentAnalysisFeed from "./components/RecentAnalysisFeed";
import DistrictPerformanceWidget from "./components/DistrictPerformanceWidget";
import PrimaryActionBanner from "./components/PrimaryActionBanner";
import EnvironmentalImpactSummary from "./components/EnvironmentalImpactSummary";
import { useAllDistrictsData } from "hooks/useDistrictData";

export default function DashboardOverview() {
  const { data: districtData, loading, dataSource } = useAllDistrictsData();

  // Compute live metrics from API data
  const avgAQI = districtData
    ? Math.round(Object.values(districtData)?.reduce((s, d) => s + d?.aqi, 0) / Object.values(districtData)?.length)
    : 134;
  const districtCount = districtData ? Object.keys(districtData)?.length : 21;

  const METRICS = [
    {
      icon: "Wind",
      label: "Maharashtra Avg AQI",
      value: loading ? "…" : String(avgAQI),
      unit: "µg/m³",
      trend: "down",
      trendValue: loading ? "Loading live data…" : `${dataSource === "api" ? "Live" : "Static"} · ${districtCount} districts`,
      color: "#f97316",
      bgGradient: "linear-gradient(135deg, #f97316, #ef4444)",
      delay: 0.05,
    },
    {
      icon: "Database",
      label: "Districts Analyzed",
      value: String(districtCount),
      unit: "/ 36",
      trend: "up",
      trendValue: "↑ 3 new this week",
      color: "#2D5A3D",
      bgGradient: "linear-gradient(135deg, #2D5A3D, #32CD32)",
      delay: 0.1,
    },
    {
      icon: "TreePine",
      label: "Active Projects",
      value: "47",
      unit: "projects",
      trend: "up",
      trendValue: "↑ 5 started today",
      color: "#32CD32",
      bgGradient: "linear-gradient(135deg, #228B22, #32CD32)",
      delay: 0.15,
    },
    {
      icon: "Leaf",
      label: "Soil Types Mapped",
      value: "4",
      unit: "types",
      trend: "neutral",
      trendValue: "Loamy, Black, Clay, Sandy",
      color: "#8B4513",
      bgGradient: "linear-gradient(135deg, #8B4513, #DAA520)",
      delay: 0.2,
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-6 lg:py-8 space-y-6 md:space-y-7">
        <Breadcrumbs items={[{ label: "Dashboard Overview", path: "/dashboard-overview" }]} />
        <PrimaryActionBanner />
        <section aria-label="Key environmental metrics">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {METRICS?.map((m) => <MetricCard key={m?.label} {...m} />)}
          </div>
        </section>
        <section aria-label="Quick access tools">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-heading font-semibold text-base md:text-lg" style={{ color: "var(--color-foreground)" }}>Platform Tools</span>
            <span className="px-2 py-0.5 rounded-full font-caption text-xs" style={{ background: "var(--color-muted)", color: "var(--color-muted-foreground)" }}>3 tools</span>
          </div>
          <QuickAccessToolbar />
        </section>
        <section aria-label="Environmental impact summary">
          <EnvironmentalImpactSummary />
        </section>
        <section aria-label="District analysis and performance">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
            <div className="lg:col-span-2">
              <RecentAnalysisFeed districtData={districtData} loading={loading} />
            </div>
            <div className="lg:col-span-1">
              <DistrictPerformanceWidget districtData={districtData} loading={loading} />
            </div>
          </div>
        </section>
        <footer className="pt-4 pb-2 border-t" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
              © {new Date()?.getFullYear()} VanaRaksha · Maharashtra Forest Department · Environmental Planning Platform
            </p>
            <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
              Data: {dataSource === "api" ? "Live WAQI API" : "Static fallback"} · {new Date()?.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}