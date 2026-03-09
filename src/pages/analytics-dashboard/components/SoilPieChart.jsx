import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const SOIL_COLORS = { Loamy: '#228B22', Black: '#2D2D2D', Clay: '#8B4513', Sandy: '#DAA520' };

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload?.[0];
  return (
    <div className="rounded-lg p-3 border shadow-lg" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
      <p className="font-heading font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>{name} Soil</p>
      <p className="font-data text-sm font-medium mt-1" style={{ color: SOIL_COLORS?.[name] || '#32CD32' }}>{value} districts</p>
    </div>
  );
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.08 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontFamily="var(--font-data)" fontWeight={600}>
      {`${(percent * 100)?.toFixed(0)}%`}
    </text>
  ) : null;
};

export default function SoilPieChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-card rounded-xl p-4 md:p-5 border h-full"
      style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139,69,19,0.1)' }}>
          <Icon name="Layers" size={16} color="#8B4513" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>Soil Distribution</h3>
          <p className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Soil types across districts</p>
        </div>
      </div>
      <div className="w-full" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="45%" outerRadius={90} innerRadius={40} dataKey="value" labelLine={false} label={renderCustomLabel}>
              {data?.map((entry, i) => (
                <Cell key={i} fill={SOIL_COLORS?.[entry?.name] || '#32CD32'} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => <span style={{ fontSize: 12, color: 'var(--color-foreground)', fontFamily: 'var(--font-caption)' }}>{value}</span>}
              iconType="circle"
              iconSize={10}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}