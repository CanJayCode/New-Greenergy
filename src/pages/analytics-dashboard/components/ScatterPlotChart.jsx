import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload?.[0]?.payload;
  return (
    <div className="rounded-lg p-3 border shadow-lg" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)', minWidth: 160 }}>
      <p className="font-heading font-semibold text-sm mb-2" style={{ color: 'var(--color-foreground)' }}>{d?.district}</p>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Population Density</span>
          <span className="font-data text-xs font-medium" style={{ color: 'var(--color-foreground)' }}>{d?.x?.toLocaleString('en-IN')}/km²</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>AQI</span>
          <span className="font-data text-xs font-medium" style={{ color: '#B22222' }}>{d?.y}</span>
        </div>
      </div>
    </div>
  );
};

export default function ScatterPlotChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-xl p-4 md:p-5 border h-full"
      style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(50,205,50,0.1)' }}>
          <Icon name="ScatterChart" size={16} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>Population vs AQI</h3>
          <p className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Density-pollution correlation</p>
        </div>
      </div>
      <div className="w-full" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="x" name="Population Density" type="number" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)', fontFamily: 'var(--font-data)' }} axisLine={false} tickLine={false} label={{ value: 'Pop. Density (/km²)', position: 'insideBottom', offset: -2, fontSize: 10, fill: 'var(--color-muted-foreground)' }} />
            <YAxis dataKey="y" name="AQI" type="number" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)', fontFamily: 'var(--font-data)' }} axisLine={false} tickLine={false} />
            <ZAxis range={[60, 200]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={data} fill="var(--color-primary)" fillOpacity={0.75} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}