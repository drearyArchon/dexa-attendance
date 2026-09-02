import React from "react";
import { Navigate } from "react-router-dom";
import { ALLOW_ADMIN } from "./constants";
import { useAuth } from "../../contexts/auth/AuthProvider";

const ProtectedRoute = ({ 
    allowedRoles=ALLOW_ADMIN,
    children
}) => {
    const { token, user } = useAuth()
    const isAuthenticated = !!token;

    if (isAuthenticated && allowedRoles.includes(user?.role)) {
        return <>{children}</>;
    }

    return <><Navigate to="/"/></>;
}

export default ProtectedRoute;