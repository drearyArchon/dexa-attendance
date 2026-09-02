import { createBrowserRouter, Navigate } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import Dashboard from "./pages/userDashboard/UserDashboard";
import AdminPage from "./pages/adminPage/AdminPage";
import LoginPage from "./pages/loginPage/LoginPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { ALLOW_ALL_ROLES } from "./components/protectedRoute/constants";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar />,
        children: [
            {
                path: '/',
                element: <><Navigate to="/dashboard" replace /></>
            },
            {
                path: '/dashboard',
                // needs user id
                element: (
                    <ProtectedRoute allowedRoles={ALLOW_ALL_ROLES}>
                        <Dashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: '/admin',
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                )
            },
            {
                path: '/admin/:username',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '*',
        element: <h1>Error 404 Page not Found</h1>
    }
])

export default router;