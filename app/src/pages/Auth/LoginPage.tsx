import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setToken, updateEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const res = await response.json();
        setToken(res.data.token, rememberMe);
        updateEmail(res.data.email);
        console.log("Logged in!", res);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col justify-center items-center font-sans">
      <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-6 p-6 bg-gray-800 rounded-lg shadow-lg"
      >
        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <label className="flex items-center space-x-2 text-gray-300">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded border-gray-600 focus:ring-0"
          />
          <span>Remember Me</span>
        </label>
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition duration-300"
        >
          Login
        </button>
        <hr className="border-gray-700" />
        <a href="/signup" className="text-center text-blue-400 hover:underline">
          Don't have an account? Sign up here
        </a>
      </form>
    </div>
  );
};

export default LoginPage;
