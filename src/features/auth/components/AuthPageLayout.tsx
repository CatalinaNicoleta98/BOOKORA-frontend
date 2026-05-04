

import type { ReactNode } from "react";
import AuthShowcase from "./AuthShowcase";
import AuthMobileIntro from "./AuthMobileIntro";

type AuthPageLayoutProps = {
    mobileIntroTitle: string;
    mobileIntroSubtitle: string;
    children: ReactNode;
};

const AuthPageLayout = ({
    mobileIntroTitle,
    mobileIntroSubtitle,
    children,
}: AuthPageLayoutProps) => {
    return (
        <div className="theme-auth-shell relative min-h-screen overflow-hidden">
            <div className="absolute inset-0" />
            <div className="theme-auth-dot-grid-soft absolute inset-0 opacity-55" />
            <div className="theme-auth-dot-grid-strong absolute inset-0 opacity-80 animate-[pulse_12s_ease-in-out_infinite]" />
            <div className="theme-auth-dot-grid-accent absolute inset-0 opacity-45 animate-[pulse_18s_ease-in-out_infinite]" />
            <div className="theme-auth-sheen absolute inset-0 animate-[pulse_14s_ease-in-out_infinite]" />
            <div className="theme-auth-orb-violet absolute left-[-10rem] top-[-6rem] h-72 w-72 rounded-full blur-3xl animate-[pulse_16s_ease-in-out_infinite]" />
            <div className="theme-auth-orb-amber absolute bottom-[-8rem] right-[-4rem] h-80 w-80 rounded-full blur-3xl animate-[pulse_18s_ease-in-out_infinite]" />
            <div className="theme-auth-orb-sky absolute left-[12%] top-[24%] h-40 w-40 rounded-full blur-3xl animate-[pulse_20s_ease-in-out_infinite] sm:h-48 sm:w-48 lg:h-56 lg:w-56" />
            <div className="theme-auth-orb-fuchsia absolute right-[10%] top-[22%] h-44 w-44 rounded-full blur-3xl animate-[pulse_22s_ease-in-out_infinite] sm:h-52 sm:w-52 lg:h-60 lg:w-60" />

            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute right-[-2rem] top-[4%] h-[15rem] w-[15rem] opacity-[0.22] blur-[0.4px] animate-[pulse_18s_ease-in-out_infinite] sm:right-[3%] sm:top-[6%] sm:h-[18rem] sm:w-[18rem] lg:right-[8%] lg:top-[10%] lg:h-[24rem] lg:w-[24rem] xl:h-[30rem] xl:w-[30rem]">
                    <svg viewBox="0 0 600 600" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M108 354C154 318 197 300 241 288C269 281 296 266 320 244C352 214 361 180 350 151C389 175 412 210 415 252C418 295 396 332 356 360C321 385 280 398 244 412C209 425 180 442 166 469C164 434 178 406 208 381C176 388 145 402 116 428C126 397 142 373 164 354C145 353 126 353 108 354Z"
                            stroke="var(--bookora-auth-illustration-primary)"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M241 288C254 253 281 219 321 189C348 168 367 147 377 126C383 149 378 171 362 192C395 201 423 220 445 250C411 239 384 235 364 240"
                            stroke="var(--bookora-auth-illustration-secondary)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M293 306C319 307 341 301 361 286"
                            stroke="var(--bookora-auth-illustration-soft)"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                        />
                        <circle cx="362" cy="286" r="2.4" fill="var(--bookora-auth-illustration-solid)" />
                    </svg>
                </div>

                <div className="absolute left-[2%] top-[12%] h-24 w-24 opacity-75 blur-[0.1px] animate-[pulse_12s_ease-in-out_infinite] sm:left-[5%] sm:top-[14%] sm:h-28 sm:w-28 lg:left-[6%] lg:top-[18%] lg:h-40 lg:w-40 xl:left-[8%] xl:top-[16%]">
                    <svg viewBox="0 0 220 220" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M52 70L58 86L74 92L58 98L52 114L46 98L30 92L46 86L52 70Z" fill="var(--bookora-auth-spark-primary)" />
                        <path d="M126 36L131 48L143 53L131 58L126 70L121 58L109 53L121 48L126 36Z" fill="var(--bookora-auth-spark-accent)" />
                        <path d="M156 116L161 128L173 133L161 138L156 150L151 138L139 133L151 128L156 116Z" fill="var(--bookora-auth-illustration-secondary)" />
                        <circle cx="92" cy="122" r="3.5" fill="var(--bookora-auth-illustration-soft)" />
                        <circle cx="110" cy="146" r="2.5" fill="var(--bookora-auth-illustration-primary)" />
                        <circle cx="142" cy="92" r="2.5" fill="var(--bookora-auth-illustration-secondary)" />
                    </svg>
                </div>

                <div className="absolute right-[14%] top-[56%] hidden h-28 w-28 opacity-60 lg:block animate-[pulse_16s_ease-in-out_infinite] xl:h-36 xl:w-36">
                    <svg viewBox="0 0 260 260" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M116 148C125 132 138 119 156 109C148 126 147 141 152 156C137 155 125 152 116 148Z"
                            fill="var(--bookora-auth-illustration-soft-fill)"
                        />
                        <path
                            d="M92 170C101 145 118 126 143 113C132 133 130 154 137 176C120 177 105 175 92 170Z"
                            fill="var(--bookora-auth-illustration-accent-fill)"
                        />
                        <path
                            d="M135 134C144 120 157 110 174 103"
                            stroke="var(--bookora-auth-illustration-soft)"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <circle cx="124" cy="182" r="2.2" fill="var(--bookora-auth-illustration-primary)" />
                        <circle cx="145" cy="190" r="1.8" fill="var(--bookora-auth-illustration-secondary)" />
                    </svg>
                </div>

                <div className="absolute bottom-[16%] left-[10%] hidden h-16 w-16 opacity-65 md:block animate-[pulse_10s_ease-in-out_infinite]">
                    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60 18L66 36L84 42L66 48L60 66L54 48L36 42L54 36L60 18Z" fill="var(--bookora-auth-spark-primary)" />
                        <circle cx="60" cy="90" r="3" fill="var(--bookora-auth-spark-accent)" />
                    </svg>
                </div>
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] items-center px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-14 xl:px-14">
                <div className="theme-glass-panel theme-auth-panel-highlight relative grid w-full overflow-hidden rounded-[1.75rem] before:pointer-events-none before:absolute before:inset-0 before:content-[''] lg:min-h-[820px] lg:grid-cols-[1.18fr_0.82fr] xl:rounded-[2.25rem]">
                    <AuthShowcase />

                    <section className="theme-auth-form-surface relative flex min-h-[640px] items-center px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[820px] lg:px-10 xl:px-14">
                        <div className="mx-auto w-full max-w-lg">
                            <AuthMobileIntro title={mobileIntroTitle} subtitle={mobileIntroSubtitle} />
                            {children}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AuthPageLayout;
