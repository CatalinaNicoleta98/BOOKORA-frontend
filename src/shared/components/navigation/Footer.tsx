
import { Link } from "react-router-dom";
import BookoraBrand from "../branding/BookoraBrand";
import { PRIMARY_NAV_ITEMS } from "../../navigation/navigation";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="theme-footer relative mt-16 border-t backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px" />

            <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="space-y-3">
                        <BookoraBrand />
                        <p className="text-sm text-[var(--bookora-text-muted)]">
                            Your personal reading universe. Track books, discover stories, and build your own library across formats.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--bookora-text-muted)]">
                            Navigation
                        </p>

                        {PRIMARY_NAV_ITEMS.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="text-sm text-[var(--bookora-text-soft)] transition-colors duration-200 hover:text-[var(--bookora-title)]"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--bookora-text-muted)]">
                            About
                        </p>

                        <p className="text-sm text-[var(--bookora-text-muted)]">
                            Built with a focus on modern reading habits, including audiobooks, ebooks, and community-driven content.
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--bookora-border)] pt-6 text-sm text-[var(--bookora-text-muted)] sm:flex-row sm:items-center">
                    <p>© {currentYear} Bookora. All rights reserved.</p>

                    <div className="flex items-center gap-4">
                        <span className="cursor-pointer transition-colors duration-200 hover:text-[var(--bookora-title)]">
                            Privacy
                        </span>
                        <span className="cursor-pointer transition-colors duration-200 hover:text-[var(--bookora-title)]">
                            Terms
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
