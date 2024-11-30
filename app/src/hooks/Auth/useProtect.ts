import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const useProtect = () => {
  const { token, logout } = useAuth();
  const [status, setStatus] = useState<
    "loading" | "authorized" | "unauthorized"
  >("loading");
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch("http://localhost:3001/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setStatus("authorized");
        } else if (response.status === 401) {
          setStatus("unauthorized");
          await logout();
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authorization:", error);
        setStatus("unauthorized");
        await logout();
        navigate("/login");
      }
    };

    if (token) {
      fetchProtectedData();
    } else {
      setStatus("unauthorized");
      navigate("/login");
    }
  }, [token, logout, navigate]);

  return { status, userData };
};

export default useProtect;
