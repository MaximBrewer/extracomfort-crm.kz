export default function InputLabel({ value, className = '', children, size = `text-sm`, color = `text-gray-700`, weight = `font-medium`, ...props }) {
    return (
        <label {...props} className={`block ${weight} ${size} ${weight} ` + className}>
            {value ? value : children}
        </label>
    );
}
