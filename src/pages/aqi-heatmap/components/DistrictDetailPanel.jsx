import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Icon from "components/AppIcon";
import { getAQIColor } from "./MaharashtraGeoData";

const POLLUTANT_COLORS = { pm25: "#f97316", pm10: "#ef4444", no2: "#a855f7", so2: "#eab308", co: "#22c55e" };
const POLLUTANT_LABELS = { pm25: "PM2.5", pm10: "PM10", no2: "NO₂", so2: "SO₂", co: "CO" };
const POLLUTANT_UNITS = { pm25: "μg/m³", pm10: "μg/m³", no2: "μg/m³", so2: "μg/m³", co: "mg/m³" };
const POLLUTANT_MAX = { pm25: 150, pm10: 250, no2: 100, so2: 50, co: 5 };

function GaugeBar({ label, value, max, color, unit }) {
    const pct = Math.min((value / max) * 100, 100);
    return (
        <div className="mb-2.5">
            <div className="flex justify-between items-center mb-1">
                <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)", fontSize: "0.72rem" }}>{label}</span>
                <span className="font-data text-xs font-semibold" style={{ color }}>{value} <span style={{ color: "var(--color-muted-foreground)", fontWeight: 400 }}>{unit}</span></span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="h-full rounded-full"
                    style={{ background: color }}
                />
            </div>
        </div>
    );
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
        return (
            <div className="rounded-lg px-3 py-2" style={{ background: "rgba(15,31,15,0.95)", border: "1px solid rgba(50,205,50,0.3)", backdropFilter: "blur(8px)" }}>
                <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)", fontSize: "0.7rem" }}>{label}</p>
                <p className="font-data text-sm font-bold" style={{ color: payload?.[0]?.color }}>
                    {payload?.[0]?.value} {payload?.[0]?.payload?.unit}
                </p>
            </div>
        );
    }
    return null;
};

