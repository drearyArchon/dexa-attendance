import { Link, Outlet } from "react-router-dom";

export const Navbar = () => {
    return (
        <>
            <Link to="/dashboard" style={{ padding: 10 }}>Dashboard</Link>
            <Link to="/admin" style={{ padding: 10 }}>Admin Page</Link>
            <Link to="/login" style={{ padding: 10 }}>Login</Link>
            <Outlet />
        </>
    );
}