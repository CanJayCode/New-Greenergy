import React from "react";
import { motion } from "framer-motion";
import Icon from "components/AppIcon";

const AQI_COLORS = {
  "Good": "#228B22",
  "Moderate": "#DAA520",
  "Unhealthy for Sensitive": "#FF8C00",
  "Unhealthy": "#B22222",
  "Very Unhealthy": "#8B0000",
  "Hazardous": "#4B0082",
};

export default function DistrictInfoCard({ districtData, loading }) {
  if (loading) {
    return (
      <div className="rounded-2xl border p-5 flex items-center justify-center" style={{ background: "var(--color-card)", borderColor: "var(--color-border)", minHeight: 120 }}>
        <div className="flex items-center gap-2">
          <Icon name="Loader" size={16} color="var(--color-primary)" />
          <span className="font-caption text-sm" style={{ color: "var(--color-muted-foreground)" }}>Loading district data…</span>
        </div>
      </div>
    );
  }
  if (!districtData) return null;

  const aqiColor = AQI_COLORS?.[districtData?.aqiLevel] || "var(--color-muted-foreground)";
  const aqiPct = Math.min((districtData?.aqi / 300) * 100, 100);

  return (
    <motion.div
      key={districtData?.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border p-5"
      style={{ background: "var(--color-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-sm)" }}
    >
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Icon name="MapPin" size={16} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>District Environmental Data</h3>
        </div>
        {districtData?.source === "api" && (
          <span className="font-caption text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(45,90,61,0.12)", color: "var(--color-primary)", fontSize: "0.65rem" }}>Live</span>
        )}
      </div>
      {/* AQI */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>Air Quality Index (AQI)</span>
          <span className="font-data font-bold text-sm" style={{ color: aqiColor }}>{districtData?.aqi} – {districtData?.aqiLevel}</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${aqiPct}%` }} transition={{ duration: 0.7 }} className="h-full rounded-full" style={{ background: aqiColor }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)", fontSize: "0.65rem" }}>0 – Good</span>
          <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)", fontSize: "0.65rem" }}>300 – Hazardous</span>
        </div>
      </div>
      {/* AQI Multiplier */}
      <div className="flex items-center justify-between rounded-xl px-4 py-3 mb-4"
        style={{ background: "rgba(45,90,61,0.08)", border: "1px solid rgba(45,90,61,0.2)" }}
      >
        <div className="flex items-center gap-2">
          <Icon name="Zap" size={15} color="var(--color-primary)" />
          <span className="font-caption text-xs font-medium" style={{ color: "var(--color-foreground)" }}>AQI Multiplication Factor</span>
        </div>
        <span className="font-data font-bold text-lg" style={{ color: "var(--color-primary)" }}>{districtData?.multiplier}x</span>
      </div>
      {/* Soil Minerals */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Soil Fertility", value: `${districtData?.soilFertility}%`, icon: "Layers" },
          { label: "Nitrogen (N)", value: `${districtData?.n} kg/ha`, icon: "FlaskConical" },
          { label: "Phosphorus (P)", value: `${districtData?.p} kg/ha`, icon: "Atom" },
          { label: "Potassium (K)", value: `${districtData?.k} kg/ha`, icon: "Beaker" },
          { label: "Organic Carbon", value: `${districtData?.oc}%`, icon: "Leaf" },
        ]?.map((item) => (
          <div key={item?.label} className="rounded-lg p-2.5 flex items-center gap-2" style={{ background: "var(--color-muted)" }}>
            <Icon name={item?.icon} size={13} color="var(--color-primary)" />
            <div>
              <p className="font-caption" style={{ fontSize: "0.65rem", color: "var(--color-muted-foreground)" }}>{item?.label}</p>
              <p className="font-data font-semibold text-xs" style={{ color: "var(--color-foreground)" }}>{item?.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}