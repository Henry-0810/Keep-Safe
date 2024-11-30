import React, { useState, useEffect } from "react";

const UpdatePasswordForm = ({
  onClose,
  onUpdate,
  passwordName,
  passwordValue, // This is the actual password value
}: {
  onClose: () => void;
  onUpdate: (newPassword: string) => void;
  passwordName: string;
  passwordValue: string; // This is the correct password value
}) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // New state for re-entering password
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(
    null
  ); // Error for mismatch

  useEffect(() => {
    setNewPassword(passwordValue); // Set the passwordValue here
  }, [passwordValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMatchError("Passwords do not match. Please try again.");
      return;
    }
    if (newPassword) {
      onUpdate(newPassword); // Submit the updated password
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
      <div className="mb-4 text-lg text-gray-300">
        <strong>Updating: </strong>
        {passwordName} {/* Display password name */}
      </div>

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="p-2 rounded-lg border border-gray-600 bg-gray-800 text-white w-full"
      />
      <input
        type="password"
        placeholder="Re-enter New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="p-2 rounded-lg border border-gray-600 bg-gray-800 text-white w-full"
      />
      {passwordMatchError && (
        <p className="text-red-500 text-sm">{passwordMatchError}</p>
      )}
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
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
