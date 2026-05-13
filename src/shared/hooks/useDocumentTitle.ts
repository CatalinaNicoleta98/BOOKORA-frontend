import { useEffect } from "react";

const DEFAULT_TITLE = "Bookora";

export const useDocumentTitle = (title?: string) => {
    useEffect(() => {
        document.title = title?.trim() || DEFAULT_TITLE;
    }, [title]);
};
