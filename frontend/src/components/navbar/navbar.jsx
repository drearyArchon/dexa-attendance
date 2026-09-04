import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthProvider";

export const Navbar = () => {
    const { logout } = useAuth();

    return (
        <>
            <div id="navbar" class="align-items-left">
                <div id="navbar-left">
                    dexa group
                </div>

                <div id="navbar-center">
                    <Link to="/dashboard" style={{ padding: 10 }}>Dashboard</Link>
                    <Link to="/admin" style={{ padding: 10 }}>Admin Page</Link>
                </div>

                <div id="navbar-right">
                    <button id="navbar-logout" onClick={logout}/>
                </div>
            </div>
            <Outlet />
        </>
    );
}