import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const cards = [
  { label: 'Avg AQI', key: 'avgAqi', icon: 'Wind', unit: '', color: '#B22222', bg: 'rgba(178,34,34,0.08)', desc: 'Across selected districts' },
  { label: 'Best District', key: 'bestDistrict', icon: 'Award', unit: '', color: '#32CD32', bg: 'rgba(50,205,50,0.08)', desc: 'Lowest AQI score' },
  { label: 'Avg Fertility', key: 'avgFertility', icon: 'Sprout', unit: '%', color: '#228B22', bg: 'rgba(34,139,34,0.08)', desc: 'Soil fertility index' },
  { label: 'Trees Needed', key: 'treesNeeded', icon: 'Trees', unit: '', color: '#2D5A3D', bg: 'rgba(45,90,61,0.08)', desc: 'Estimated requirement' },
];

export default function PerformanceCards({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {cards?.map((c, i) => (
        <motion.div
          key={c?.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.07 }}
          className="bg-card rounded-xl p-4 border"
          style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: c?.bg }}>
              <Icon name={c?.icon} size={18} color={c?.color} />
            </div>
          </div>
          <p className="font-data text-xl md:text-2xl font-bold leading-none mb-1" style={{ color: c?.color }}>
            {stats?.[c?.key]}{c?.unit}
          </p>
          <p className="font-heading font-semibold text-xs md:text-sm" style={{ color: 'var(--color-foreground)' }}>{c?.label}</p>
          <p className="font-caption text-xs mt-0.5" style={{ color: 'var(--color-muted-foreground)' }}>{c?.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}