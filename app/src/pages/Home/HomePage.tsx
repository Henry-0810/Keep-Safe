import React from 'react';
import { usePasswordContext } from '../../contexts/passwordContext';

const HomePage = () => {
    const { passwords, addPassword } = usePasswordContext();

    const handleAddPassword = () => {
        const newPassword = { id: passwords.length + 1, name: 'Example', username: 'user@example.com' };
        addPassword(newPassword);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Saved Passwords</h1>
            <button
                className="bg-green-500 text-white px-4 py-2 mb-4"
                onClick={handleAddPassword}
            >
                Add Password
            </button>
            <ul>
                {passwords.map((password) => (
                    <li key={password.id} className="border p-2 my-2">
                        {password.name} - {password.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;