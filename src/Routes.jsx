import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import DashboardOverview from './pages/dashboard-overview';
import InteractivePlantationCalculator from './pages/interactive-plantation-calculator';
import AQIHeatmap from './pages/aqi-heatmap';
import Signup from './pages/user-auth/Signup';
import Login from './pages/user-auth/Login';
import ProtectedRoute from './components/ProtectedRoute';

const Routes = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ScrollToTop />
                <RouterRoutes>
                    {/* Public Auth Routes */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Application Routes */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <DashboardOverview />
                        </ProtectedRoute>
                    } />
                    <Route path="/dashboard-overview" element={
                        <ProtectedRoute>
                            <DashboardOverview />
                        </ProtectedRoute>
                    } />
                    <Route path="/analytics-dashboard" element={
                        <ProtectedRoute>
                            <AnalyticsDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/interactive-plantation-calculator" element={
                        <ProtectedRoute>
                            <InteractivePlantationCalculator />
                        </ProtectedRoute>
                    } />
                    <Route path="/aqi-heatmap" element={
                        <ProtectedRoute>
                            <AQIHeatmap />
                        </ProtectedRoute>
                    } />

                    <Route path="*" element={<NotFound />} />
                </RouterRoutes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Routes;
