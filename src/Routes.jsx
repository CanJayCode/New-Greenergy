import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import DashboardOverview from './pages/dashboard-overview';
import InteractivePlantationCalculator from './pages/interactive-plantation-calculator';
import AQIHeatmap from './pages/aqi-heatmap';

const Routes = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ScrollToTop />
                <RouterRoutes>
                    {/* Define your route here */}
                    <Route path="/" element={<AnalyticsDashboard />} />
                    <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
                    <Route path="/dashboard-overview" element={<DashboardOverview />} />
                    <Route path="/interactive-plantation-calculator" element={<InteractivePlantationCalculator />} />
                    <Route path="/aqi-heatmap" element={<AQIHeatmap />} />
                    <Route path="*" element={<NotFound />} />
                </RouterRoutes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Routes;
