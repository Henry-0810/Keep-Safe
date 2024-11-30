import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/index";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-5 flex items-center justify-between font-sans">
      <div className="flex items-center space-x-2">
        <img
          src="/BG.png"
          alt="App Logo"
          className="h-10 w-10 object-cover rounded-full"
        />
        <Link to="/" className="text-lg font-semibold">
          Keep Safe
        </Link>
      </div>

      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
