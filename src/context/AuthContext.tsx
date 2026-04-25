import React, { createContext, useContext, useEffect, useState } from 'react';

import { authApi } from 'api/auth.api';
import { tokenStorage } from 'api/token';

import type { LoginDto } from 'types/auth';

interface AuthContextType {
    user: { id: string; username: string; email: string; fullName: string; role: string } | null;
    login: (data: LoginDto) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>("");
    const [user, setUser] = useState<AuthContextType['user']>({ id: '', username: 'not loaded', email: '', fullName: '', role: '' });

    // On mount, check if token exists
    useEffect(() => {
        const token = tokenStorage.get();
        setToken(token);
    }, []);

    useEffect(() => {
        const auth = async () => {
            try {
                await authApi.me()
                    .then(setUser);
            } catch (e) {
                console.log(e);

                tokenStorage.clear();
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        if (token === null) {
            setLoading(false);
            setUser(null);
            return;
        } else if (!token) {
            return;
        }

        auth();
    }, [token]);

    const login = async (data: LoginDto) => {
        const res = await authApi.login(data);
        setUser(res.user);
    };

    const logout = () => {
        tokenStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
