import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-main)] rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-text-muted/50 ' +
                className
            }
            ref={localRef}
        />
    );
});
