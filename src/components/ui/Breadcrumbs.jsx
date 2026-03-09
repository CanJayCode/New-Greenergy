import React from 'react';
import Icon from 'components/AppIcon';

export default function Breadcrumbs({ items }) {
  if (!items?.length) return null;
  return (
    <nav className="flex items-center gap-2 text-sm font-caption" aria-label="Breadcrumb">
      <Icon name="Home" size={14} color="var(--color-muted-foreground)" />
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          <Icon name="ChevronRight" size={12} color="var(--color-muted-foreground)" />
          <span
            className={index === items.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-primary cursor-pointer"}
          >
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}