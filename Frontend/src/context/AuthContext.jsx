import { useState, useEffect } from "react";
import { AuthContext } from "./auth-context.js";
import {
    loginUser,
    registerUser,
    logoutUser,
    getCurrentUser,
} from "../services/auth.service.js";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res) => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false));
    }, []);

    const login = async (credentials) => {
        const res = await loginUser(credentials);
        setUser(res.data.user);
        return res;
    };

    const register = async (userData) => {
        return await registerUser(userData);
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
