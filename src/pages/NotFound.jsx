import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center" style={{ background: "var(--color-background)" }}>
      <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
        <Icon name="FileQuestion" size={40} color="var(--color-muted-foreground)" />
      </div>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl font-semibold mb-4 text-foreground">Page Not Found</p>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/dashboard-overview">
        <Button size="lg" iconName="ArrowLeft" iconPosition="left">
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
