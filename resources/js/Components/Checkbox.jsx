export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 ' +
                className
            }
        />
    );
}
