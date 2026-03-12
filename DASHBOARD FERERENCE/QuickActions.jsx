import React from "react";
import { useNavigate } from "react-router-dom";

import Icon from "components/AppIcon";

const actions = [
    {
        label: "Plant a Tree",
        icon: "TreePine",
        path: "/smart-plantation-map",
        variant: "default",
        description: "Add new plantation to map",
        color: "var(--color-success)",
    },
    {
        label: "Scan QR Code",
        icon: "QrCode",
        path: "/tree-monitoring",
        variant: "outline",
        description: "Identify & track a tree",
        color: "var(--color-primary)",
    },
    {
        label: "AI Recommend",
        icon: "Sparkles",
        path: "/ai-tree-recommendation",
        variant: "secondary",
        description: "Get species suggestions",
        color: "var(--color-accent)",
    },
    {
        label: "View Map",
        icon: "Map",
        path: "/smart-plantation-map",
        variant: "outline",
        description: "Explore plantation zones",
        color: "var(--color-secondary)",
    },
];

export default function QuickActions() {
    const navigate = useNavigate();

    return (
        <div className="bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm">
            <div className="mb-4">
                <h3 className="text-base font-heading font-semibold text-foreground">Quick Actions</h3>
                <p className="text-xs text-muted-foreground font-caption">Jump to key features</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
                {actions?.map((action) => (
                    <button
                        key={action?.label}
                        onClick={() => navigate(action?.path)}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110" style={{ backgroundColor: `${action?.color}18` }}>
                            <Icon name={action?.icon} size={20} color={action?.color} strokeWidth={2} />
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-caption font-semibold text-foreground leading-tight">{action?.label}</p>
                            <p className="text-xs text-muted-foreground font-caption leading-tight mt-0.5 hidden sm:block">{action?.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}