import React from "react";
import { motion } from "framer-motion";
import Icon from "components/AppIcon";
import Button from "components/ui/Button";
import Input from "components/ui/Input";
import Select from "components/ui/Select";
import { DISTRICT_META } from "services/districtDataService";

const DISTRICTS = Object.entries(DISTRICT_META)?.map(([value, meta]) => ({ value, label: meta.name }));

const SOIL_TYPES = [
  { value: "loamy", label: "Loamy Soil" },
  { value: "black", label: "Black Soil (Regur)" },
  { value: "clay", label: "Clay Soil" },
  { value: "sandy", label: "Sandy Soil" },
];

export default function CalculatorForm({ formData, errors, onChange, onCalculate, onReset, isCalculating }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border p-6 md:p-8"
      style={{ background: "var(--color-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-md)" }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center rounded-xl" style={{ width: 44, height: 44, background: "rgba(45,90,61,0.12)" }}>
          <Icon name="Calculator" size={22} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-lg" style={{ color: "var(--color-foreground)" }}>Plantation Parameters</h2>
          <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>Enter details to calculate tree requirements</p>
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <label className="block font-caption font-medium text-sm mb-1.5" style={{ color: "var(--color-foreground)" }}>
            District <span style={{ color: "var(--color-error)" }}>*</span>
          </label>
          <Select options={DISTRICTS} value={formData?.district} onChange={(val) => onChange("district", val)} placeholder="Select district" searchable error={errors?.district} />
        </div>
        <div>
          <label className="block font-caption font-medium text-sm mb-1.5" style={{ color: "var(--color-foreground)" }}>
            Soil Type <span style={{ color: "var(--color-error)" }}>*</span>
          </label>
          <Select options={SOIL_TYPES} value={formData?.soilType} onChange={(val) => onChange("soilType", val)} placeholder="Select soil type" error={errors?.soilType} />
        </div>
        <Input label="Plantation Area (Hectares)" type="number" placeholder="e.g. 50" value={formData?.area} onChange={(e) => onChange("area", e?.target?.value)} error={errors?.area} required min={0.1} description="Enter area in hectares (1 hectare = 10,000 sq. metres)" />
        <Input label="Target Population Benefited" type="number" placeholder="e.g. 10000" value={formData?.population} onChange={(e) => onChange("population", e?.target?.value)} error={errors?.population} required min={1} description="Estimated population in the plantation zone" />
        <Input label="Project Duration (Years)" type="number" placeholder="e.g. 5" value={formData?.duration} onChange={(e) => onChange("duration", e?.target?.value)} error={errors?.duration} required min={1} max={50} description="Duration for phased plantation and maintenance" />
        {formData?.district && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-4 flex items-start gap-3"
            style={{ background: "rgba(45,90,61,0.08)", border: "1px solid rgba(45,90,61,0.2)" }}
          >
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-caption font-semibold text-xs" style={{ color: "var(--color-primary)" }}>AQI Data Loaded</p>
              <p className="font-caption text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>District environmental data will be used to apply AQI multiplication factor (1x–4x) to tree requirements.</p>
            </div>
          </motion.div>
        )}
        <div className="flex gap-3 pt-2">
          <Button variant="default" fullWidth loading={isCalculating} iconName="Leaf" iconPosition="left" onClick={onCalculate}>
            {isCalculating ? "Calculating..." : "Calculate Requirements"}
          </Button>
          <Button variant="outline" iconName="RotateCcw" iconPosition="left" onClick={onReset}>Reset</Button>
        </div>
      </div>
    </motion.div>
  );
}