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

    if (isAuthenticated 
        && allowedRoles.includes(userData.role)
        && (userData.exp * 1000 > Date.now())
    ) {
        return <>{children}</>;
    }

    return <><Navigate to="/login" /></>;
}

export default ProtectedRoute;