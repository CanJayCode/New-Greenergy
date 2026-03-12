import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "components/AppIcon";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="rounded-xl p-3 shadow-xl border backdrop-blur-md"
                style={{
                    background: "var(--color-card)",
                    borderColor: "var(--color-border)",
                    boxShadow: "var(--shadow-lg)"
                }}
            >
                <p className="text-xs font-heading font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--color-muted-foreground)" }}>{label}</p>
                <div className="space-y-1.5">
                    {payload.map((entry) => (
                        <div key={entry.dataKey} className="flex items-center gap-2 text-xs font-caption">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span style={{ color: "var(--color-muted-foreground)" }} className="capitalize">{entry.name}:</span>
                            <span className="font-bold font-data" style={{ color: "var(--color-foreground)" }}>{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

// Haversine formula for distance calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Generate a realistic 24-hour diurnal trend based on current live data
const generateDiurnalTrend = (baseData) => {
    if (!baseData) return [];
    // Typical pollution curve: night (low), morning rush (high), afternoon (drop), evening rush (high)
    const timepoints = [
        { time: "00:00", mult: 0.75 }, { time: "04:00", mult: 0.70 },
        { time: "08:00", mult: 1.15 }, { time: "12:00", mult: 0.90 },
        { time: "16:00", mult: 0.95 }, { time: "20:00", mult: 1.20 },
        { time: "23:59", mult: 0.85 }
    ];
    
    return timepoints.map((tp) => {
        // slight jitter for realism
        const jitter = () => 0.95 + Math.random() * 0.1;
        const basePm25 = baseData.pm25 || baseData.aqi * 0.4;
        const basePm10 = baseData.pm10 || baseData.aqi * 0.6;
        return {
            name: tp.time,
            aqi: Math.round(baseData.aqi * tp.mult * jitter()),
            pm25: Math.round(basePm25 * tp.mult * jitter()),
            pm10: Math.round(basePm10 * tp.mult * jitter()),
        }
    });
};

export default function ImpactTrendsChart({ districtData, loading }) {
    const [scanState, setScanState] = useState("idle"); // idle, scanning, complete, error
    const [localDistrict, setLocalDistrict] = useState(null);
    const [trendData, setTrendData] = useState([]);

    // Theme-aware colors
    const colors = {
        aqi: "var(--color-primary)",   
        pm25: "var(--color-warning)",  
        pm10: "var(--color-accent)",   
    };

    const runLocationScan = () => {
        if (!navigator.geolocation) {
            setScanState("error");
            return;
        }

        setScanState("scanning");
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                
                if (districtData) {
                    const districts = Object.values(districtData);
                    let closest = null;
                    let minDistance = Infinity;

                    districts.forEach(d => {
                        const dist = calculateDistance(userLat, userLon, d.lat, d.lon);
                        if (dist < minDistance) {
                            minDistance = dist;
                            closest = d;
                        }
                    });

                    // Add artificial delay for "scanning" effect
                    setTimeout(() => {
                        setLocalDistrict(closest);
                        setTrendData(generateDiurnalTrend(closest));
                        setScanState("complete");
                    }, 1500);
                }
            },
            (error) => {
                console.warn("Geolocation skipped/failed:", error);
                // Fallback to average view or default if user denies
                setScanState("error");
            },
            { timeout: 10000 }
        );
    };

    if (loading) {
        return (
            <div 
                className="rounded-2xl overflow-hidden p-6 animate-pulse"
                style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", height: "400px" }}
            >
                <div className="h-6 w-48 bg-muted rounded mb-4" />
                <div className="h-4 w-64 bg-muted rounded mb-8" />
                <div className="w-full h-64 bg-muted rounded" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl overflow-hidden p-5 md:p-6 relative"
            style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
                minHeight: "400px"
            }}
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-lg font-heading font-bold leading-tight flex items-center gap-2" style={{ color: "var(--color-foreground)" }}>
                        Local Atmospheric Profile
                        {scanState === "complete" && localDistrict && (
                            <span className="px-2 py-0.5 rounded-full font-caption text-[10px] uppercase tracking-wider" style={{ background: "var(--color-primary)", color: "#fff" }}>
                                {localDistrict.name}
                            </span>
                        )}
                    </h3>
                    <p className="text-xs font-caption mt-1" style={{ color: "var(--color-muted-foreground)" }}>
                        24-hour pollutant trend formulation based on live localized telemetry
                    </p>
                </div>

                {scanState !== "scanning" && (
                    <button 
                        onClick={runLocationScan}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-caption font-bold shadow-sm transition-transform hover:scale-105"
                        style={{ background: "var(--color-muted)", color: "var(--color-primary)" }}
                    >
                        <Icon name="LocateFixed" size={14} />
                        {scanState === "complete" ? "Rescan Location" : "Scan My Location"}
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {scanState === "idle" && (
                    <motion.div 
                        key="idle"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-card/50 backdrop-blur-sm z-10"
                        style={{ marginTop: "80px" }}
                    >
                        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: "var(--color-muted)" }}>
                            <Icon name="MapPin" size={32} color="var(--color-muted-foreground)" />
                        </div>
                        <p className="font-heading font-semibold text-lg" style={{ color: "var(--color-foreground)" }}>Location Not Scanned</p>
                        <p className="font-caption text-sm mb-4" style={{ color: "var(--color-muted-foreground)" }}>Click scan to view analytics for your specific district.</p>
                        <button 
                            onClick={runLocationScan}
                            className="px-6 py-2.5 rounded-xl font-caption text-sm font-bold text-white transition-opacity hover:opacity-90"
                            style={{ background: "var(--color-primary)" }}
                        >
                            Start Scan
                        </button>
                    </motion.div>
                )}

                {scanState === "scanning" && (
                    <motion.div 
                        key="scanning"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center z-10"
                        style={{ marginTop: "80px" }}
                    >
                        <div className="relative flex items-center justify-center">
                            {/* Radar sweep animation */}
                            <div className="absolute w-32 h-32 rounded-full border-2 border-primary/20" />
                            <div className="absolute w-24 h-24 rounded-full border-2 border-primary/40" />
                            <div className="absolute w-16 h-16 rounded-full border-2 border-primary/60" />
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute w-32 h-32 rounded-full border-t-2 border-primary"
                            />
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary">
                                <Icon name="Radar" size={20} color="#fff" />
                            </div>
                        </div>
                        <p className="font-caption text-sm font-medium mt-6 animate-pulse" style={{ color: "var(--color-primary)" }}>
                            Triangulating nearest environmental station...
                        </p>
                    </motion.div>
                )}

                {scanState === "error" && (
                    <motion.div 
                        key="error"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-card/50 backdrop-blur-sm z-10"
                        style={{ marginTop: "80px" }}
                    >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(178,34,34,0.1)" }}>
                            <Icon name="MapPinOff" size={24} color="var(--color-error)" />
                        </div>
                        <p className="font-heading font-semibold text-lg" style={{ color: "var(--color-foreground)" }}>Location Access Denied</p>
                        <p className="font-caption text-sm text-center max-w-xs" style={{ color: "var(--color-muted-foreground)" }}>
                            We couldn't access your location. Please check browser permissions and try again.
                        </p>
                    </motion.div>
                )}

                {scanState === "complete" && trendData.length > 0 && (
                    <motion.div 
                        key="chart"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-[300px] md:h-[350px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.aqi} stopOpacity={0.25} />
                                        <stop offset="95%" stopColor={colors.aqi} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="pm25Grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.pm25} stopOpacity={0.25} />
                                        <stop offset="95%" stopColor={colors.pm25} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="pm10Grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.pm10} stopOpacity={0.2} />
                                        <stop offset="95%" stopColor={colors.pm10} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)", fontFamily: "var(--font-caption)" }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)", fontFamily: "var(--font-data)" }}
                                    axisLine={false}
                                    tickLine={false}
                                    dx={-5}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-primary)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                <Legend
                                    iconType="circle"
                                    iconSize={8}
                                    wrapperStyle={{
                                        fontSize: "11px",
                                        fontFamily: "var(--font-caption)",
                                        paddingTop: "24px",
                                        fontWeight: 600,
                                        color: "var(--color-foreground)"
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="aqi"
                                    stroke={colors.aqi}
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#aqiGrad)"
                                    name="AQI Index"
                                    animationDuration={1500}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="pm25"
                                    stroke={colors.pm25}
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#pm25Grad)"
                                    name="PM2.5 (µg/m³)"
                                    animationDuration={1500}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="pm10"
                                    stroke={colors.pm10}
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#pm10Grad)"
                                    name="PM10 (µg/m³)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
