

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
    return (
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,21,38,0.74)_0%,rgba(11,16,30,0.7)_100%)] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition duration-300 hover:border-white/15 sm:p-9 xl:p-11">
            <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Register</p>
                <h2 className="text-[2.1rem] font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-[2.4rem]">
                    Join Bookora
                </h2>
                <p className="max-w-md text-[0.98rem] leading-7 text-slate-300/90">
                    Create your account and begin tracking your reading world beautifully.
                </p>
            </div>

            <form onSubmit={onSubmit} className="mt-10 space-y-6 sm:space-y-7">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-200">
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
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-sm text-white outline-none backdrop-blur-md transition duration-200 placeholder:text-slate-500 hover:border-white/15 hover:bg-white/[0.055] focus:border-violet-300/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-violet-300/10"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-200">
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
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-sm text-white outline-none backdrop-blur-md transition duration-200 placeholder:text-slate-500 hover:border-white/15 hover:bg-white/[0.055] focus:border-violet-300/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-violet-300/10"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => onPasswordChange(event.target.value)}
                        required
                        autoComplete="new-password"
                        placeholder="Create a password"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-sm text-white outline-none backdrop-blur-md transition duration-200 placeholder:text-slate-500 hover:border-white/15 hover:bg-white/[0.055] focus:border-violet-300/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-violet-300/10"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200">
                        Confirm password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => onConfirmPasswordChange(event.target.value)}
                        required
                        autoComplete="new-password"
                        placeholder="Repeat your password"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-sm text-white outline-none backdrop-blur-md transition duration-200 placeholder:text-slate-500 hover:border-white/15 hover:bg-white/[0.055] focus:border-violet-300/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-violet-300/10"
                    />
                </div>

                {error ? (
                    <div className="rounded-2xl border border-rose-300/15 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                        {error}
                    </div>
                ) : null}

                {successMessage ? (
                    <div className="rounded-2xl border border-emerald-300/15 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                        {successMessage}
                    </div>
                ) : null}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-[linear-gradient(135deg,#f1dfb1_0%,#d8c494_48%,#bba3ff_100%)] px-4 py-4 text-sm font-semibold text-slate-950 shadow-[0_14px_40px_rgba(187,163,255,0.18)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_18px_45px_rgba(187,163,255,0.24)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isSubmitting ? "Creating your account..." : "Create account"}
                </button>
            </form>

            <div className="mt-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Already with us</span>
                <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="mt-7 text-center text-sm leading-7 text-slate-300">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-amber-100 transition hover:text-white">
                    Sign in
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;