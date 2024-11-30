import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import HomePage from "./pages/Home/HomePage";
import LandingPage from "./pages/Home/LandingPage";
import SignupPage from "./pages/Auth/SignUpPage";
import Navbar from "./components/Common/Navbar";
import { useAuth } from "./contexts/authContext";

const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <LandingPage />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/dashboard" /> : <SignupPage />}
        />

        <Route path="/dashboard" element={<PrivateRoute />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = () => {
  const { token } = useAuth();
  return token ? <HomePage /> : <Navigate to="/login" />;
};

export default App;
