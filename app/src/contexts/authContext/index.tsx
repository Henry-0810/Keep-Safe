import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  token: string | null;
  setToken: (token: string, rememberMe?: boolean) => void;
  email: string | null;
  updateEmail: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(
    sessionStorage.getItem("token") || localStorage.getItem("token")
  );

  const [email, setEmailState] = useState<string | null>(
    sessionStorage.getItem("email") || localStorage.getItem("email")
  );

  const setToken = (newToken: string, rememberMe: boolean = false) => {
    if (rememberMe) {
      localStorage.setItem("token", newToken);
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", newToken);
      localStorage.removeItem("token");
    }
    setTokenState(newToken);
  };

  const updateEmail = (newEmail: string) => {
    localStorage.setItem("email", newEmail);
    sessionStorage.setItem("email", newEmail);
    setEmailState(newEmail);
  };

  useEffect(() => {
    const storedToken =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (storedToken) setTokenState(storedToken);
  }, []);

  const logout = async () => {
    await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    sessionStorage.clear();
    localStorage.clear();
    setTokenState(null);
    console.log("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, email, updateEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
