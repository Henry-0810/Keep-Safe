import React from "react";
import PasswordItem from "./PasswordItem";

interface PasswordListProps {
  passwords: { password_name: string; created_at: string }[];
  visibleIndex: number | null;
  togglePasswordVisibility: (index: number) => void;
  onUpdate: (passwordName: string) => void;
  onDelete: (passwordName: string) => void;
  decryptedPasswords: { [key: number]: string };
}

const PasswordList: React.FC<PasswordListProps> = ({
  passwords,
  visibleIndex,
  togglePasswordVisibility,
  onUpdate,
  onDelete,
  decryptedPasswords,
}) => {
  return (
    <ul className="space-y-4 mx-10">
      {passwords.map((password, index) => (
        <PasswordItem
          key={index}
          password={password}
          visibleIndex={visibleIndex}
          index={index}
          togglePasswordVisibility={togglePasswordVisibility}
          onUpdate={() => onUpdate(password.password_name)}
          onDelete={() => onDelete(password.password_name)}
          decryptedPassword={decryptedPasswords[index]}
        />
      ))}
    </ul>
  );
};

export default PasswordList;
