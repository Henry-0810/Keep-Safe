import React from "react";
import AddPasswordForm from "./AddPasswordForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

interface PasswordModalProps {
  isAddModalOpen: boolean;
  isUpdateModalOpen: boolean;
  passwordNameToUpdate: string | null;
  passwordToUpdate: string | null;
  onAddPassword: (data: { passwordName: string; password: string }) => void;
  onUpdatePassword: (newPassword: string) => void;
  onCloseAdd: () => void;
  onCloseUpdate: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isAddModalOpen,
  isUpdateModalOpen,
  passwordNameToUpdate,
  passwordToUpdate,
  onAddPassword,
  onUpdatePassword,
  onCloseAdd,
  onCloseUpdate,
}) => {
  return (
    <>
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-white max-w-md mx-auto">
            <AddPasswordForm onClose={onCloseAdd} onSubmit={onAddPassword} />
          </div>
        </div>
      )}

      {isUpdateModalOpen && passwordNameToUpdate && passwordToUpdate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-white max-w-md mx-auto">
            <UpdatePasswordForm
              onClose={onCloseUpdate}
              onUpdate={onUpdatePassword}
              passwordName={passwordNameToUpdate}
              passwordValue={passwordToUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordModal;
