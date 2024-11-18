import React, { createContext, useContext, useState, ReactNode } from 'react';

type Password = { id: number; name: string; username: string };
type PasswordContextType = {
    passwords: Password[];
    addPassword: (password: Password) => void;
    updatePassword: (id: number, updatedPassword: Partial<Password>) => void;
};

const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

export const PasswordProvider = ({ children }: { children: ReactNode }) => {
    const [passwords, setPasswords] = useState<Password[]>([]);

    const addPassword = (password: Password) => {
        setPasswords((prev) => [...prev, password]);
    };

    const updatePassword = (id: number, updatedPassword: Partial<Password>) => {
        setPasswords((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updatedPassword } : p))
        );
    };

    return (
        <PasswordContext.Provider value={{ passwords, addPassword, updatePassword }}>
            {children}
        </PasswordContext.Provider>
    );
};

export const usePasswordContext = () => {
    const context = useContext(PasswordContext);
    if (!context) {
        throw new Error('usePasswordContext must be used within PasswordProvider');
    }
    return context;
};
