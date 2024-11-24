import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col justify-center items-center text-center font-sans">
      <h1 className="text-5xl font-bold mb-6">Welcome to Keep Safe</h1>
      <p className="text-lg mb-10 max-w-2xl">
        Protect your passwords with ease. Keep Safe helps you manage and secure
        your sensitive information using advanced encryption and seamless tools.
      </p>
      <div className="flex space-x-6">
        <Link to="/login">
          <button className="bg-blue-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-800 transition duration-300">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-purple-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-800 transition duration-300">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
