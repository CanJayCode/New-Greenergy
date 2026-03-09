import React from "react";
import { motion } from "framer-motion";
import Icon from "components/AppIcon";

export default function MetricCard({ icon, label, value, unit, trend, trendValue, color, bgGradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, boxShadow: "var(--shadow-xl)" }}
      className="relative overflow-hidden rounded-xl p-5 md:p-6 cursor-default"
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Background gradient blob */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 pointer-events-none"
        style={{ background: bgGradient, transform: "translate(30%, -30%)" }}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p
            className="font-caption text-xs md:text-sm mb-1 truncate"
            style={{ color: "var(--color-muted-foreground)", letterSpacing: "0.04em", textTransform: "uppercase" }}
          >
            {label}
          </p>
          <div className="flex items-end gap-1 flex-wrap">
            <span
              className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl leading-none"
              style={{ color: "var(--color-foreground)", fontFamily: "var(--font-data)" }}
            >
              {value}
            </span>
            {unit && (
              <span className="font-caption text-xs md:text-sm mb-1" style={{ color: "var(--color-muted-foreground)" }}>
                {unit}
              </span>
            )}
          </div>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <Icon
                name={trend === "up" ? "TrendingUp" : trend === "down" ? "TrendingDown" : "Minus"}
                size={13}
                color={trend === "up" ? "var(--color-success)" : trend === "down" ? "var(--color-error)" : "var(--color-muted-foreground)"}
              />
              <span
                className="font-caption text-xs"
                style={{
                  color: trend === "up" ? "var(--color-success)" : trend === "down" ? "var(--color-error)" : "var(--color-muted-foreground)",
                }}
              >
                {trendValue}
              </span>
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{
            width: "48px",
            height: "48px",
            background: bgGradient,
            boxShadow: `0 4px 12px ${color}33`,
          }}
        >
          <Icon name={icon} size={22} color="#fff" strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  );
}