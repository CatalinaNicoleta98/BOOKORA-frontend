const TermsPage = () => {
    return (
        <div className="theme-page-shell relative min-h-screen">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 pb-16 pt-6">
                <section className="theme-glass-panel rounded-[2.25rem] p-6 sm:p-8 lg:p-10">
                    <p className="theme-eyebrow">Terms</p>
                    <h1 className="theme-title mt-3 text-3xl font-semibold sm:text-4xl">Terms of Use</h1>
                    <p className="theme-text-soft mt-4 text-sm leading-7 sm:text-[15px]">
                        These Terms of Use explain the basic rules for using Bookora. By accessing or using the
                        platform, you agree to follow these terms and use the service responsibly.
                    </p>
                    <p className="theme-text-muted mt-4 text-xs uppercase tracking-[0.18em]">
                        Last updated: May 13, 2026
                    </p>
                </section>

                <section className="theme-content-panel rounded-[2rem] p-6 sm:p-8">
                    <div className="space-y-8">
                        <div>
                            <h2 className="theme-title text-xl font-semibold">Using Bookora</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                Bookora is intended for personal reading management, discovery, and community features.
                                You agree to use the service lawfully and in a way that does not harm other readers,
                                interfere with the platform, or misuse Bookora content and systems.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Account Responsibility</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                You are responsible for maintaining the confidentiality of your account and for the
                                activity that happens under it. Please use accurate information and notify the Bookora
                                team if you believe your account has been compromised.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Reader Content</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                You keep ownership of the content you create in Bookora, such as profile details,
                                ratings, notes, reviews, and shelf organization. By posting content, you grant Bookora
                                permission to display and process it as needed to operate the service.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Acceptable Conduct</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                You may not use Bookora to harass others, upload unlawful or abusive material, scrape
                                data in unauthorized ways, attempt to disrupt the platform, or violate the rights of
                                readers, authors, publishers, or third parties.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Availability And Changes</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                We may update, improve, pause, or discontinue parts of Bookora over time. We aim to
                                keep the service reliable, but we do not guarantee uninterrupted availability or that
                                every feature will remain unchanged forever.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Intellectual Property</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                The Bookora product, branding, interface design, and platform materials are protected by
                                applicable intellectual property laws. You may not copy, reproduce, or redistribute
                                Bookora-owned materials beyond what is allowed by law or by written permission.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Limitation Of Liability</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                Bookora is provided on an as-available basis. To the extent permitted by law, Bookora
                                and its operators are not liable for indirect, incidental, or consequential damages that
                                result from your use of the service.
                            </p>
                        </div>

                        <div>
                            <h2 className="theme-title text-xl font-semibold">Updates To These Terms</h2>
                            <p className="theme-text-soft mt-3 text-sm leading-7">
                                We may revise these terms as the service evolves. Continued use of Bookora after updates
                                take effect means you accept the revised terms.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TermsPage;
