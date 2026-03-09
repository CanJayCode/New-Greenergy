import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const AQI_COLORS = (val) => {
  if (val <= 50) return '#32CD32';
  if (val <= 100) return '#DAA520';
  if (val <= 150) return '#FF8C00';
  if (val <= 200) return '#B22222';
  return '#8B0000';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload?.[0]?.value;
  return (
    <div className="rounded-lg p-3 border shadow-lg" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)', minWidth: 140 }}>
      <p className="font-heading font-semibold text-sm mb-1" style={{ color: 'var(--color-foreground)' }}>{label}</p>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full" style={{ background: AQI_COLORS(val) }} />
        <span className="font-data text-sm font-medium" style={{ color: AQI_COLORS(val) }}>{val} AQI</span>
      </div>
      <p className="font-caption text-xs mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
        {val <= 50 ? 'Good' : val <= 100 ? 'Moderate' : val <= 150 ? 'Unhealthy for Sensitive' : val <= 200 ? 'Unhealthy' : 'Very Unhealthy'}
      </p>
    </div>
  );
};

export default function AQIBarChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-xl p-4 md:p-5 border h-full"
      style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(178,34,34,0.1)' }}>
            <Icon name="Wind" size={16} color="#B22222" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>AQI Comparison</h3>
            <p className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Air Quality Index by District</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-end">
          {[{ label: 'Good', color: '#32CD32' }, { label: 'Moderate', color: '#DAA520' }, { label: 'Unhealthy', color: '#B22222' }]?.map(l => (
            <div key={l?.label} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: l?.color }} />
              <span className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{l?.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="district" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)', fontFamily: 'var(--font-caption)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)', fontFamily: 'var(--font-data)' }} axisLine={false} tickLine={false} domain={[0, 300]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(45,90,61,0.05)' }} />
            <ReferenceLine y={100} stroke="#DAA520" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Moderate', position: 'right', fontSize: 10, fill: '#DAA520' }} />
            <Bar dataKey="aqi" radius={[6, 6, 0, 0]}>
              {data?.map((entry, i) => (
                <Cell key={i} fill={AQI_COLORS(entry?.aqi)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}