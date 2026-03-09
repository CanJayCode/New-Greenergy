import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "components/AppIcon";
import Button from "components/ui/Button";

const MetricCard = ({ icon, label, value, unit, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.35 }}
    className="rounded-xl p-4 flex flex-col gap-2"
    style={{ background: "var(--color-muted)", border: "1px solid var(--color-border)" }}
  >
    <div className="flex items-center gap-2">
      <div
        className="flex items-center justify-center rounded-lg"
        style={{ width: 36, height: 36, background: `${color}18` }}
      >
        <Icon name={icon} size={18} color={color} />
      </div>
      <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
        {label}
      </span>
    </div>
    <div className="flex items-end gap-1">
      <span className="font-data font-bold text-2xl" style={{ color: "var(--color-foreground)" }}>
        {value}
      </span>
      <span className="font-caption text-xs mb-1" style={{ color: "var(--color-muted-foreground)" }}>
        {unit}
      </span>
    </div>
  </motion.div>
);

const ProgressBar = ({ label, value, max, color }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
          {label}
        </span>
        <span className="font-data text-xs font-semibold" style={{ color: "var(--color-foreground)" }}>
          {value?.toLocaleString("en-IN")}
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
};

export default function ResultsPanel({ results, districtName, onNavigateAnalytics }) {
  const [showFormula, setShowFormula] = useState(false);

  if (!results) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border flex flex-col items-center justify-center p-10 text-center"
        style={{
          background: "var(--color-card)",
          borderColor: "var(--color-border)",
          minHeight: 420,
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div
          className="flex items-center justify-center rounded-2xl mb-4"
          style={{ width: 72, height: 72, background: "rgba(45,90,61,0.1)" }}
        >
          <Icon name="TreePine" size={36} color="var(--color-primary)" />
        </div>
        <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: "var(--color-foreground)" }}>
          Results will appear here
        </h3>
        <p className="font-body text-sm max-w-xs" style={{ color: "var(--color-muted-foreground)" }}>
          Fill in the plantation parameters on the left and click "Calculate Requirements" to see detailed results.
        </p>
      </motion.div>
    );
  }

  const {
    totalTrees,
    yearlyMaintenance,
    co2Absorption,
    o2Generation,
    pm25Removal,
    aqiMultiplier,
    baseTreesPerHa,
    area,
    formulaSteps,
  } = results;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border p-6 md:p-8 space-y-6"
      style={{
        background: "var(--color-card)",
        borderColor: "var(--color-border)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 44, height: 44, background: "rgba(50,205,50,0.15)" }}
          >
            <Icon name="BarChart3" size={22} color="var(--color-accent)" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg" style={{ color: "var(--color-foreground)" }}>
              Calculation Results
            </h2>
            <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
              {districtName} · AQI Factor: {aqiMultiplier}x
            </p>
          </div>
        </div>
        <span
          className="px-3 py-1 rounded-full font-caption font-semibold text-xs"
          style={{ background: "rgba(34,139,34,0.12)", color: "var(--color-success)" }}
        >
          ✓ Calculated
        </span>
      </div>
      {/* Primary Metric */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl p-6 text-center"
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, #228B22 100%)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <p className="font-caption text-sm mb-1" style={{ color: "rgba(255,255,255,0.8)" }}>
          Total Trees Required
        </p>
        <p className="font-data font-bold text-4xl md:text-5xl" style={{ color: "#FFFFFF" }}>
          {totalTrees?.toLocaleString("en-IN")}
        </p>
        <p className="font-caption text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
          across {area} hectares
        </p>
      </motion.div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MetricCard icon="Wind" label="CO₂ Absorbed/yr" value={co2Absorption?.toLocaleString("en-IN")} unit="tonnes" color="var(--color-primary)" delay={0.15} />
        <MetricCard icon="Leaf" label="O₂ Generated/yr" value={o2Generation?.toLocaleString("en-IN")} unit="tonnes" color="var(--color-accent)" delay={0.2} />
        <MetricCard icon="CloudFog" label="PM2.5 Removed/yr" value={pm25Removal?.toLocaleString("en-IN")} unit="kg" color="var(--color-warning)" delay={0.25} />
      </div>
      {/* Yearly Maintenance */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>
          Yearly Maintenance Schedule
        </h3>
        <ProgressBar label="Year 1 – Establishment" value={yearlyMaintenance?.year1} max={totalTrees} color="var(--color-primary)" />
        <ProgressBar label="Year 2 – Growth Phase" value={yearlyMaintenance?.year2} max={totalTrees} color="#4A8F5F" />
        <ProgressBar label="Year 3+ – Maturity" value={yearlyMaintenance?.year3plus} max={totalTrees} color="var(--color-accent)" />
      </div>
      {/* Formula Toggle */}
      <div>
        <button
          onClick={() => setShowFormula((v) => !v)}
          className="flex items-center gap-2 font-caption text-sm font-medium transition-colors duration-200"
          style={{ color: "var(--color-primary)" }}
        >
          <Icon name={showFormula ? "ChevronUp" : "ChevronDown"} size={16} color="currentColor" />
          {showFormula ? "Hide" : "Show"} Calculation Formula
        </button>
        <AnimatePresence>
          {showFormula && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className="mt-3 rounded-xl p-4 space-y-2"
                style={{ background: "var(--color-muted)", border: "1px solid var(--color-border)" }}
              >
                <p className="font-caption font-semibold text-xs uppercase tracking-wider" style={{ color: "var(--color-muted-foreground)" }}>
                  Formula Breakdown
                </p>
                {formulaSteps?.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-data text-xs font-bold"
                      style={{ background: "var(--color-primary)", color: "#fff", fontSize: "0.65rem" }}
                    >
                      {i + 1}
                    </span>
                    <p className="font-data text-xs" style={{ color: "var(--color-foreground)" }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* CTA */}
      <Button
        variant="outline"
        fullWidth
        iconName="BarChart3"
        iconPosition="left"
        onClick={onNavigateAnalytics}
      >
        View Analytics Dashboard
      </Button>
    </motion.div>
  );
}