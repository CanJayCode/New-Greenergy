import React from "react";
import Icon from "components/AppIcon";

export default function MetricCard({ icon, label, value, unit, trend, trendPositive, color, progress, subtitle }) {
    return (
        <div className="bg-card border border-border rounded-xl p-4 md:p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-250">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}18` }}>
                        <Icon name={icon} size={20} color={color} strokeWidth={2} />
                    </div>
                    <span className="text-sm font-caption text-muted-foreground">{label}</span>
                </div>
                <div className={`flex items-center gap-1 text-xs font-caption px-2 py-1 rounded-full ${trendPositive ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                    <Icon name={trendPositive ? "TrendingUp" : "TrendingDown"} size={12} color="currentColor" />
                    {trend}
                </div>
            </div>
            <div>
                <div className="flex items-end gap-1">
                    <span className="text-2xl md:text-3xl font-heading font-bold text-foreground">{value}</span>
                    {unit && <span className="text-sm text-muted-foreground mb-1 font-caption">{unit}</span>}
                </div>
                {subtitle && <p className="text-xs text-muted-foreground font-caption mt-0.5">{subtitle}</p>}
            </div>
            {progress !== undefined && (
                <div>
                    <div className="flex justify-between text-xs font-caption text-muted-foreground mb-1">
                        <span>Progress to goal</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: color }} />
                    </div>
                </div>
            )}
        </div>
    );
}