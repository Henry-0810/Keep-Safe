// usePasswordOperations.ts
import { useState } from "react";
import { addPassword, updatePassword, deletePassword } from "../services/passwordService";

const usePasswordOperations = (email: string) => {
    const [isAdding, setIsAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleAddPassword = async ({ passwordName, password }: { passwordName: string; password: string }) => {
        if (!email) throw new Error("Email is required");
        setIsAdding(true);
        try {
            await addPassword(email, passwordName, password);
        } finally {
            setIsAdding(false);
        }
    };

    const handleUpdatePassword = async (passwordName: string, newPassword: string) => {
        if (!email || !passwordName) throw new Error("Email and password name are required");
        setIsUpdating(true);
        try {
            await updatePassword(email, passwordName, newPassword);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeletePassword = async (passwordName: string) => {
        if (!email) throw new Error("Email is required");
        setIsDeleting(true);
        try {
            await deletePassword(email, passwordName);
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        isAdding,
        isUpdating,
        isDeleting,
        handleAddPassword,
        handleUpdatePassword,
        handleDeletePassword,
    };
};

export default usePasswordOperations;
