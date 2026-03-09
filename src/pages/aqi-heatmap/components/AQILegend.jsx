import React from "react";

const LEGEND_ITEMS = [
    { range: "0–50", label: "Good", color: "#22c55e" },
    { range: "51–100", label: "Moderate", color: "#eab308" },
    { range: "101–150", label: "Unhealthy (Sensitive)", color: "#f97316" },
    { range: "151–200", label: "Unhealthy", color: "#ef4444" },
    { range: "201–300", label: "Very Unhealthy", color: "#a855f7" },
    { range: "301+", label: "Hazardous", color: "#7f1d1d" },
];

export default function AQILegend() {
    return (
        <div
            className="flex flex-wrap items-center gap-2 md:gap-3"
        >
            {LEGEND_ITEMS?.map((item) => (
                <div key={item?.label} className="flex items-center gap-1.5">
                    <div
                        className="rounded-sm flex-shrink-0"
                        style={{ width: 14, height: 14, background: item?.color, border: "1px solid rgba(255,255,255,0.2)" }}
                    />
                    <span className="font-caption text-xs whitespace-nowrap" style={{ color: "var(--color-foreground)", fontSize: "0.7rem" }}>
                        <span className="font-data" style={{ color: item?.color, fontWeight: 600 }}>{item?.range}</span>
                        {" "}{item?.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
