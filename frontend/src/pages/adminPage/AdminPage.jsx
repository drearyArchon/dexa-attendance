import React, { useEffect } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";

const AdminPage = () => {
    const { sendRequest } = useAuth();

    async function getUsers() {
        await sendRequest("GET", "/users", "", "")
    }

    useEffect(() => {
        getUsers();
    });

    return (
        <div>
            <h1>Administration</h1>
        </div>
    );
};

export default AdminPage;