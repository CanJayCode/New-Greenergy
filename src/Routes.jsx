import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import DashboardOverview from './pages/dashboard-overview';
import InteractivePlantationCalculator from './pages/interactive-plantation-calculator';
import AQIHeatmap from './pages/aqi-heatmap';
import Login from './pages/user-auth/Login';
import Signup from './pages/user-auth/Signup';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
        <Route path="/analytics-dashboard" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
        <Route path="/dashboard-overview" element={<ProtectedRoute><DashboardOverview /></ProtectedRoute>} />
        <Route path="/interactive-plantation-calculator" element={<ProtectedRoute><InteractivePlantationCalculator /></ProtectedRoute>} />
        <Route path="/aqi-heatmap" element={<ProtectedRoute><AQIHeatmap /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
