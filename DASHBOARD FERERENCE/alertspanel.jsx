import React, { useState } from "react";
import Icon from "components/AppIcon";

const alerts = [
    {
        id: 1,
        type: "urgent",
        icon: "Droplets",
        title: "Irrigation Alert",
        message: "12 trees in Zone A need watering — soil moisture critically low",
        time: "5 min ago",
        color: "var(--color-error)",
        bg: "bg-error/8",
        border: "border-error/20",
    },
    {
        id: 2,
        type: "warning",
        icon: "Bug",
        title: "Pest Detection",
        message: "Possible aphid infestation detected on Silver Birch cluster in District 3",
        time: "1 hr ago",
        color: "var(--color-warning)",
        bg: "bg-warning/8",
        border: "border-warning/20",
    },
    {
        id: 3,
        type: "info",
        icon: "CloudRain",
        title: "Weather Update",
        message: "Rain forecast tomorrow — optimal planting window for 48 hours",
        time: "3 hr ago",
        color: "var(--color-primary)",
        bg: "bg-primary/5",
        border: "border-primary/15",
    },
    {
        id: 4,
        type: "success",
        icon: "CheckCircle",
        title: "Campaign Milestone",
        message: "Green Corridor North campaign reached 500 trees planted goal!",
        time: "6 hr ago",
        color: "var(--color-success)",
        bg: "bg-success/8",
        border: "border-success/20",
    },
];

export default function AlertsPanel() {
    const [dismissed, setDismissed] = useState([]);

    const visible = alerts?.filter((a) => !dismissed?.includes(a?.id));

    return (
        <div className="bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-heading font-semibold text-foreground">Smart Alerts</h3>
                    <p className="text-xs text-muted-foreground font-caption">{visible?.length} active notifications</p>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-error animate-pulse-green" />
                    <span className="text-xs font-caption text-error font-medium">
                        {alerts?.filter((a) => a?.type === "urgent" && !dismissed?.includes(a?.id))?.length} urgent
                    </span>
                </div>
            </div>
            <div className="space-y-2.5">
                {visible?.length === 0 && (
                    <div className="text-center py-6">
                        <Icon name="CheckCircle2" size={32} color="var(--color-success)" className="mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground font-caption">All clear! No active alerts.</p>
                    </div>
                )}
                {visible?.map((alert) => (
                    <div key={alert?.id} className={`flex items-start gap-3 p-3 rounded-lg border ${alert?.bg} ${alert?.border}`}>
                        <Icon name={alert?.icon} size={16} color={alert?.color} className="flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-caption font-semibold text-foreground">{alert?.title}</p>
                            <p className="text-xs text-muted-foreground font-caption mt-0.5 leading-relaxed">{alert?.message}</p>
                            <p className="text-xs text-muted-foreground font-caption mt-1">{alert?.time}</p>
                        </div>
                        <button
                            onClick={() => setDismissed((prev) => [...prev, alert?.id])}
                            className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md hover:bg-muted transition-colors duration-200"
                            aria-label="Dismiss alert"
                        >
                            <Icon name="X" size={12} color="var(--color-muted-foreground)" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}