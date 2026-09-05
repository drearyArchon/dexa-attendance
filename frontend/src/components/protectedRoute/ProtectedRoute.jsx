import React from "react";
// import { Navigate } from "react-router-dom";
import { ALLOW_ADMIN } from "./constants";
import { useAuth } from "../../contexts/auth/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    allowedRoles = ALLOW_ADMIN,
    children
}) => {
    const { userData } = useAuth();
    const isAuthenticated = !!userData;

    if (isAuthenticated && (userData.exp * 1000 > Date.now())) {
        if (allowedRoles.includes(userData.role)) {
            return <>{children}</>
        }
        return <Navigate to="/dashboard" />;
    }


    return <Navigate to="/login" />;
}

export default ProtectedRoute;