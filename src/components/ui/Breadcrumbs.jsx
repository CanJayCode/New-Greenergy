import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const ROUTE_LABELS = {
  '/dashboard-overview': 'Dashboard',
  '/interactive-plantation-calculator': 'Calculator',
  '/analytics-dashboard': 'Analytics',
  '/aqi-heatmap': 'Heatmap',
  '/district-database': 'Districts',
};

export default function Breadcrumbs({ items = [], className = '' }) {
  const navigate = useNavigate();

  if (!items || items?.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1 ${className}`}
    >
      {/* Home always first */}
      <button
        onClick={() => navigate('/dashboard-overview')}
        className="flex items-center justify-center rounded transition-all duration-250"
        style={{
          color: 'var(--color-muted-foreground)',
          minHeight: '28px',
          minWidth: '28px',
          padding: '4px',
        }}
        aria-label="Go to Dashboard"
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted-foreground)'}
      >
        <Icon name="Home" size={14} color="currentColor" />
      </button>
      {items?.map((item, index) => {
        const isLast = index === items?.length - 1;
        return (
          <React.Fragment key={item?.path || item?.label}>
            {/* Separator */}
            <Icon
              name="ChevronRight"
              size={13}
              color="var(--color-muted-foreground)"
              style={{ opacity: 0.5, flexShrink: 0 }}
            />
            {/* Mobile: only show last item */}
            <span className={isLast ? 'flex' : 'hidden sm:flex'}>
              {isLast || !item?.path ? (
                <span
                  className="font-caption font-medium px-1 py-0.5 rounded"
                  style={{
                    fontSize: '0.8125rem',
                    color: isLast ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                    background: isLast ? 'rgba(45,90,61,0.08)' : 'transparent',
                    maxWidth: '160px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item?.label}
                </span>
              ) : (
                <button
                  onClick={() => navigate(item?.path)}
                  className="font-caption px-1 py-0.5 rounded transition-all duration-250"
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-muted-foreground)',
                    maxWidth: '140px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary)';
                    e.currentTarget.style.background = 'rgba(45,90,61,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-muted-foreground)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {item?.label}
                </button>
              )}
            </span>
            {/* Mobile collapsed indicator */}
            {!isLast && items?.length > 2 && index === 0 && (
              <span className="flex sm:hidden items-center gap-1">
                <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>...</span>
                <Icon name="ChevronRight" size={13} color="var(--color-muted-foreground)" style={{ opacity: 0.5 }} />
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}