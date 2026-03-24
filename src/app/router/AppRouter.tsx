import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";
import { useAuth } from "../../features/auth/context/AuthContext";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import HomePage from "../../features/home/pages/HomePage";

const ProtectedRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean; children: ReactElement }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const PublicOnlyRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean; children: ReactElement }) => {
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

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
                    <ProtectedRoute isAuthenticated={state.isAuthenticated}>
                        <HomePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/login"
                element={
                    <PublicOnlyRoute isAuthenticated={state.isAuthenticated}>
                        <LoginPage />
                    </PublicOnlyRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <PublicOnlyRoute isAuthenticated={state.isAuthenticated}>
                        <RegisterPage />
                    </PublicOnlyRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;