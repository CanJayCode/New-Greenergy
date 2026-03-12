import React from "react";
import Icon from "components/AppIcon";

const campaigns = [
    {
        id: 1,
        name: "Green Corridor North",
        target: 1000,
        planted: 847,
        daysLeft: 12,
        icon: "Route",
        color: "var(--color-success)",
    },
    {
        id: 2,
        name: "Urban Heat Shield",
        target: 500,
        planted: 312,
        daysLeft: 28,
        icon: "Thermometer",
        color: "var(--color-warning)",
    },
    {
        id: 3,
        name: "Riverside Restoration",
        target: 2000,
        planted: 1456,
        daysLeft: 45,
        icon: "Waves",
        color: "var(--color-primary)",
    },
];

export default function CampaignProgress() {
    return (
        <div className="bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-heading font-semibold text-foreground">Active Campaigns</h3>
                    <p className="text-xs text-muted-foreground font-caption">Ongoing plantation drives</p>
                </div>
                <Icon name="Flag" size={18} color="var(--color-primary)" />
            </div>
            <div className="space-y-4">
                {campaigns?.map((c) => {
                    const pct = Math.round((c?.planted / c?.target) * 100);
                    return (
                        <div key={c?.id}>
                            <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                    <Icon name={c?.icon} size={14} color={c?.color} />
                                    <span className="text-sm font-caption font-medium text-foreground">{c?.name}</span>
                                </div>
                                <span className="text-xs font-data font-bold text-foreground">{pct}%</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${pct}%`, backgroundColor: c?.color }}
                                />
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-xs text-muted-foreground font-caption">
                                    {c?.planted?.toLocaleString()} / {c?.target?.toLocaleString()} trees
                                </span>
                                <span className="text-xs text-muted-foreground font-caption">{c?.daysLeft}d left</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}