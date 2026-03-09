import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const AQI_LABEL = (v) => v <= 50 ? { label: 'Good', color: '#32CD32' } : v <= 100 ? { label: 'Moderate', color: '#DAA520' } : v <= 150 ? { label: 'Sensitive', color: '#FF8C00' } : v <= 200 ? { label: 'Unhealthy', color: '#B22222' } : { label: 'Very Unhealthy', color: '#8B0000' };
const FERTILITY_COLOR = (v) => v >= 80 ? '#32CD32' : v >= 60 ? '#DAA520' : '#B22222';

export default function DistrictComparisonTable({ data }) {
  const [sortKey, setSortKey] = useState('aqi');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const sorted = [...data]?.sort((a, b) => {
    const av = a?.[sortKey], bv = b?.[sortKey];
    if (typeof av === 'string') return sortDir === 'asc' ? av?.localeCompare(bv) : bv?.localeCompare(av);
    return sortDir === 'asc' ? av - bv : bv - av;
  });

  const cols = [
    { key: 'district', label: 'District' },
    { key: 'aqi', label: 'AQI' },
    { key: 'soilType', label: 'Soil Type' },
    { key: 'soilFertility', label: 'Fertility' },
    { key: 'nitrogen', label: 'N' },
    { key: 'phosphorus', label: 'P' },
    { key: 'potassium', label: 'K' },
    { key: 'organicCarbon', label: 'OC' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="bg-card rounded-xl border overflow-hidden"
      style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center justify-between px-4 md:px-5 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-2">
          <Icon name="TableProperties" size={16} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>District Comparison</h3>
        </div>
        <span className="font-caption text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(45,90,61,0.1)', color: 'var(--color-primary)' }}>
          {data?.length} districts
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr style={{ background: 'var(--color-muted)' }}>
              {cols?.map(c => (
                <th
                  key={c?.key}
                  onClick={() => handleSort(c?.key)}
                  className="px-3 py-2.5 text-left cursor-pointer select-none transition-colors duration-150 hover:bg-opacity-80"
                  style={{ color: sortKey === c?.key ? 'var(--color-primary)' : 'var(--color-muted-foreground)' }}
                >
                  <div className="flex items-center gap-1">
                    <span className="font-caption font-medium text-xs uppercase tracking-wider">{c?.label}</span>
                    {sortKey === c?.key && (
                      <Icon name={sortDir === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={12} color="var(--color-primary)" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted?.map((row, i) => {
              const aqiInfo = AQI_LABEL(row?.aqi);
              return (
                <tr
                  key={row?.district}
                  className="border-b transition-colors duration-150"
                  style={{ borderColor: 'var(--color-border)', background: i % 2 === 0 ? 'transparent' : 'rgba(45,90,61,0.02)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(45,90,61,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(45,90,61,0.02)'}
                >
                  <td className="px-3 py-2.5">
                    <span className="font-body font-medium text-sm" style={{ color: 'var(--color-foreground)' }}>{row?.district}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-data text-sm font-semibold" style={{ color: aqiInfo?.color }}>{row?.aqi}</span>
                      <span className="font-caption text-xs px-1.5 py-0.5 rounded-full" style={{ background: aqiInfo?.color + '20', color: aqiInfo?.color }}>{aqiInfo?.label}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="font-caption text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--color-muted)', color: 'var(--color-muted-foreground)' }}>{row?.soilType}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-muted)', minWidth: 40 }}>
                        <div className="h-full rounded-full" style={{ width: `${row?.soilFertility}%`, background: FERTILITY_COLOR(row?.soilFertility) }} />
                      </div>
                      <span className="font-data text-xs whitespace-nowrap" style={{ color: FERTILITY_COLOR(row?.soilFertility) }}>{row?.soilFertility}%</span>
                    </div>
                  </td>
                  {['nitrogen', 'phosphorus', 'potassium', 'organicCarbon']?.map(k => (
                    <td key={k} className="px-3 py-2.5">
                      <span className="font-data text-xs" style={{ color: 'var(--color-foreground)' }}>{row?.[k]}</span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}