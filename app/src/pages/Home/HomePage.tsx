import React, { useState } from "react";
import usePasswords from "../../hooks/Password/useGetPasswords";
import { useAuth } from "../../contexts/authContext";
import usePasswordOperations from "../../hooks/Password/usePasswordOperations";
import { getPassword } from "../../api/Password/passwordService";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import PasswordList from "../../components/Password/PasswordList";
import PasswordModal from "../../components/Password/PasswordModal";

const HomePage = () => {
  const { passwords, loading, error, refetchPasswords } = usePasswords();
  const { email } = useAuth();
  const {
    isAdding,
    isUpdating,
    isDeleting,
    handleAddPassword,
    handleUpdatePassword,
    handleDeletePassword,
  } = usePasswordOperations(email || "");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const [decryptedPasswords, setDecryptedPasswords] = useState<{
    [key: number]: string;
  }>({});
  const [passwordNameToUpdate, setPasswordNameToUpdate] = useState<
    string | null
  >(null);
  const [passwordToUpdate, setPasswordToUpdate] = useState<string | null>(null);

  const togglePasswordVisibility = async (index: number) => {
    if (visibleIndex === index) {
      setVisibleIndex(null);
      return;
    }

    const password = passwords[index];
    if (!decryptedPasswords[index]) {
      try {
        if (email) {
          const data = await getPassword(email, password.password_name);
          setDecryptedPasswords((prev) => ({
            ...prev,
            [index]: data.password.password,
          }));
        }
      } catch (error) {
        console.error("Error fetching password:", error);
      }
    }

    setVisibleIndex(index);
  };

  const onUpdatePassword = async (newPassword: string) => {
    if (passwordNameToUpdate) {
      await handleUpdatePassword(passwordNameToUpdate, newPassword);
      await refetchPasswords();

      const updatedPasswordIndex = passwords.findIndex(
        (password) => password.password_name === passwordNameToUpdate
      );
      if (updatedPasswordIndex !== -1 && email) {
        try {
          const updatedPassword = passwords[updatedPasswordIndex];
          const data = await getPassword(email, updatedPassword.password_name);
          setDecryptedPasswords((prev) => ({
            ...prev,
            [updatedPasswordIndex]: data.password.password,
          }));
        } catch (error) {
          console.error("Error fetching updated password:", error);
        }
      }

      setIsUpdateModalOpen(false);
    }
  };

  const onAddPassword = async ({
    passwordName,
    password,
  }: {
    passwordName: string;
    password: string;
  }) => {
    await handleAddPassword({ passwordName, password });
    await refetchPasswords();
    setIsAddModalOpen(false);
  };

  const onDeletePassword = async (passwordName: string) => {
    await handleDeletePassword(passwordName);
    await refetchPasswords();
  };

  if (loading || isAdding || isUpdating || isDeleting) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-4 font-sans text-red-500">
        Error: {error}. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 font-sans bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-semibold mb-6 text-center text-gray-200">
        Your Saved Passwords
      </h1>

      <div className="flex justify-center mb-6">
        <button
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-medium transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Password
        </button>
      </div>

      <PasswordList
        passwords={passwords}
        visibleIndex={visibleIndex}
        togglePasswordVisibility={togglePasswordVisibility}
        onUpdate={(passwordName) => {
          setPasswordNameToUpdate(passwordName);
          setPasswordToUpdate(passwordName);
          setIsUpdateModalOpen(true);
        }}
        onDelete={onDeletePassword}
        decryptedPasswords={decryptedPasswords}
      />

      <PasswordModal
        isAddModalOpen={isAddModalOpen}
        isUpdateModalOpen={isUpdateModalOpen}
        passwordNameToUpdate={passwordNameToUpdate}
        passwordToUpdate={passwordToUpdate}
        onAddPassword={onAddPassword}
        onUpdatePassword={onUpdatePassword}
        onCloseAdd={() => setIsAddModalOpen(false)}
        onCloseUpdate={() => setIsUpdateModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
