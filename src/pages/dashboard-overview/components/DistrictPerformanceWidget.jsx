import React from "react";
import { motion } from "framer-motion";
import Icon from "components/AppIcon";

function PerformanceBar({ score, status }) {
    const gradient = status === "top" ? "linear-gradient(90deg, #2D5A3D, #32CD32)" : "linear-gradient(90deg, #B22222, #DAA520)";
    return (
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--color-muted)" }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
                className="h-full rounded-full"
                style={{ background: gradient }}
            />
        </div>
    );
}

export default function DistrictPerformanceWidget({ districtData, loading }) {
    // Build top/attention lists from live API data
    const districts = districtData ? Object.values(districtData) : [];
    const sorted = [...districts]?.sort((a, b) => a?.aqi - b?.aqi);
    const top = sorted?.slice(0, 3)?.map((d) => ({
        name: d?.name,
        aqi: d?.aqi,
        score: Math.round(Math.max(10, 100 - d?.aqi / 3)),
        status: "top",
        label: d?.aqi <= 50 ? "Best AQI" : d?.aqi <= 100 ? "Clean Air" : "Improving",
    }));
    const attention = sorted?.slice(-3)?.reverse()?.map((d) => ({
        name: d?.name,
        aqi: d?.aqi,
        score: Math.round(Math.max(5, 50 - d?.aqi / 10)),
        status: "attention",
        label: d?.aqi >= 200 ? "Critical" : d?.aqi >= 150 ? "High AQI" : "Industrial",
    }));

    return (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)" }}>
            <div className="flex items-center gap-2 px-5 py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                <Icon name="Award" size={18} color="var(--color-primary)" />
                <h2 className="font-heading font-semibold text-base md:text-lg" style={{ color: "var(--color-foreground)" }}>District Performance</h2>
            </div>
            <div className="p-5 space-y-5">
                {loading ? (
                    Array.from({ length: 6 })?.map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="h-3 rounded animate-pulse w-20" style={{ background: "var(--color-muted)" }} />
                            <div className="flex-1 h-2 rounded-full animate-pulse" style={{ background: "var(--color-muted)" }} />
                            <div className="h-3 rounded animate-pulse w-12" style={{ background: "var(--color-muted)" }} />
                        </div>
                    ))
                ) : (
                    <>
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full" style={{ background: "#32CD32" }} />
                                <span className="font-caption text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-success)" }}>Top Performers</span>
                            </div>
                            <div className="space-y-3">
                                {top?.map((d, i) => (
                                    <motion.div key={d?.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i + 0.7 }} className="flex items-center gap-3">
                                        <span className="font-body text-sm w-24 truncate flex-shrink-0" style={{ color: "var(--color-foreground)" }}>{d?.name}</span>
                                        <PerformanceBar score={d?.score} status={d?.status} />
                                        <div className="flex flex-col items-end flex-shrink-0" style={{ minWidth: "56px" }}>
                                            <span className="font-data text-xs font-bold" style={{ color: "var(--color-success)" }}>AQI {d?.aqi}</span>
                                            <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)", fontSize: "0.65rem" }}>{d?.label}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="border-t" style={{ borderColor: "var(--color-border)" }} />
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full" style={{ background: "#B22222" }} />
                                <span className="font-caption text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-error)" }}>Needs Attention</span>
                            </div>
                            <div className="space-y-3">
                                {attention?.map((d, i) => (
                                    <motion.div key={d?.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i + 0.9 }} className="flex items-center gap-3">
                                        <span className="font-body text-sm w-24 truncate flex-shrink-0" style={{ color: "var(--color-foreground)" }}>{d?.name}</span>
                                        <PerformanceBar score={d?.score} status={d?.status} />
                                        <div className="flex flex-col items-end flex-shrink-0" style={{ minWidth: "56px" }}>
                                            <span className="font-data text-xs font-bold" style={{ color: "var(--color-error)" }}>AQI {d?.aqi}</span>
                                            <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)", fontSize: "0.65rem" }}>{d?.label}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}