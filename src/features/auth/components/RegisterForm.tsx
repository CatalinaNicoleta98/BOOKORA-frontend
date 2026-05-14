
import { useState } from "react";
import { Link } from "react-router-dom";
import type { FormEventHandler } from "react";

type RegisterFormProps = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    error: string | null;
    successMessage: string | null;
    isSubmitting: boolean;
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onConfirmPasswordChange: (value: string) => void;
    onSubmit: FormEventHandler<HTMLFormElement>;
};

const RegisterForm = ({
    name,
    email,
    password,
    confirmPassword,
    error,
    successMessage,
    isSubmitting,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onSubmit,
}: RegisterFormProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    return (
        <div className="theme-glass-panel rounded-[2rem] p-7 transition duration-300 hover:border-[var(--bookora-border-strong)] sm:p-9 xl:p-11">
            <div className="space-y-3">
                <p className="theme-eyebrow">Register</p>
                <h2 className="theme-title text-[2.1rem] font-semibold leading-[1] tracking-[-0.04em] sm:text-[2.4rem]">
                    Join Bookora
                </h2>
                <p className="theme-text-soft max-w-md text-[0.98rem] leading-7">
                    Create your account and begin tracking your reading world beautifully.
                </p>
            </div>

            <form onSubmit={onSubmit} className="mt-10 space-y-6 sm:space-y-7">
                <div className="space-y-2">
                    <label htmlFor="name" className="theme-text block text-sm font-medium">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => onNameChange(event.target.value)}
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className="theme-input w-full rounded-2xl px-4 py-3.5 text-sm backdrop-blur-md transition duration-200"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="theme-text block text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => onEmailChange(event.target.value)}
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="theme-input w-full rounded-2xl px-4 py-3.5 text-sm backdrop-blur-md transition duration-200"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="theme-text block text-sm font-medium">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={isPasswordVisible ? "text" : "password"}
                            value={password}
                            onChange={(event) => onPasswordChange(event.target.value)}
                            required
                            autoComplete="new-password"
                            placeholder="Create a password"
                            className="theme-input w-full rounded-2xl px-4 py-3.5 pr-14 text-sm backdrop-blur-md transition duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
                            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                            aria-pressed={isPasswordVisible}
                            className="theme-text-muted absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-200 hover:text-[var(--bookora-title)]"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isPasswordVisible ? (
                                    <>
                                        <path
                                            d="M2 12C3.8 8.4 7.4 6 12 6C16.6 6 20.2 8.4 22 12C20.2 15.6 16.6 18 12 18C7.4 18 3.8 15.6 2 12Z"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                        />
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                                    </>
                                ) : (
                                    <>
                                        <path
                                            d="M3 3L21 21"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M10.6 10.7C10.2 11.1 10 11.5 10 12C10 13.1 10.9 14 12 14C12.5 14 12.9 13.8 13.3 13.4"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M6.7 6.8C4.7 7.9 3.1 9.6 2 12C3.8 15.6 7.4 18 12 18C14.1 18 16 17.5 17.6 16.5"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M9.9 6.2C10.6 6.1 11.3 6 12 6C16.6 6 20.2 8.4 22 12C21.2 13.5 20.2 14.8 18.9 15.8"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="theme-text block text-sm font-medium">
                        Confirm password
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(event) => onConfirmPasswordChange(event.target.value)}
                            required
                            autoComplete="new-password"
                            placeholder="Repeat your password"
                            className="theme-input w-full rounded-2xl px-4 py-3.5 pr-14 text-sm backdrop-blur-md transition duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setIsConfirmPasswordVisible((currentValue) => !currentValue)}
                            aria-label={isConfirmPasswordVisible ? "Hide password confirmation" : "Show password confirmation"}
                            aria-pressed={isConfirmPasswordVisible}
                            className="theme-text-muted absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-200 hover:text-[var(--bookora-title)]"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isConfirmPasswordVisible ? (
                                    <>
                                        <path
                                            d="M2 12C3.8 8.4 7.4 6 12 6C16.6 6 20.2 8.4 22 12C20.2 15.6 16.6 18 12 18C7.4 18 3.8 15.6 2 12Z"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                        />
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                                    </>
                                ) : (
                                    <>
                                        <path
                                            d="M3 3L21 21"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M10.6 10.7C10.2 11.1 10 11.5 10 12C10 13.1 10.9 14 12 14C12.5 14 12.9 13.8 13.3 13.4"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M6.7 6.8C4.7 7.9 3.1 9.6 2 12C3.8 15.6 7.4 18 12 18C14.1 18 16 17.5 17.6 16.5"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M9.9 6.2C10.6 6.1 11.3 6 12 6C16.6 6 20.2 8.4 22 12C21.2 13.5 20.2 14.8 18.9 15.8"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {error ? (
                    <div className="theme-status-error rounded-2xl px-4 py-3 text-sm">
                        {error}
                    </div>
                ) : null}

                {successMessage ? (
                    <div className="theme-status-success rounded-2xl px-4 py-3 text-sm">
                        {successMessage}
                    </div>
                ) : null}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="theme-button-primary w-full rounded-2xl px-4 py-4 text-sm font-semibold transition duration-300 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isSubmitting ? "Creating your account..." : "Create account"}
                </button>
            </form>

            <div className="mt-10 flex items-center gap-4">
                <div className="theme-divider-line h-px flex-1" />
                <span className="theme-text-muted text-xs uppercase tracking-[0.24em]">Already with us</span>
                <div className="theme-divider-line h-px flex-1" />
            </div>

            <div className="theme-text-soft mt-7 text-center text-sm leading-7">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-[var(--bookora-accent)] transition hover:text-[var(--bookora-title)]">
                    Sign in
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
