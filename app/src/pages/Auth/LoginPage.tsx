import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            console.log('Logged in!');
        } else {
            console.error('Login failed');
        }
    };

    return (
        <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white">
            <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
            <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4 p-6 bg-white rounded-lg shadow-lg">
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                />
                <button type="submit" className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition duration-300">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
