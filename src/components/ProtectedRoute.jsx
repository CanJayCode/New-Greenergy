import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();

    // Show nothing while checking auth (prevents flash)
    if (loading) {
        return null;
    }

    if (!currentUser) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
}
