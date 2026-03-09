import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "components/AppIcon";
import Button from "components/ui/Button";

export default function PrimaryActionBanner() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl px-6 py-6 md:px-8 md:py-7"
      style={{
        background: "linear-gradient(135deg, #2D5A3D 0%, #1a3d28 60%, #0f2418 100%)",
        boxShadow: "var(--shadow-xl)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #32CD32, transparent)", transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #32CD32, transparent)", transform: "translateY(50%)" }}
      />
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Leaf" size={18} color="#32CD32" />
            <span className="font-caption text-xs font-semibold uppercase tracking-widest" style={{ color: "#32CD32" }}>
              VanaRaksha Platform
            </span>
          </div>
          <h1 className="font-heading font-bold text-xl md:text-2xl lg:text-3xl text-white mb-2 leading-tight">
            Maharashtra Reforestation Intelligence
          </h1>
          <p className="font-body text-sm md:text-base" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "520px" }}>
            Data-driven plantation planning using AQI metrics and soil composition for 36 districts. Eliminate blind plantation with science-backed recommendations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 flex-shrink-0">
          <Button
            variant="default"
            size="lg"
            iconName="Calculator"
            iconPosition="left"
            onClick={() => navigate("/interactive-plantation-calculator")}
            className="whitespace-nowrap"
            style={{ background: "#32CD32", color: "#000", fontWeight: 700 }}
          >
            Start New Calculation
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconName="BarChart3"
            iconPosition="left"
            onClick={() => navigate("/analytics-dashboard")}
            className="whitespace-nowrap"
            style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
          >
            View Full Analytics
          </Button>
        </div>
      </div>
    </motion.div>
  );
}