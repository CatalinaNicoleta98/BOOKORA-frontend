const PrivacyPage = () => {
    return (
        <div className="theme-page-shell relative min-h-screen">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 pb-16 pt-6">
                <section className="theme-glass-panel rounded-[2.25rem] p-6 sm:p-8 lg:p-10">
                    <p className="theme-eyebrow">Privacy</p>
                    <h1 className="theme-title mt-3 text-3xl font-semibold sm:text-4xl">Privacy Policy</h1>
                    <p className="theme-text-soft mt-4 text-sm leading-7 sm:text-[15px]">
                        Bookora is built to help readers track their books, reading habits, and shelves with clarity
                        and care. This page explains what information we collect, how we use it, and the choices you
                        have over your data.
                    </p>
                    <p className="theme-text-muted mt-4 text-xs uppercase tracking-[0.18em]">
                        Last updated: May 13, 2026
                    </p>
                </section>

                <section className="theme-content-panel rounded-[2rem] p-6 sm:p-8">
                    <div className="space-y-8">
                        <div>
                            <h2 className="theme-title text-xl font-semibold">What We Collect</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                We may collect account details such as your name, email address, profile image, and
                                profile bio. We also store the reading activity you choose to add, including shelves,
                                statuses, ratings, review notes, reading dates, and book formats.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">How We Use Your Information</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                We use your information to run your Bookora account, show your library and profile,
                                improve recommendations and browsing features, support account security, and understand
                                how readers use the product so we can make it better.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Profile Visibility</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                Some information in Bookora may be visible to other readers when you use public profile
                                features. This can include your display name, avatar, selected shelves, and public
                                reading activity. Private account details such as your login email are not shown
                                publicly unless you explicitly choose to share them.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Cookies And Similar Technologies</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                Bookora may use cookies or similar storage tools to keep you signed in, remember your
                                preferences, support core functionality, and understand site performance. These tools
                                help us deliver a smoother reading and browsing experience.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">How We Share Information</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                We do not sell your personal information. We may share data with service providers who
                                help us host the app, store files, analyze product usage, or support security and
                                maintenance. We may also disclose information if required by law or to protect the
                                safety of Bookora and its users.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Your Choices</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                You can update your profile details, manage what you add to your shelves, and remove
                                information you no longer want associated with your account. If you need help with data
                                access, correction, or deletion requests, you can contact the Bookora team for support.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Data Security</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                We use reasonable technical and organizational safeguards to protect your information.
                                No service can guarantee absolute security, but we work to reduce risk and respond
                                quickly when issues arise.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Contact</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                If you have questions about this policy or how your information is handled, contact the
                                Bookora team through the support channel associated with your account or your project’s
                                official contact email.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPage;
