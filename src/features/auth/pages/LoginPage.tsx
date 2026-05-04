import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import AuthCard from "../components/AuthCard";
import AuthPageLayout from "../components/AuthPageLayout";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError(null);
        setIsSubmitting(true);

        try {
            await login({ email, password });
            navigate("/");
        } catch (err: unknown) {
            const fallbackMessage = "Login failed. Please check your details and try again.";
            const errorMessage =
                typeof err === "object" &&
                err !== null &&
                "response" in err &&
                typeof (err as { response?: { data?: { error?: string } } }).response?.data?.error === "string"
                    ? (err as { response?: { data?: { error?: string } } }).response?.data?.error ?? fallbackMessage
                    : fallbackMessage;

            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <AuthPageLayout
            mobileIntroTitle="Welcome back."
            mobileIntroSubtitle="Sign in to continue your library, reading goals, notes, and reviews."
        >
            <AuthCard
                eyebrow="Sign in"
                title="Welcome back to Bookora"
                description="Continue where you left off, from your shelves to your current reads."
                footer={(
                    <>
                        <div className="flex items-center gap-4">
                            <div className="theme-divider-line h-px flex-1" />
                            <span className="theme-text-muted text-xs uppercase tracking-[0.24em]">New to Bookora</span>
                            <div className="theme-divider-line h-px flex-1" />
                        </div>

                        <div className="theme-text-soft mt-7 text-center text-sm leading-7">
                            Don&apos;t have an account yet?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-[var(--bookora-accent)] transition hover:text-[var(--bookora-title)]"
                            >
                                Create one
                            </Link>
                        </div>
                    </>
                )}
            >
                <LoginForm
                    email={email}
                    password={password}
                    error={error}
                    isSubmitting={isSubmitting}
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                    onSubmit={handleSubmit}
                />
            </AuthCard>
        </AuthPageLayout>
    );
};

export default LoginPage;
