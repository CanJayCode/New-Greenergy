import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "components/AppIcon";

const TOOLS = [
  {
    icon: "Calculator",
    label: "Plantation Calculator",
    description: "AQI-weighted tree requirement engine",
    path: "/interactive-plantation-calculator",
    gradient: "linear-gradient(135deg, #2D5A3D 0%, #32CD32 100%)",
    accent: "#32CD32",
    badge: "Core Tool",
  },
  {
    icon: "BarChart3",
    label: "Analytics Dashboard",
    description: "Multi-chart district comparison",
    path: "/analytics-dashboard",
    gradient: "linear-gradient(135deg, #1a6b8a 0%, #00bcd4 100%)",
    accent: "#00bcd4",
    badge: "Insights",
  },
  {
    icon: "Map",
    label: "AQI Heatmap",
    description: "GIS pollution visualization",
    path: "/aqi-heatmap",
    gradient: "linear-gradient(135deg, #8B4513 0%, #DAA520 100%)",
    accent: "#DAA520",
    badge: "GIS",
  },
];

export default function QuickAccessToolbar() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {TOOLS?.map((tool, i) => (
        <motion.button
          key={tool?.path}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * i + 0.3, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ y: -6, boxShadow: `0 16px 40px ${tool?.accent}33` }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(tool?.path)}
          className="relative overflow-hidden rounded-2xl p-5 md:p-6 text-left group"
          style={{
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-md)",
            cursor: "pointer",
          }}
        >
          {/* Gradient overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: `${tool?.gradient}08` }}
          />

          {/* Badge */}
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full font-caption text-xs mb-3"
            style={{
              background: `${tool?.accent}18`,
              color: tool?.accent,
              fontSize: "0.7rem",
              letterSpacing: "0.05em",
              fontWeight: 600,
            }}
          >
            {tool?.badge}
          </span>

          <div
            className="flex items-center justify-center rounded-xl mb-4"
            style={{
              width: "52px",
              height: "52px",
              background: tool?.gradient,
              boxShadow: `0 6px 16px ${tool?.accent}44`,
            }}
          >
            <Icon name={tool?.icon} size={24} color="#fff" strokeWidth={2} />
          </div>

          <h3
            className="font-heading font-semibold text-base md:text-lg mb-1"
            style={{ color: "var(--color-foreground)" }}
          >
            {tool?.label}
          </h3>
          <p className="font-body text-sm" style={{ color: "var(--color-muted-foreground)" }}>
            {tool?.description}
          </p>

          <div
            className="flex items-center gap-1 mt-4 font-caption text-sm font-medium transition-all duration-250 group-hover:gap-2"
            style={{ color: tool?.accent }}
          >
            <span>Open Tool</span>
            <Icon name="ArrowRight" size={14} color={tool?.accent} />
          </div>
        </motion.button>
      ))}
    </div>
  );
}