import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthProvider";
import { USER_ROLES } from "../protectedRoute/constants";

export const Navbar = () => {
    const { logout, userData } = useAuth();
    const isAdmin = userData.role === USER_ROLES.ADMIN;

    return (
        <>
            <div id="navbar" className="grid grid-cols-3 w-5/5 px-4 py-4 rounded-b-xl bg-[#cf2e2e] shadow-sm">
                <div id="navbar-left" className="text-white justify-self-start">
                    dexa group
                </div>

                <div id="navbar-center">
                    <Link to="/dashboard" className="p-5 text-white">Dashboard</Link>
                    { isAdmin 
                        && <Link to="/admin" className="p-5 text-white">Admin Page</Link> 
                    }
                </div>

                <div id="navbar-right" className="justify-self-end">
                    <button id="navbar-logout" className="text-white" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
            <Outlet />
        </>
    );
}