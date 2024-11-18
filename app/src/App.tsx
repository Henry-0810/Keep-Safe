import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage'
import HomePage from './pages/Home/HomePage';
import LandingPage from './pages/Home/LandingPage';
import SignupPage from './pages/Auth/SignUpPage';

const App = () => {
    const isAuthenticated = localStorage.getItem('token'); // Mock auth check

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                    path="/display"
                    element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
