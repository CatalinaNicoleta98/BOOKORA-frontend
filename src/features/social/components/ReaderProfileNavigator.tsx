interface ReaderProfileNavigatorProps {
    items: Array<{
        id: string;
        label: string;
        count?: number;
    }>;
}

const ReaderProfileNavigator = ({ items }: ReaderProfileNavigatorProps) => {
    return (
        <nav className="theme-content-panel-soft sticky top-4 z-10 overflow-x-auto rounded-[1.6rem] p-3 backdrop-blur-xl">
            <div className="flex min-w-max items-center gap-3">
                {items.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="theme-button-ghost inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap"
                    >
                        <span>{item.label}</span>
                        {typeof item.count === "number" ? (
                            <span className="theme-pill-subtle rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                                {item.count}
                            </span>
                        ) : null}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export type { ReaderProfileNavigatorProps };
export default ReaderProfileNavigator;
