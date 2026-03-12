import React, { useState } from 'react';
import Header from 'components/ui/Header';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import MaharashtraMap from './components/MaharashtraMap';
import AQILegend from './components/AQILegend';
import DistrictSearchFilter from './components/DistrictSearchFilter';
import DistrictDetailPanel from './components/DistrictDetailPanel';
import { useAllDistrictsData } from 'hooks/useDistrictData';

export default function AQIHeatmap() {
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [aqiRange, setAQIRange] = useState([0, 350]);
    const [activePollutant, setActivePollutant] = useState("aqi");
    const { data: districtData, loading } = useAllDistrictsData();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const POLLUTANTS = [
        { id: "aqi", name: "AQI", unit: "" },
        { id: "pm25", name: "PM2.5", unit: "μg/m³" },
        { id: "pm10", name: "PM10", unit: "μg/m³" },
        { id: "no2", name: "NO₂", unit: "μg/m³" },
    ];

    // Dynamic resize listener for layout stability
    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mapping for Header's human-readable names to our internal IDs
    const handleHeaderDistrictChange = (name) => {
        if (!name) {
            setSelectedDistrict(null);
            return;
        }
        // Match the ID format in MAHARASHTRA_GEOJSON properties
        const id = name.toLowerCase()
            .replace(/\s+/g, '_');
        setSelectedDistrict(id);
    };

    // Mapping for selected ID back to Header name
    const selectedDistrictName = selectedDistrict
        ? selectedDistrict.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        : '';

    return (
        <div className="min-h-screen flex flex-col" style={{ background: "var(--color-background)" }}>
            <Header
                selectedDistrict={selectedDistrictName}
                onDistrictChange={handleHeaderDistrictChange}
            />
            <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-40">
                    <div className="space-y-1">
                        <Breadcrumbs items={[{ label: "Dashboard", path: "/dashboard-overview" }, { label: "AQI Heatmap", path: "/aqi-heatmap" }]} />
                        <h1 className="font-heading font-bold text-xl md:text-2xl text-foreground">Interactive AQI Heatmap</h1>
                    </div>
                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
                        {POLLUTANTS.map(p => (
                            <button
                                key={p.id}
                                onClick={() => setActivePollutant(p.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-caption transition-all ${
                                    activePollutant === p.id 
                                    ? "bg-primary text-white shadow-lg" 
                                    : "text-white/60 hover:text-white"
                                }`}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    className="relative rounded-2xl border overflow-hidden shadow-2xl"
                    style={{
                        background: "#0d1a0d",
                        borderColor: "var(--color-border)",
                        height: "650px"
                    }}
                >
                    <MaharashtraMap
                        selectedDistrict={selectedDistrict}
                        onDistrictClick={setSelectedDistrict}
                        aqiRange={aqiRange}
                        districtData={districtData}
                        activePollutant={activePollutant}
                    />

                    {/* Floating Legend */}
                    <div className="absolute top-4 left-4 z-[1000] p-3 rounded-xl backdrop-blur-md bg-card/80 border shadow-lg" style={{ borderColor: "var(--color-border)" }}>
                        <p className="font-caption text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">AQI Legend</p>
                        <AQILegend />
                    </div>

                    {/* Loading State Overlay */}
                    {loading && (
                        <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-background/40 backdrop-blur-[2px]">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                <span className="font-caption text-sm text-foreground font-medium">Updating real-time AQI...</span>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <DistrictDetailPanel
                districtId={selectedDistrict}
                onClose={() => setSelectedDistrict(null)}
                districtData={districtData}
                isMobile={isMobile}
            />
        </div>
    );
}
