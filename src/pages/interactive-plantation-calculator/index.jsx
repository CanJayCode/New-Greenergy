import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "components/ui/Header";
import Breadcrumbs from "components/ui/Breadcrumbs";
import Icon from "components/AppIcon";
import CalculatorForm from "./components/CalculatorForm";
import ResultsPanel from "./components/ResultsPanel";
import SpeciesRecommendations from "./components/SpeciesRecommendations";
import DistrictInfoCard from "./components/DistrictInfoCard";
import { useDistrictData } from "hooks/useDistrictData";
import { DISTRICT_META } from "services/districtDataService";

const DISTRICT_LABELS = Object.fromEntries(Object.entries(DISTRICT_META)?.map(([k, v]) => [k, v?.name]));
const BASE_TREES_PER_HA = 400;

function calculateResults(formData, districtData) {
  const { area, population, duration } = formData;
  const multiplier = districtData?.multiplier ?? 1;
  const areaNum = parseFloat(area);
  const popNum = parseInt(population, 10);
  const durNum = parseInt(duration, 10);

  const baseTrees = Math.round(areaNum * BASE_TREES_PER_HA);
  const totalTrees = Math.round(baseTrees * multiplier);
  const co2Absorption = Math.round(totalTrees * 21.77 / 1000);
  const o2Generation = Math.round(totalTrees * 100 / 1000);
  const pm25Removal = Math.round(totalTrees * 0.6);

  const yearlyMaintenance = {
    year1: totalTrees,
    year2: Math.round(totalTrees * 0.85),
    year3plus: Math.round(totalTrees * 0.70),
  };

  const formulaSteps = [
    `Base trees = Area × ${BASE_TREES_PER_HA} trees/ha = ${areaNum} × ${BASE_TREES_PER_HA} = ${baseTrees?.toLocaleString("en-IN")} trees`,
    `AQI Multiplier for ${DISTRICT_LABELS?.[formData?.district]} (AQI: ${districtData?.aqi ?? "N/A"}) = ${multiplier}x`,
    `Total Trees = ${baseTrees?.toLocaleString("en-IN")} × ${multiplier} = ${totalTrees?.toLocaleString("en-IN")} trees`,
    `CO₂ Absorption = ${totalTrees?.toLocaleString("en-IN")} × 21.77 kg/tree/yr ÷ 1000 = ${co2Absorption?.toLocaleString("en-IN")} tonnes/yr`,
    `O₂ Generation = ${totalTrees?.toLocaleString("en-IN")} × 100 kg/tree/yr ÷ 1000 = ${o2Generation?.toLocaleString("en-IN")} tonnes/yr`,
    `PM2.5 Removal = ${totalTrees?.toLocaleString("en-IN")} × 0.6 kg/tree/yr = ${pm25Removal?.toLocaleString("en-IN")} kg/yr`,
    `Population benefited: ${popNum?.toLocaleString("en-IN")} over ${durNum} year(s)`,
  ];

  return { totalTrees, yearlyMaintenance, co2Absorption, o2Generation, pm25Removal, aqiMultiplier: multiplier, baseTreesPerHa: BASE_TREES_PER_HA, area: areaNum, formulaSteps };
}

export default function InteractivePlantationCalculator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ district: "", soilType: "", area: "", population: "", duration: "" });
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const { data: districtData, loading: districtLoading } = useDistrictData(formData?.district || null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData?.district) newErrors.district = "Please select a district";
    if (!formData?.soilType) newErrors.soilType = "Please select soil type";
    if (!formData?.area || isNaN(formData?.area) || parseFloat(formData?.area) <= 0) newErrors.area = "Enter a valid area";
    if (!formData?.population || isNaN(formData?.population) || parseInt(formData?.population) <= 0) newErrors.population = "Enter a valid population";
    if (!formData?.duration || isNaN(formData?.duration) || parseInt(formData?.duration) <= 0) newErrors.duration = "Enter a valid duration";
    return newErrors;
  };

  const handleCalculate = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors)?.length > 0) { setErrors(newErrors); return; }
    setIsCalculating(true);
    await new Promise((r) => setTimeout(r, 600));
    const res = calculateResults(formData, districtData);
    setResults(res);
    setIsCalculating(false);
  };

  const handleReset = () => {
    setFormData({ district: "", soilType: "", area: "", population: "", duration: "" });
    setErrors({});
    setResults(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-6 lg:py-8 space-y-6">
        <Breadcrumbs items={[{ label: "Dashboard", path: "/dashboard-overview" }, { label: "Plantation Calculator", path: "/interactive-plantation-calculator" }]} />

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl" style={{ color: "var(--color-foreground)" }}>Plantation Calculator</h1>
            <p className="font-caption text-sm mt-1" style={{ color: "var(--color-muted-foreground)" }}>AQI-weighted tree requirement engine for region</p>
          </div>
          <button onClick={() => navigate("/dashboard-overview")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl font-caption text-sm transition-colors duration-150"
            style={{ background: "var(--color-muted)", color: "var(--color-muted-foreground)", border: "1px solid var(--color-border)" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-border)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "var(--color-muted)"}
          >
            <Icon name="ArrowLeft" size={14} color="var(--color-muted-foreground)" /> Back
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {/* Left: Form + District Info */}
          <div className="lg:col-span-1 space-y-5">
            <CalculatorForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onCalculate={handleCalculate}
              onReset={handleReset}
              isCalculating={isCalculating}
            />
            {formData?.district && (
              <DistrictInfoCard districtData={districtData} loading={districtLoading} />
            )}
          </div>

          {/* Right: Results + Species */}
          <div className="lg:col-span-2 space-y-5">
            {results ? (
              <>
                <ResultsPanel results={results} district={DISTRICT_LABELS?.[formData?.district]} />
                <SpeciesRecommendations district={formData?.district} soilType={formData?.soilType} />
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border flex flex-col items-center justify-center py-16 px-8 text-center"
                style={{ background: "var(--color-card)", borderColor: "var(--color-border)", minHeight: 320 }}
              >
                <div className="flex items-center justify-center rounded-2xl mb-4" style={{ width: 64, height: 64, background: "rgba(45,90,61,0.1)" }}>
                  <Icon name="TreePine" size={32} color="var(--color-primary)" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: "var(--color-foreground)" }}>Ready to Calculate</h3>
                <p className="font-caption text-sm" style={{ color: "var(--color-muted-foreground)", maxWidth: 320 }}>
                  Fill in the plantation parameters on the left and click "Calculate Requirements" to see AQI-weighted tree recommendations.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}