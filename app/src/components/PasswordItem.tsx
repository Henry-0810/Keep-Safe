import React from "react";

interface PasswordItemProps {
  password: { password_name: string; created_at: string };
  visibleIndex: number | null;
  index: number;
  togglePasswordVisibility: (index: number) => void;
  onUpdate: () => void;
  onDelete: () => void;
  decryptedPassword: string | null;
}

const PasswordItem: React.FC<PasswordItemProps> = ({
  password,
  visibleIndex,
  index,
  togglePasswordVisibility,
  onUpdate,
  onDelete,
  decryptedPassword,
}) => {
  return (
    <li className="border border-gray-700 p-4 rounded-lg bg-gray-800">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-lg">{password.password_name}</div>
          <div className="text-sm font-mono text-gray-400">
            Created At: {password.created_at}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium"
            onClick={() => togglePasswordVisibility(index)}
          >
            {visibleIndex === index ? "Hide" : "Display"}
          </button>
          <button
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium"
            onClick={onUpdate}
          >
            Update
          </button>
          <button
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
      {visibleIndex === index && (
        <div className="mt-2 text-yellow-400 font-mono">
          <span>Decrypted Password: {decryptedPassword || "Loading..."}</span>
        </div>
      )}
    </li>
  );
};

export default PasswordItem;
