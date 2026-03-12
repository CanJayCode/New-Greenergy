import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const weeklyData = [
    { name: "Mon", trees: 42, co2: 8.4, oxygen: 12.1 },
    { name: "Tue", trees: 58, co2: 11.6, oxygen: 16.8 },
    { name: "Wed", trees: 35, co2: 7.0, oxygen: 10.2 },
    { name: "Thu", trees: 74, co2: 14.8, oxygen: 21.4 },
    { name: "Fri", trees: 91, co2: 18.2, oxygen: 26.3 },
    { name: "Sat", trees: 120, co2: 24.0, oxygen: 34.7 },
    { name: "Sun", trees: 88, co2: 17.6, oxygen: 25.4 },
];

const monthlyData = [
    { name: "Jan", trees: 820, co2: 164, oxygen: 237 },
    { name: "Feb", trees: 940, co2: 188, oxygen: 272 },
    { name: "Mar", trees: 1120, co2: 224, oxygen: 324 },
    { name: "Apr", trees: 1380, co2: 276, oxygen: 399 },
    { name: "May", trees: 1650, co2: 330, oxygen: 477 },
    { name: "Jun", trees: 1890, co2: 378, oxygen: 547 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
        return (
            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                <p className="text-xs font-heading font-semibold text-foreground mb-2">{label}</p>
                {payload?.map((entry) => (
                    <div key={entry?.dataKey} className="flex items-center gap-2 text-xs font-caption">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry?.color }} />
                        <span className="text-muted-foreground capitalize">{entry?.dataKey}:</span>
                        <span className="font-semibold text-foreground">{entry?.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function ImpactChart() {
    const [period, setPeriod] = useState("weekly");
    const data = period === "weekly" ? weeklyData : monthlyData;

    return (
        <div className="bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                    <h3 className="text-base font-heading font-semibold text-foreground">Environmental Impact Trends</h3>
                    <p className="text-xs text-muted-foreground font-caption">Trees planted, CO₂ absorbed & oxygen generated</p>
                </div>
                <div className="flex gap-1 bg-muted rounded-lg p-1 self-start sm:self-auto">
                    {["weekly", "monthly"]?.map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-3 py-1.5 rounded-md text-xs font-caption font-medium transition-all duration-200 capitalize ${period === p ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full h-56 md:h-64" aria-label="Environmental Impact Area Chart">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="treesGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2D5A3D" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#2D5A3D" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#E8B86D" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#E8B86D" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="oxygenGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B7F47" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3B7F47" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,90,61,0.1)" />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)", fontFamily: "var(--font-caption)" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)", fontFamily: "var(--font-caption)" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: "11px", fontFamily: "var(--font-caption)", paddingTop: "8px" }} />
                        <Area type="monotone" dataKey="trees" stroke="#2D5A3D" strokeWidth={2} fill="url(#treesGrad)" name="Trees" />
                        <Area type="monotone" dataKey="co2" stroke="#E8B86D" strokeWidth={2} fill="url(#co2Grad)" name="CO₂ (tons)" />
                        <Area type="monotone" dataKey="oxygen" stroke="#3B7F47" strokeWidth={2} fill="url(#oxygenGrad)" name="Oxygen (kg)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}