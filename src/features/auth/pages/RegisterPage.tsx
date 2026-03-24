import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

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
        <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.22),_transparent_24%),radial-gradient(circle_at_86%_16%,_rgba(244,208,140,0.14),_transparent_18%),radial-gradient(circle_at_18%_78%,_rgba(125,211,252,0.09),_transparent_18%),linear-gradient(180deg,_#0b1020_0%,_#090d18_42%,_#060811_100%)]" />
            <div className="absolute inset-0 opacity-55 [background-image:radial-gradient(rgba(255,255,255,0.22)_0.7px,transparent_0.7px)] [background-size:30px_30px]" />
            <div className="absolute inset-0 opacity-80 [background-image:radial-gradient(rgba(255,255,255,0.42)_1.2px,transparent_1.2px)] [background-size:150px_150px] animate-[pulse_12s_ease-in-out_infinite]" />
            <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(244,208,140,0.42)_1.1px,transparent_1.1px)] [background-size:210px_210px] animate-[pulse_18s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.035)_18%,transparent_38%)] animate-[pulse_14s_ease-in-out_infinite]" />
            <div className="absolute left-[-10rem] top-[-6rem] h-72 w-72 rounded-full bg-violet-500/12 blur-3xl animate-[pulse_16s_ease-in-out_infinite]" />
            <div className="absolute bottom-[-8rem] right-[-4rem] h-80 w-80 rounded-full bg-amber-300/12 blur-3xl animate-[pulse_18s_ease-in-out_infinite]" />
            <div className="absolute left-[12%] top-[24%] h-40 w-40 rounded-full bg-sky-300/6 blur-3xl animate-[pulse_20s_ease-in-out_infinite] sm:h-48 sm:w-48 lg:h-56 lg:w-56" />
            <div className="absolute right-[10%] top-[22%] h-44 w-44 rounded-full bg-fuchsia-300/5 blur-3xl animate-[pulse_22s_ease-in-out_infinite] sm:h-52 sm:w-52 lg:h-60 lg:w-60" />

            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute right-[-2rem] top-[4%] h-[15rem] w-[15rem] opacity-[0.22] blur-[0.4px] animate-[pulse_18s_ease-in-out_infinite] sm:right-[3%] sm:top-[6%] sm:h-[18rem] sm:w-[18rem] lg:right-[8%] lg:top-[10%] lg:h-[24rem] lg:w-[24rem] xl:h-[30rem] xl:w-[30rem]">
                    <svg viewBox="0 0 600 600" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M108 354C154 318 197 300 241 288C269 281 296 266 320 244C352 214 361 180 350 151C389 175 412 210 415 252C418 295 396 332 356 360C321 385 280 398 244 412C209 425 180 442 166 469C164 434 178 406 208 381C176 388 145 402 116 428C126 397 142 373 164 354C145 353 126 353 108 354Z"
                            stroke="rgba(244,208,140,0.92)"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M241 288C254 253 281 219 321 189C348 168 367 147 377 126C383 149 378 171 362 192C395 201 423 220 445 250C411 239 384 235 364 240"
                            stroke="rgba(196,181,253,0.86)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M293 306C319 307 341 301 361 286"
                            stroke="rgba(255,255,255,0.62)"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                        />
                        <circle cx="362" cy="286" r="2.4" fill="rgba(255,255,255,0.85)" />
                    </svg>
                </div>

                <div className="absolute left-[2%] top-[12%] h-24 w-24 opacity-75 blur-[0.1px] animate-[pulse_12s_ease-in-out_infinite] sm:left-[5%] sm:top-[14%] sm:h-28 sm:w-28 lg:left-[6%] lg:top-[18%] lg:h-40 lg:w-40 xl:left-[8%] xl:top-[16%]">
                    <svg viewBox="0 0 220 220" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M52 70L58 86L74 92L58 98L52 114L46 98L30 92L46 86L52 70Z" fill="rgba(255,255,255,0.9)" />
                        <path d="M126 36L131 48L143 53L131 58L126 70L121 58L109 53L121 48L126 36Z" fill="rgba(216,196,148,0.94)" />
                        <path d="M156 116L161 128L173 133L161 138L156 150L151 138L139 133L151 128L156 116Z" fill="rgba(196,181,253,0.9)" />
                        <circle cx="92" cy="122" r="3.5" fill="rgba(255,255,255,0.78)" />
                        <circle cx="110" cy="146" r="2.5" fill="rgba(244,208,140,0.82)" />
                        <circle cx="142" cy="92" r="2.5" fill="rgba(196,181,253,0.82)" />
                    </svg>
                </div>

                <div className="absolute right-[14%] top-[56%] hidden h-28 w-28 opacity-60 lg:block animate-[pulse_16s_ease-in-out_infinite] xl:h-36 xl:w-36">
                    <svg viewBox="0 0 260 260" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M116 148C125 132 138 119 156 109C148 126 147 141 152 156C137 155 125 152 116 148Z"
                            fill="rgba(255,255,255,0.32)"
                        />
                        <path
                            d="M92 170C101 145 118 126 143 113C132 133 130 154 137 176C120 177 105 175 92 170Z"
                            fill="rgba(216,196,148,0.26)"
                        />
                        <path
                            d="M135 134C144 120 157 110 174 103"
                            stroke="rgba(255,255,255,0.72)"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <circle cx="124" cy="182" r="2.2" fill="rgba(244,208,140,0.88)" />
                        <circle cx="145" cy="190" r="1.8" fill="rgba(196,181,253,0.82)" />
                    </svg>
                </div>

                <div className="absolute bottom-[16%] left-[10%] hidden h-16 w-16 opacity-65 md:block animate-[pulse_10s_ease-in-out_infinite]">
                    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60 18L66 36L84 42L66 48L60 66L54 48L36 42L54 36L60 18Z" fill="rgba(255,255,255,0.82)" />
                        <circle cx="60" cy="90" r="3" fill="rgba(216,196,148,0.78)" />
                    </svg>
                </div>
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] items-center px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-14 xl:px-14">
                <div className="grid w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05] shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_28%,transparent_72%,rgba(255,255,255,0.03))] before:content-[''] lg:min-h-[820px] lg:grid-cols-[1.18fr_0.82fr] xl:rounded-[2.25rem]">
                    <section className="relative hidden min-h-[820px] overflow-hidden border-r border-white/10 lg:block">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_30%),linear-gradient(180deg,_rgba(13,18,34,0.65)_0%,_rgba(9,11,20,0.82)_100%)]" />
                        <div className="absolute inset-x-10 top-10 flex items-center justify-between xl:inset-x-12 xl:top-12">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-lg font-semibold text-amber-100 shadow-inner shadow-white/10">
                                    B
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Bookora</p>
                                    <p className="text-sm text-slate-300">Personal reading sanctuary</p>
                                </div>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-200 shadow-[0_0_30px_rgba(255,255,255,0.04)] backdrop-blur-md">
                                Build your library
                            </div>
                        </div>

                        <div className="relative flex h-full flex-col justify-between px-10 pb-10 pt-36 xl:px-14 xl:pb-14 xl:pt-40">
                            <div className="max-w-2xl space-y-10">
                                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-amber-100/8 px-4 py-2 text-xs uppercase tracking-[0.25em] text-amber-100/80">
                                    Begin your reading world
                                </div>

                                <div className="space-y-7">
                                    <h1 className="max-w-2xl text-[3.6rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white xl:text-[4.5rem]">
                                        Create a home for every book, review, note, and goal you want to keep.
                                    </h1>
                                    <p className="max-w-xl text-lg leading-8 text-slate-300/90 xl:max-w-xl">
                                        Build your library beautifully, track reading and listening separately, and keep your shelves and progress in one elegant place.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 pt-4 xl:grid-cols-3">
                                <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.07]">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Track richly</p>
                                    <p className="mt-4 text-lg font-medium text-white">Reading and listening</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">Keep physical books, ebooks, and audiobooks organized without losing the nuance of each format.</p>
                                </article>

                                <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.07]">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Review beautifully</p>
                                    <p className="mt-4 text-lg font-medium text-white">Notes and half-stars</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">Capture your thoughts with refined reviews, notes, and flexible ratings that feel made for readers.</p>
                                </article>

                                <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.07]">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Grow with goals</p>
                                    <p className="mt-4 text-lg font-medium text-white">Progress with clarity</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">Follow yearly goals, shelves, and personal reading momentum with a calmer, more curated experience.</p>
                                </article>
                            </div>
                        </div>
                    </section>

                    <section className="relative flex min-h-[640px] items-center bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_100%)] px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[820px] lg:px-10 xl:px-14">
                        <div className="mx-auto w-full max-w-lg">
                            <div className="mb-10 space-y-5 lg:hidden">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-lg font-semibold text-amber-100 shadow-inner shadow-white/10">
                                        B
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Bookora</p>
                                        <p className="text-sm text-slate-300">Personal reading sanctuary</p>
                                    </div>
                                </div>
                                <h1 className="max-w-md text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
                                    Create your account.
                                </h1>
                                <p className="text-sm leading-6 text-slate-300">
                                    Start building your library, shelves, notes, and goals in one place.
                                </p>
                            </div>

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

                                <form onSubmit={handleSubmit} className="mt-10 space-y-6 sm:space-y-7">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-200">
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
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
                                            onChange={(event) => setEmail(event.target.value)}
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
                                            onChange={(event) => setPassword(event.target.value)}
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
                                            onChange={(event) => setConfirmPassword(event.target.value)}
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
                                    <Link
                                        to="/login"
                                        className="font-medium text-amber-100 transition hover:text-white"
                                    >
                                        Sign in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;