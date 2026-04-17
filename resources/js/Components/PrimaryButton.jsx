export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-xl border border-transparent bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-primary-hover focus:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
