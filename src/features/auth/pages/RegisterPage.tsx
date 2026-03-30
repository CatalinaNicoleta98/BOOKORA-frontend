import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import AuthPageLayout from "../components/AuthPageLayout";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError(null);
        setSuccessMessage(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);

        try {
            await authService.register({ name, email, password });

            setSuccessMessage("Account created successfully. You can now sign in.");

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            window.setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (err: unknown) {
            const fallbackMessage = "Registration failed. Please try again.";
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
            mobileIntroTitle="Create your account."
            mobileIntroSubtitle="Start building your library, shelves, notes, and goals in one place."
        >
            <RegisterForm
                name={name}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                error={error}
                successMessage={successMessage}
                isSubmitting={isSubmitting}
                onNameChange={setName}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onConfirmPasswordChange={setConfirmPassword}
                onSubmit={handleSubmit}
            />
        </AuthPageLayout>
    );
};

export default RegisterPage;