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
        <div class="bg-white border border-stone-200 rounded-xl shadow-sm p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6">
                <form onSubmit={handleSubmit} class="space-y-2">
                    <div class="space-y-1">
                        <label for="username" class="block mb-1 text-sm font-semibold antialiased text-stone-800">User Portal</label>
                        <input id="username" type="text" required placeholder="Username" class="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer" />
                    </div>
                    <div class="space-y-1">
                        <input id="password" type="password" required placeholder="Password" class="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer" />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;