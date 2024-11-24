import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken, updateEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const res = await response.json();
      setToken(res.data.token);
      updateEmail(res.data.email);
      console.log("Signed up successfully!", res);
      navigate("/dashboard");
    } else {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col justify-center items-center font-sans">
      <h2 className="text-3xl font-bold mb-6">Create Your Account</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-6 p-6 bg-gray-800 rounded-lg shadow-lg"
      >
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition duration-300"
        >
          Sign Up
        </button>
        <hr className="border-gray-700" />
        <a href="/login" className="text-center text-blue-400 hover:underline">
          Already have an account? Login here
        </a>
      </form>
    </div>
  );
};

export default SignupPage;
