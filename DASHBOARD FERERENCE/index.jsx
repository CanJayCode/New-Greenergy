import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "components/ui/Header";
import EnvironmentalStatusBar from "components/ui/EnvironmentalStatusBar";
import QuickActionFAB from "components/ui/QuickActionFAB";
import Icon from "components/AppIcon";
import MetricCard from "./components/MetricCard";
import ImpactChart from "./components/ImpactChart";
import RecentActivity from "./components/RecentActivity";
import Leaderboard from "./components/Leaderboard";
import AlertsPanel from "./components/AlertsPanel";
import QuickActions from "./components/QuickActions";
import CampaignProgress from "./components/CampaignProgress";

const metrics = [
    {
        icon: "TreePine",
        label: "Total Trees Planted",
        value: "12,847",
        unit: "",
        trend: "+124 today",
        trendPositive: true,
        color: "var(--color-success)",
        progress: 64,
        subtitle: "Goal: 20,000 trees by Dec 2026",
    },
    {
        icon: "Wind",
        label: "CO₂ Absorbed",
        value: "284.6",
        unit: "tons",
        trend: "+2.3 this week",
        trendPositive: true,
        color: "var(--color-primary)",
        progress: 57,
        subtitle: "Annual target: 500 tons",
    },
    {
        icon: "Leaf",
        label: "Oxygen Generated",
        value: "411.8",
        unit: "tons",
        trend: "+3.4 this week",
        trendPositive: true,
        color: "var(--color-secondary)",
        progress: 69,
        subtitle: "Equivalent to 1,647 people/year",
    },
    {
        icon: "Thermometer",
        label: "Temp Reduction",
        value: "1.8",
        unit: "°C",
        trend: "+0.2 this month",
        trendPositive: true,
        color: "var(--color-accent)",
        progress: 45,
        subtitle: "Urban heat island mitigation",
    },
];

const dateRanges = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "This Year" },
];

const locationFilters = [
    { value: "all", label: "All Locations" },
    { value: "zone-a", label: "Central Park Zone A" },
    { value: "riverside", label: "Riverside Belt" },
    { value: "district-3", label: "Urban Forest District 3" },
    { value: "corridor", label: "Green Corridor North" },
];

export default function DashboardHome() {
    const [dateRange, setDateRange] = useState("30d");
    const [location, setLocation] = useState("all");

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <EnvironmentalStatusBar />
            <main className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
                {/* Page Header + Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <div>
                        <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground">Dashboard</h1>
                        <p className="text-sm text-muted-foreground font-caption">
                            Environmental impact overview · Updated {new Date()?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Date Range Filter */}
                        <div className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-2">
                            <Icon name="Calendar" size={14} color="var(--color-muted-foreground)" />
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e?.target?.value)}
                                className="text-xs font-caption text-foreground bg-transparent border-none outline-none cursor-pointer"
                                aria-label="Select date range"
                            >
                                {dateRanges?.map((d) => (
                                    <option key={d?.value} value={d?.value}>{d?.label}</option>
                                ))}
                            </select>
                        </div>
                        {/* Location Filter */}
                        <div className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-2">
                            <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
                            <select
                                value={location}
                                onChange={(e) => setLocation(e?.target?.value)}
                                className="text-xs font-caption text-foreground bg-transparent border-none outline-none cursor-pointer max-w-[140px]"
                                aria-label="Select location"
                            >
                                {locationFilters?.map((l) => (
                                    <option key={l?.value} value={l?.value}>{l?.label}</option>
                                ))}
                            </select>
                        </div>
                        {/* Export */}
                        <button className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-2 text-xs font-caption text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors duration-200">
                            <Icon name="Download" size={14} color="currentColor" />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                    </div>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
                    {metrics?.map((m) => (
                        <MetricCard key={m?.label} {...m} />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
                    {/* Left / Main Column */}
                    <div className="lg:col-span-2 flex flex-col gap-4 md:gap-5">
                        <ImpactChart />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                            <RecentActivity />
                            <CampaignProgress />
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="flex flex-col gap-4 md:gap-5">
                        <QuickActions />
                        <Leaderboard />
                        <AlertsPanel />
                    </div>
                </div>

                {/* Footer Nav Links */}
                <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-3">
                        <Link to="/smart-plantation-map" className="flex items-center gap-1.5 text-xs font-caption text-muted-foreground hover:text-primary transition-colors duration-200">
                            <Icon name="Map" size={13} color="currentColor" />
                            Plantation Map
                        </Link>
                        <Link to="/ai-tree-recommendation" className="flex items-center gap-1.5 text-xs font-caption text-muted-foreground hover:text-primary transition-colors duration-200">
                            <Icon name="Sparkles" size={13} color="currentColor" />
                            AI Recommendations
                        </Link>
                    </div>
                    <p className="text-xs text-muted-foreground font-caption">
                        © {new Date()?.getFullYear()} EcoTrack Environmental Platform
                    </p>
                </div>
            </main>
            <QuickActionFAB />
        </div>
    );
}