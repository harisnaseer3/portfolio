export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-primary shadow-sm focus:ring-primary h-5 w-5 transition-all ' +
                className
            }
        />
    );
}
