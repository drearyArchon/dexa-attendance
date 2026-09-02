import axios from "axios";
import { createContext, useContext, useState } from "react";
import router from "../../router";

const AuthContext = createContext();
const TOKEN_KEY = "dexa_token";
const USER_KEY = "dexa_user";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(USER_KEY), "{}"));
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");

    const login = async (data) => {
        try {
            await axios.post(
                'http://localhost:3100/auth/login', 
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                console.log(response.data);
                setToken(response.data.access_token);
                setUser(response.data.userData)
                localStorage.setItem(TOKEN_KEY, response.data.access_token);
                localStorage.setItem(USER_KEY, JSON.stringify(response.data.userData));
                router.navigate("/dashboard");
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const logout = () => {
        setToken("");
        setUser({});
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}