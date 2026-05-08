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
import LibraryPage from "../../features/library/pages/LibraryPage";
import PublicReaderProfilePage from "../../features/social/pages/PublicReaderProfilePage";
import AuthorDetailsPage from "../../features/authors/pages/AuthorDetailsPage";
import { APP_ROUTES } from "../../shared/navigation/navigation";

const ProtectedRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean; children: ReactElement }) => {
    if (!isAuthenticated) {
        return <Navigate to={APP_ROUTES.login} replace />;
    }

    return children;
};

const PublicOnlyRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean; children: ReactElement }) => {
    if (isAuthenticated) {
        return <Navigate to={APP_ROUTES.home} replace />;
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
                <Route path={APP_ROUTES.home} element={<HomePage />} />
                <Route path={APP_ROUTES.profile} element={<ProfilePage />} />
                <Route path={APP_ROUTES.search} element={<SearchPage />} />
                <Route path={APP_ROUTES.authorDetails} element={<AuthorDetailsPage />} />
                <Route path={APP_ROUTES.bookDetails} element={<BookPage />} />
                <Route path={APP_ROUTES.bookActivity} element={<EditBookActivityPage />} />
                <Route path={APP_ROUTES.library} element={<LibraryPage />} />
                <Route path={APP_ROUTES.readerProfile} element={<PublicReaderProfilePage />} />
            </Route>

            <Route
                path={APP_ROUTES.login}
                element={
                    <PublicOnlyRoute isAuthenticated={state.isAuthenticated}>
                        <LoginPage />
                    </PublicOnlyRoute>
                }
            />

            <Route
                path={APP_ROUTES.register}
                element={
                    <PublicOnlyRoute isAuthenticated={state.isAuthenticated}>
                        <RegisterPage />
                    </PublicOnlyRoute>
                }
            />

            <Route path="*" element={<Navigate to={APP_ROUTES.home} replace />} />
        </Routes>
    );
};

export default AppRouter;
