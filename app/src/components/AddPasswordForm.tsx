import React, { useState } from "react";
import { generatePassword } from "../services/passwordService";

interface AddPasswordFormProps {
  onClose: () => void;
  onSubmit: (data: { passwordName: string; password: string }) => void;
}

const AddPasswordForm: React.FC<AddPasswordFormProps> = ({
  onClose,
  onSubmit,
}) => {
  const [passwordName, setPasswordName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // For toggling password visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordName || !password) {
      return;
    }

    onSubmit({ passwordName, password });

    setPasswordName("");
    setPassword("");
    onClose();
  };

  const handleGeneratePassword = async () => {
    setIsGenerating(true);
    try {
      const response = await generatePassword(difficulty);
      if (response && response.generated_password) {
        setPassword(response.generated_password);
      } else {
        console.error("Failed to generate password");
      }
    } catch (error) {
      console.error("Error generating password:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Password</h2>
      <div className="mb-4 text-lg text-gray-300">
        <strong>Enter details for the new password</strong>
      </div>
      <input
        type="text"
        placeholder="Password Name"
        value={passwordName}
        onChange={(e) => setPasswordName(e.target.value)}
        className="p-2 rounded-lg border border-gray-600 bg-gray-800 text-white w-full"
      />
      <div className="flex items-center space-x-2">
        {/* Password Input */}
        <div className="relative flex-grow">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-lg border border-gray-600 bg-gray-800 text-white w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 1.608 0 3.132.341 4.542.959"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 01-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12L21 21"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Generate Button */}
        <button
          type="button"
          onClick={handleGeneratePassword}
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg"
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="difficulty" className="text-gray-300">
          Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Add Password
        </button>
      </div>
    </form>
  );
};

export default AddPasswordForm;
