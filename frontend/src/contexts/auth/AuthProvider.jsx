import axios from "axios";
import { createContext, useContext, useState } from "react";
import router from "../../router";

const AuthContext = createContext();
const TOKEN_KEY = "dexa_token";
const USER_KEY = "dexa_user";
const BACKEND_URL = "http://localhost:3100"

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem(USER_KEY), "{}"));
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");

    const login = async (data) => {
        // TODO: Token should be refreshed every 15 minutes
        // TODO: User Data needs to be encrypted
        try {
            await axios.post(
                BACKEND_URL + '/auth/login',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                setToken(response.data.access_token);
                setUserData(parseToken(response.data.access_token))
                localStorage.setItem(TOKEN_KEY, response.data.access_token);
                localStorage.setItem(USER_KEY, JSON.stringify(parseToken(response.data.access_token)));
            }).catch((err) => {
                console.log(err);
                return false;
            });
        } catch (error) {
            console.log(error);
            return false;
        }

        router.navigate("/dashboard");
        return true;
    }

    const parseToken = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        console.log(jsonPayload);
        return JSON.parse(jsonPayload);
    }

    const logout = () => {
        setToken("");
        setUserData({});
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }

    return (
        <AuthContext.Provider value={{ token, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}