import React from "react";
import { motion } from "framer-motion";
import Icon from "components/AppIcon";

const AQI_COLORS = {
  Good: { bg: "#22c55e18", text: "#16a34a", dot: "#22c55e" },
  Moderate: { bg: "#eab30818", text: "#ca8a04", dot: "#eab308" },
  Unhealthy: { bg: "#f9731618", text: "#ea580c", dot: "#f97316" },
  "Very Unhealthy": { bg: "#ef444418", text: "#dc2626", dot: "#ef4444" },
  Hazardous: { bg: "#7c3aed18", text: "#7c3aed", dot: "#7c3aed" },
};

const SPECIES_MAP = {
  Good: "Bamboo, Teak",
  Moderate: "Mango, Jamun",
  Unhealthy: "Peepal, Neem",
  "Very Unhealthy": "Mangrove, Casuarina",
  Hazardous: "Mangrove, Casuarina",
};

function getAQIStatus(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export default function RecentAnalysisFeed({ districtData, loading }) {
  // Build feed from live API data (top 6 by AQI descending)
  const feedItems = districtData
    ? Object.values(districtData)?.sort((a, b) => b?.aqi - a?.aqi)?.slice(0, 6)?.map((d, i) => ({
          id: i + 1,
          district: d?.name,
          aqi: d?.aqi,
          status: getAQIStatus(d?.aqi),
          soil: d?.soilType,
          species: SPECIES_MAP?.[getAQIStatus(d?.aqi)] || "Peepal, Neem",
          treesRecommended: Math.round(d?.aqi * 1200)?.toLocaleString("en-IN"),
          updatedAt: loading ? "Loading…" : "Live data",
          source: d?.source,
        }))
    : [];

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)" }}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="flex items-center gap-2">
          <Icon name="Activity" size={18} color="var(--color-primary)" />
          <h2 className="font-heading font-semibold text-base md:text-lg" style={{ color: "var(--color-foreground)" }}>Recent District Analysis</h2>
        </div>
        <span className="font-caption text-xs px-2 py-1 rounded-full" style={{ background: "var(--color-muted)", color: "var(--color-muted-foreground)" }}>
          {loading ? "Loading…" : `Top ${feedItems?.length} by AQI`}
        </span>
      </div>
      <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
        {loading ? (
          Array.from({ length: 4 })?.map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-4">
              <div className="w-9 h-9 rounded-lg animate-pulse" style={{ background: "var(--color-muted)" }} />
              <div className="flex-1 space-y-2">
                <div className="h-3 rounded animate-pulse w-32" style={{ background: "var(--color-muted)" }} />
                <div className="h-2.5 rounded animate-pulse w-48" style={{ background: "var(--color-muted)" }} />
              </div>
            </div>
          ))
        ) : (
          feedItems?.map((item, i) => {
            const aqiStyle = AQI_COLORS?.[item?.status] || AQI_COLORS?.["Moderate"];
            return (
              <motion.div
                key={item?.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i + 0.5 }}
                className="flex items-center gap-3 md:gap-4 px-5 py-3 md:py-4 transition-colors duration-200"
                style={{ borderColor: "var(--color-border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(45,90,61,0.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div className="flex items-center justify-center rounded-lg flex-shrink-0" style={{ width: "38px", height: "38px", background: "var(--color-muted)" }}>
                  <Icon name="MapPin" size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading font-semibold text-sm md:text-base" style={{ color: "var(--color-foreground)" }}>{item?.district}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-caption text-xs" style={{ background: aqiStyle?.bg, color: aqiStyle?.text, fontSize: "0.7rem" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: aqiStyle?.dot }} />
                      {item?.status}
                    </span>
                    {item?.source === "api" && (
                      <span className="font-caption text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(45,90,61,0.1)", color: "var(--color-primary)", fontSize: "0.62rem" }}>Live</span>
                    )}
                  </div>
                  <p className="font-caption text-xs mt-0.5 truncate" style={{ color: "var(--color-muted-foreground)" }}>{item?.soil} · {item?.species}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-0.5 flex-shrink-0">
                  <span className="font-data font-bold text-sm md:text-base" style={{ color: aqiStyle?.text }}>AQI {item?.aqi}</span>
                  <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>{item?.treesRecommended} trees</span>
                </div>
                <div className="hidden md:block flex-shrink-0 text-right" style={{ minWidth: "80px" }}>
                  <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>{item?.updatedAt}</span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}