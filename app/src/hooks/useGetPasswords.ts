import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../contexts/authContext";
import { getPasswords } from "../services/passwordService"; // Import the service functions

type Password = {
  created_at: string;
  password_name: string;
};

const usePasswords = () => {
  const { email } = useAuth();
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPasswords = useCallback(async () => {
    if (!email) {
      setError("No email found. Please log in.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await getPasswords(email);
      console.log("Fetched passwords:", response.passwords); // Debug log
      setPasswords(response.passwords || []);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching passwords:", err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchPasswords();
  }, [fetchPasswords]);

  const refetchPasswords = async () => {
    await fetchPasswords();
  };

  return { passwords, loading, error, refetchPasswords };
};

export default usePasswords;
