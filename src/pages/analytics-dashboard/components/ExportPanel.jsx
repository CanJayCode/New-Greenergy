import React, { useState } from 'react';

import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function ExportPanel({ data }) {
  const [exporting, setExporting] = useState(null);
  const [done, setDone] = useState(null);

  const handleExportCSV = () => {
    if (!data || data.length === 0) return;
    
    setExporting('csv');
    
    setTimeout(() => {
      try {
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(obj => 
          Object.values(obj).map(val => 
            typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
          ).join(',')
        );
        const csvContent = [headers, ...rows].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `environmental_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setExporting(null);
        setDone('csv');
        setTimeout(() => setDone(null), 2500);
      } catch (error) {
        console.error('Export failed:', error);
        setExporting(null);
      }
    }, 1000);
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-5 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(45,90,61,0.1)' }}>
          <Icon name="Download" size={18} color="var(--color-primary)" />
        </div>
        <div>
          <p className="font-heading font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>Export Report</p>
          <p className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Download analysis for government submissions</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          loading={exporting === 'csv'}
          iconName={done === 'csv' ? 'CheckCircle' : 'FileSpreadsheet'}
          iconPosition="left"
          onClick={handleExportCSV}
          disabled={!data || data.length === 0}
        >
          {done === 'csv' ? 'Downloaded!' : 'Export CSV'}
        </Button>
      </div>
    </div>
  );
}