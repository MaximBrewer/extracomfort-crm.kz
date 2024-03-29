export default function SecondaryButton({ type = 'button', className = '', size = `md`, disabled, children, ...props }) {

    let classes = `inline-flex items-cente tracking-widestr hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 bg-white border border-gray-300 text-gray-700`

    switch (size) {
        case `xs`:
            classes += ` px-2 py-1.5 rounded-lg font-medium text-sm leading-none`
            break;
        case `sm`:
            classes += ` px-4 py-2 rounded-md font-semibold text-xs uppercase`
            break;
        default:
            classes += ` px-4 py-3 rounded font-semibold`
    }

    return (
        <button
            {...props}
            type={type}
            className={
                `${classes} shadow-sm ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
