

import { Link } from "react-router-dom";
import BookoraBrand from "../branding/BookoraBrand";
import { APP_ROUTES } from "../../navigation/navigation";

interface NavLogoProps {
    onClick?: () => void;
}

const NavLogo = ({ onClick }: NavLogoProps) => {
    return (
        <Link
            to={APP_ROUTES.home}
            onClick={onClick}
            className="group flex min-w-0 items-center rounded-2xl border border-[var(--bookora-border)] bg-[var(--bookora-surface)] px-3 py-2 transition-all duration-300 hover:border-[var(--bookora-border-strong)] hover:bg-[var(--bookora-surface-strong)]"
        >
            <BookoraBrand />
        </Link>
    );
};

export default NavLogo;
