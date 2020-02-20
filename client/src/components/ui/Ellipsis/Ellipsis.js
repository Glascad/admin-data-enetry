import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Ellipsis.propTypes = {
    text: PropTypes.string,
    timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool,
    ]),
};

export default function Ellipsis({ text = '', timeout = 300, ...props }) {
    if (timeout === true) console.error('`timeout` prop in Ellipsis must be of type Number or `false`');
    const [count, setCount] = useState(3);
    const updateCount = () => setCount(count === 3 ? 0 : count + 1);
    useEffect(() => {
        if (timeout) {
            const timeoutId = setTimeout(updateCount, timeout);
            return () => clearTimeout(timeoutId);
        }
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