export default function DistrictDetailPanel({ districtId, onClose, isMobile, districtData }) {
    const data = districtData?.[districtId];

    // If no ID is selected, don't show anything
    if (!districtId) return null;

    // Show a loading state inside the panel if data is missing
    const isLoading = !data;

    // If loading, show a simplified state or the header at least
    const aqiInfo = !isLoading ? getAQIColor(data?.aqi) : { fill: "#444", label: "Loading..." };

    // Build pollutant chart data from API-fetched values
    const chartData = !isLoading ? Object.entries(POLLUTANT_LABELS)?.map(([key, label]) => ({
        name: label,
        value: data?.[key] ?? 0,
        unit: POLLUTANT_UNITS?.[key],
        color: POLLUTANT_COLORS?.[key],
    })) : [];

    const panelVariants = isMobile
        ? {
            hidden: { y: "100%", opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 28, stiffness: 300 } },
            exit: { y: "100%", opacity: 0, transition: { duration: 0.25 } },
        }
        : {
            hidden: { x: "100%", opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 28, stiffness: 300 } },
            exit: { x: "100%", opacity: 0, transition: { duration: 0.25 } },
        };

    const panelStyle = isMobile
        ? { position: "fixed", bottom: 0, left: 0, right: 0, maxHeight: "85vh", borderRadius: "24px 24px 0 0", zIndex: 10001, overflowY: "auto" }
        : { position: "fixed", top: 0, right: 0, width: 400, height: "100vh", zIndex: 10001, overflowY: "auto" };

    return (
        <AnimatePresence mode="wait">
            {districtId && (
                <div key="panel-root">
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 10000, backdropFilter: "blur(4px)" }}
                    />
                    <motion.div
                        key="panel"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            ...panelStyle,
                            background: "linear-gradient(160deg, #0F1F0F 0%, #1A2F1A 60%, #0d1a0d 100%)",
                            borderLeft: isMobile ? "none" : "1px solid rgba(50,205,50,0.2)",
                            borderTop: isMobile ? "1px solid rgba(50,205,50,0.2)" : "none",
                            boxShadow: "-8px 0 40px rgba(0,0,0,0.6)",
                        }}
                    >
                        {/* Header */}
                        <div className="sticky top-0 flex items-center justify-between px-5 py-4"
                            style={{ background: "linear-gradient(160deg, #0F1F0F 0%, #1A2F1A 100%)", borderBottom: "1px solid rgba(50,205,50,0.15)", backdropFilter: "blur(12px)", zIndex: 10 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center rounded-xl"
                                    style={{ width: 36, height: 36, background: `${aqiInfo?.fill}22`, border: `1px solid ${aqiInfo?.fill}44` }}
                                >
                                    <Icon name="MapPin" size={16} color={aqiInfo?.fill} />
                                </div>
                                <div>
                                    <h2 className="font-heading font-bold text-base" style={{ color: "#E0E8E0" }}>
                                        {isLoading ? "Fetching details..." : data?.name}
                                    </h2>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full font-caption text-xs font-semibold"
                                        style={{ background: `${aqiInfo?.fill}22`, color: aqiInfo?.fill, fontSize: "0.68rem" }}
                                    >
                                        {aqiInfo?.label}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {data?.source === "api" && (
                                    <span className="font-caption text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(50,205,50,0.12)", color: "#32CD32", fontSize: "0.62rem" }}>Live</span>
                                )}
                                <button onClick={onClose}
                                    className="flex items-center justify-center rounded-lg transition-colors duration-150"
                                    style={{ width: 32, height: 32, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                                >
                                    <Icon name="X" size={15} color="#8FA88F" />
                                </button>
                            </div>
                        </div>

                        <div className="px-5 py-4 space-y-5">
                            {/* AQI Value */}
                            <div className="rounded-2xl p-4 flex items-center justify-between"
                                style={{ background: `${aqiInfo?.fill}12`, border: `1px solid ${aqiInfo?.fill}30` }}
                            >
                                <div>
                                    <p className="font-caption text-xs mb-1" style={{ color: "#8FA88F", fontSize: "0.72rem" }}>Current AQI</p>
                                    <p className="font-data font-bold text-4xl" style={{ color: aqiInfo?.fill }}>{data?.aqi}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-caption text-xs mb-1" style={{ color: "#8FA88F", fontSize: "0.72rem" }}>AQI Multiplier</p>
                                    <p className="font-data font-bold text-2xl" style={{ color: "#32CD32" }}>{data?.multiplier}x</p>
                                </div>
                            </div>

                            {/* Soil Info */}
                            <div className="rounded-xl px-4 py-3 flex items-center gap-3"
                                style={{ background: "rgba(139,69,19,0.12)", border: "1px solid rgba(139,69,19,0.25)" }}
                            >
                                <Icon name="Layers" size={16} color="#DAA520" />
                                <div>
                                    <p className="font-caption text-xs" style={{ color: "#8FA88F", fontSize: "0.7rem" }}>Soil Type</p>
                                    <p className="font-caption text-sm font-semibold" style={{ color: "#E0E8E0" }}>{data?.soilType}</p>
                                </div>
                                <div className="ml-auto">
                                    <p className="font-caption text-xs text-right" style={{ color: "#8FA88F", fontSize: "0.7rem" }}>Fertility Score</p>
                                    <p className="font-data text-sm font-bold text-right" style={{ color: "#32CD32" }}>{data?.soilFertility}%</p>
                                </div>
                            </div>

                            {/* Pollutants */}
                            <div>
                                <p className="font-heading font-semibold text-sm mb-3" style={{ color: "#E0E8E0" }}>Dominant Pollutants</p>
                                {Object.entries(POLLUTANT_LABELS)?.map(([key, label]) => (
                                    <GaugeBar
                                        key={key}
                                        label={label}
                                        value={data?.[key] ?? 0}
                                        max={POLLUTANT_MAX?.[key]}
                                        color={POLLUTANT_COLORS?.[key]}
                                        unit={POLLUTANT_UNITS?.[key]}
                                    />
                                ))}
                            </div>

                            {/* Mini Bar Chart */}
                            <div>
                                <p className="font-heading font-semibold text-sm mb-3" style={{ color: "#E0E8E0" }}>Pollutant Concentrations</p>
                                <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                    <ResponsiveContainer width="100%" height={130}>
                                        <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                                            <XAxis dataKey="name" tick={{ fill: "#8FA88F", fontSize: 10, fontFamily: "IBM Plex Sans" }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fill: "#8FA88F", fontSize: 9, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(50,205,50,0.06)" }} />
                                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                                {chartData?.map((entry, index) => <Cell key={index} fill={entry?.color} />)}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* NPK Minerals */}
                            <div>
                                <p className="font-heading font-semibold text-sm mb-3" style={{ color: "#E0E8E0" }}>NPK Mineral Levels</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: "Nitrogen (N)", value: data?.n, unit: "kg/ha", color: "#22c55e" },
                                        { label: "Phosphorus (P)", value: data?.p, unit: "kg/ha", color: "#f97316" },
                                        { label: "Potassium (K)", value: data?.k, unit: "kg/ha", color: "#a855f7" },
                                    ]?.map((mineral) => (
                                        <div key={mineral?.label} className="rounded-xl p-3 text-center"
                                            style={{ background: `${mineral?.color}10`, border: `1px solid ${mineral?.color}25` }}
                                        >
                                            <p className="font-data font-bold text-lg" style={{ color: mineral?.color }}>{mineral?.value}</p>
                                            <p className="font-caption" style={{ color: "#8FA88F", fontSize: "0.62rem" }}>{mineral?.unit}</p>
                                            <p className="font-caption font-medium" style={{ color: "#E0E8E0", fontSize: "0.65rem", marginTop: 2 }}>{mineral?.label?.split(" ")?.[0]}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 rounded-xl px-3 py-2 flex items-center justify-between"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                                >
                                    <span className="font-caption text-xs" style={{ color: "#8FA88F", fontSize: "0.7rem" }}>Organic Carbon</span>
                                    <span className="font-data text-sm font-bold" style={{ color: "#32CD32" }}>{data?.oc}%</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pb-2">
                                <a href="/interactive-plantation-calculator"
                                    className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 font-caption text-sm font-semibold transition-opacity duration-150"
                                    style={{ background: "var(--color-primary)", color: "#fff", textDecoration: "none" }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                                >
                                    <Icon name="Calculator" size={14} color="#fff" />
                                    Calculate
                                </a>
                                <a href="/analytics-dashboard"
                                    className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 font-caption text-sm font-semibold transition-opacity duration-150"
                                    style={{ background: "rgba(50,205,50,0.12)", color: "#32CD32", border: "1px solid rgba(50,205,50,0.25)", textDecoration: "none" }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(50,205,50,0.2)"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(50,205,50,0.12)"}
                                >
                                    <Icon name="BarChart3" size={14} color="#32CD32" />
                                    Analytics
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
