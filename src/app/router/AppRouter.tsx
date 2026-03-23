import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import HomePage from "../../features/home/pages/HomePage";

const AppRouter = () => {
    const { state } = useAuth();

    if (state.isLoading) {
        return null;
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    state.isAuthenticated
                        ? <HomePage />
                        : <Navigate to="/login" replace />
                }
            />

            <Route
                path="/login"
                element={
                    !state.isAuthenticated
                        ? <LoginPage />
                        : <Navigate to="/" replace />
                }
            />

            <Route
                path="/register"
                element={
                    !state.isAuthenticated
                        ? <RegisterPage />
                        : <Navigate to="/" replace />
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;