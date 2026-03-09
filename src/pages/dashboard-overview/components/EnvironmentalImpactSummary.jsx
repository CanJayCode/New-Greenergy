import React from "react";
import { motion } from "framer-motion";
import Icon from "components/AppIcon";

const IMPACT_STATS = [
  {
    icon: "Wind",
    label: "CO₂ Absorbed",
    value: "4,82,000",
    unit: "tonnes/yr",
    color: "#2D5A3D",
    bg: "rgba(45,90,61,0.12)",
  },
  {
    icon: "Zap",
    label: "O₂ Generated",
    value: "3,51,000",
    unit: "tonnes/yr",
    color: "#32CD32",
    bg: "rgba(50,205,50,0.12)",
  },
  {
    icon: "CloudOff",
    label: "PM2.5 Removed",
    value: "12,400",
    unit: "kg/yr",
    color: "#00bcd4",
    bg: "rgba(0,188,212,0.12)",
  },
  {
    icon: "TreePine",
    label: "Trees Planted",
    value: "18,64,200",
    unit: "total",
    color: "#DAA520",
    bg: "rgba(218,165,32,0.12)",
  },
];

export default function EnvironmentalImpactSummary() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div
        className="flex items-center gap-2 px-5 py-4 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <Icon name="Globe" size={18} color="var(--color-primary)" />
        <h2 className="font-heading font-semibold text-base md:text-lg" style={{ color: "var(--color-foreground)" }}>
          Cumulative Environmental Impact
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0" style={{ borderColor: "var(--color-border)" }}>
        {IMPACT_STATS?.map((stat, i) => (
          <motion.div
            key={stat?.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.1 * i + 0.8 }}
            className="flex flex-col items-center justify-center p-4 md:p-5 text-center gap-2"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div
              className="flex items-center justify-center rounded-xl"
              style={{ width: "44px", height: "44px", background: stat?.bg }}
            >
              <Icon name={stat?.icon} size={20} color={stat?.color} />
            </div>
            <div>
              <p
                className="font-data font-bold text-lg md:text-xl lg:text-2xl leading-none"
                style={{ color: "var(--color-foreground)" }}
              >
                {stat?.value}
              </p>
              <p className="font-caption text-xs mt-0.5" style={{ color: stat?.color, fontWeight: 600 }}>
                {stat?.unit}
              </p>
              <p className="font-caption text-xs mt-1" style={{ color: "var(--color-muted-foreground)" }}>
                {stat?.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}