
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const DISTRICTS = [
  'Pune', 'Nashik', 'Nagpur', 'Mumbai City', 'Thane', 'Aurangabad',
  'Solapur', 'Kolhapur', 'Amravati', 'Nanded', 'Satara', 'Jalgaon',
  'Akola', 'Latur', 'Chandrapur', 'Ratnagiri', 'Sangli', 'Dhule',
  'Wardha', 'Yavatmal', 'Beed'
];

const METRICS = [
  { key: 'aqi', label: 'AQI Level', color: '#B22222' },
  { key: 'soilFertility', label: 'Soil Fertility', color: '#228B22' },
  { key: 'nitrogen', label: 'Nitrogen (N)', color: '#2D5A3D' },
  { key: 'phosphorus', label: 'Phosphorus (P)', color: '#8B4513' },
  { key: 'potassium', label: 'Potassium (K)', color: '#DAA520' },
  { key: 'organicCarbon', label: 'Organic Carbon', color: '#32CD32' },
];

export default function FilterPanel({ selectedDistricts, onDistrictChange, activeMetrics, onMetricToggle, onReset }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDistrict = (d) => {
    if (selectedDistricts?.includes(d)) {
      onDistrictChange(selectedDistricts?.filter(x => x !== d));
    } else if (selectedDistricts?.length < 6) {
      onDistrictChange([...selectedDistricts, d]);
    }
  };

  const content = (
    <div className="flex flex-col gap-4">
      {/* Districts */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-caption font-medium text-xs uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>
            Districts (max 6)
          </span>
          <span className="font-data text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(45,90,61,0.1)', color: 'var(--color-primary)' }}>
            {selectedDistricts?.length}/6
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {DISTRICTS?.map(d => {
            const active = selectedDistricts?.includes(d);
            return (
              <button
                key={d}
                onClick={() => toggleDistrict(d)}
                className="px-2.5 py-1 rounded-full font-caption text-xs transition-all duration-200"
                style={{
                  background: active ? 'var(--color-primary)' : 'var(--color-muted)',
                  color: active ? '#fff' : 'var(--color-muted-foreground)',
                  border: active ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  opacity: !active && selectedDistricts?.length >= 6 ? 0.4 : 1,
                  cursor: !active && selectedDistricts?.length >= 6 ? 'not-allowed' : 'pointer',
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metrics */}
      <div>
        <span className="font-caption font-medium text-xs uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-muted-foreground)' }}>
          Metrics
        </span>
        <div className="flex flex-wrap gap-1.5">
          {METRICS?.map(m => {
            const active = activeMetrics?.includes(m?.key);
            return (
              <button
                key={m?.key}
                onClick={() => onMetricToggle(m?.key)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-caption text-xs transition-all duration-200"
                style={{
                  background: active ? m?.color + '20' : 'var(--color-muted)',
                  color: active ? m?.color : 'var(--color-muted-foreground)',
                  border: `1px solid ${active ? m?.color + '60' : 'var(--color-border)'}`,
                }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: active ? m?.color : 'var(--color-border)' }} />
                {m?.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button variant="outline" size="sm" onClick={onReset} iconName="RotateCcw" iconPosition="left">
          Reset Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block bg-card rounded-xl p-5 border" style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Icon name="SlidersHorizontal" size={16} color="var(--color-primary)" />
          <span className="font-heading font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>Filter Controls</span>
        </div>
        {content}
      </div>
      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border font-caption font-medium text-sm"
          style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
        >
          <div className="flex items-center gap-2">
            <Icon name="SlidersHorizontal" size={16} color="var(--color-primary)" />
            Filter Controls
          </div>
          <Icon name={mobileOpen ? 'ChevronUp' : 'ChevronDown'} size={16} color="var(--color-muted-foreground)" />
        </button>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="bg-card rounded-b-xl border border-t-0 p-4" style={{ borderColor: 'var(--color-border)' }}>
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}