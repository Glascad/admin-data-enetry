import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Ellipsis.propTypes = {
    text: PropTypes.string,
    timeout: PropTypes.number,
};

export default function Ellipsis({ text = '', timeout = 300, ...props }) {
    const [count, setCount] = useState(1);
    const updateCount = () => setCount(count === 3 ? 0 : count + 1);
    useEffect(() => {
        const timeoutId = setTimeout(updateCount, timeout);
        return () => clearTimeout(timeoutId);
    }, [count]);
    return (
        <span
            className="Ellipsis"
            // VVV is this spread necessary?
            // {...props}
        >
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
