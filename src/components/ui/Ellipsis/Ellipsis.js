import React, { useEffect, useState } from 'react';

export default function Ellipsis({ text = '', timeout = 300 }) {
    const [count, setCount] = useState(1);
    const updateCount = () => setCount(count === 3 ? 0 : count + 1);
    useEffect(() => {
        const timeoutId = setTimeout(updateCount, timeout);
        return () => clearTimeout(timeoutId);
    }, [count]);
    return (
        <span className="Ellipsis">
            <span>
                {text}
            </span>
            <span>
                {".".repeat(count)}
            </span>
            <span
                style={{
                    opacity: 0,
                }}
            >
                {".".repeat(3 - count)}
            </span>
        </span>
    );
}
