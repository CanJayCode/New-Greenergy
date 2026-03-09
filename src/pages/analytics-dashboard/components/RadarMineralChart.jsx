import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const COLORS = ['#2D5A3D', '#32CD32', '#DAA520', '#8B4513', '#228B22', '#B22222'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg p-3 border shadow-lg" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)', minWidth: 160 }}>
      <p className="font-heading font-semibold text-sm mb-2" style={{ color: 'var(--color-foreground)' }}>{label}</p>
      {payload?.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p?.color }} />
          <span className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{p?.name}:</span>
          <span className="font-data text-xs font-medium" style={{ color: p?.color }}>{p?.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function RadarMineralChart({ data, districts }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-xl p-4 md:p-5 border h-full"
      style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(45,90,61,0.1)' }}>
          <Icon name="Radar" size={16} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>Mineral Composition</h3>
          <p className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>N, P, K &amp; Organic Carbon radar</p>
        </div>
      </div>
      <div className="w-full" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 4, right: 20, left: 20, bottom: 4 }}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)', fontFamily: 'var(--font-caption)' }} />
            <PolarRadiusAxis tick={{ fontSize: 9, fill: 'var(--color-muted-foreground)' }} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {districts?.map((d, i) => (
              <Radar key={d} name={d} dataKey={d} stroke={COLORS?.[i % COLORS?.length]} fill={COLORS?.[i % COLORS?.length]} fillOpacity={0.15} strokeWidth={2} />
            ))}
            <Legend
              formatter={(value) => <span style={{ fontSize: 11, color: 'var(--color-foreground)', fontFamily: 'var(--font-caption)' }}>{value}</span>}
              iconType="circle"
              iconSize={8}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}