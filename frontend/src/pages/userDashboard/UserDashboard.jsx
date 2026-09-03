import React, { useEffect } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";

const Dashboard = () => {
    const { sendRequest } = useAuth();

    async function getUsers() {
        await sendRequest("GET", "/images", "", "")
    }

    useEffect(() => {
        getUsers();
    });

    return (
        <div>
            <h1>Dashboard</h1>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
        </div>
    );
};

export default Dashboard;