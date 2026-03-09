import React from 'react';
import Header from 'components/ui/Header';
import Breadcrumbs from 'components/ui/Breadcrumbs';

export default function AQIHeatmap() {
    return (
        <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
            <Header />
            <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-6 lg:py-8 space-y-6">
                <Breadcrumbs items={[{ label: "Dashboard", path: "/dashboard-overview" }, { label: "AQI Heatmap", path: "/aqi-heatmap" }]} />
                <div className="bg-card rounded-2xl p-8 border text-center" style={{ borderColor: 'var(--color-border)' }}>
                    <h2 className="text-2xl font-bold mb-4">AQI Heatmap</h2>
                    <p className="text-muted-foreground">The geographic AQI visualization is coming soon.</p>
                </div>
            </main>
        </div>
    );
}
