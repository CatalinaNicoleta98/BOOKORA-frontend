import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";
import { useAuth } from "../../features/auth/context/AuthContext";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import HomePage from "../../features/home/pages/HomePage";
import ProfilePage from "../../features/profile/pages/ProfilePage";
import SearchPage from "../../features/search/pages/SearchPage";
import AppShell from "../../shared/components/layout/AppShell";
import BookPage from "../../features/book/pages/BookPage";
import EditBookActivityPage from "../../features/library/pages/EditBookActivityPage";

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
                element={
                    <ProtectedRoute isAuthenticated={state.isAuthenticated}>
                        <AppShell />
                    </ProtectedRoute>
                }
            >
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/books/:id" element={<BookPage />} />
                <Route path="/books/:bookId/activity" element={<EditBookActivityPage />} />
            </Route>

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