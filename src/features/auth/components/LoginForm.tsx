

import type { FormEvent } from "react";

type LoginFormProps = {
    email: string;
    password: string;
    error: string | null;
    isSubmitting: boolean;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
};

const LoginForm = ({
    email,
    password,
    error,
    isSubmitting,
    onEmailChange,
    onPasswordChange,
    onSubmit
}: LoginFormProps) => {
    return (
        <form onSubmit={onSubmit} className="mt-10 space-y-6 sm:space-y-7">
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
                    className="theme-input w-full rounded-2xl px-4 py-3.5 text-sm backdrop-blur-md"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="theme-text block text-sm font-medium">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => onPasswordChange(event.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="theme-input w-full rounded-2xl px-4 py-3.5 text-sm backdrop-blur-md"
                />
            </div>

            {error ? (
                <div className="theme-status-error rounded-2xl px-4 py-3 text-sm">
                    {error}
                </div>
            ) : null}

            <button
                type="submit"
                disabled={isSubmitting}
                className="theme-button-primary w-full rounded-2xl px-4 py-4 text-sm font-semibold"
            >
                {isSubmitting ? "Signing you in..." : "Sign in"}
            </button>
        </form>
    );
};

export default LoginForm;
