import React, { useState } from 'react';

import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function ExportPanel() {
  const [exporting, setExporting] = useState(null);
  const [done, setDone] = useState(null);

  const handleExport = (type) => {
    setExporting(type);
    setTimeout(() => {
      setExporting(null);
      setDone(type);
      setTimeout(() => setDone(null), 2500);
    }, 1800);
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
          onClick={() => handleExport('csv')}
        >
          {done === 'csv' ? 'Downloaded!' : 'Export CSV'}
        </Button>
        <Button
          variant="default"
          size="sm"
          loading={exporting === 'pdf'}
          iconName={done === 'pdf' ? 'CheckCircle' : 'FileText'}
          iconPosition="left"
          onClick={() => handleExport('pdf')}
        >
          {done === 'pdf' ? 'Downloaded!' : 'Export PDF'}
        </Button>
      </div>
    </div>
  );
}