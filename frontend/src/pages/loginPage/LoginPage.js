import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";
import router from "../../router";

const LoginPage = () => {
    const { login } = useAuth();
    const [failedLogin, setFailedLogin] = useState(false);
 
    const handleSubmit = (event) => {
        event?.preventDefault();
        const username = event?.target?.username?.value;
        const password = event?.target?.password?.value;
        if (!login({ username, password })) {
            setFailedLogin(true);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input name='username' type='username' required />
                </label>
                <label>
                    <p>Password</p>
                    <input type='password' name='password' required />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;