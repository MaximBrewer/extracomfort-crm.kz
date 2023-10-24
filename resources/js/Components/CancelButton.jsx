export default function CancelButton({ className = '', disabled, size = `md`, children, ...props }) {

    let classes = `inline-flex items-center bg-red-700 border border-transparent text-white transition ease-in-out duration-150`

    switch (size) {
        case `sm`:
            classes += ` px-4 py-2.5 rounded-lg font-bold text-sm`
        case `wide`:
            classes += ` px-8 py-3 rounded-xl font-semibold text-lg`
        default:
            classes += ` px-4 py-3 rounded-xl font-semibold text-lg`
    }

    return (
        <button
            {...props}
            className={
                `${classes} ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
