import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col justify-center items-center text-center font-sans">
    <h1 className="text-5xl font-bold mb-4">Welcome to Keep Safe</h1>
    <p className="text-xl mb-8 max-w-lg">
        Protect your passwords with ease. Keep Safe helps you manage and secure your sensitive information with advanced encryption.
    </p>
    <div className="flex space-x-4">
        <Link to="/login">
            <button className="bg-blue-700 px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-800 transition duration-300">
                <strong>Login</strong>
            </button>
        </Link>
        <Link to="/signup">
            <button className="bg-purple-700 px-6 py-3 rounded-lg text-lg font-medium hover:bg-purple-800 transition duration-300">
                <strong>Sign Up</strong>
            </button>
        </Link>
    </div>
</div>
    );
};

export default LandingPage;

