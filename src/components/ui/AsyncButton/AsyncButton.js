import React from 'react';

import Ellipsis from '../Ellipsis/Ellipsis';

export default function AsyncButton({
    className = '',
    loadingText = '',
    loading = false,
    text = '',
    children = '',
    ...props
}) {
    return (
        <button
            className={className}
            {...props}
        >
            {loading ? (
                <Ellipsis
                    text={loadingText}
                />
            ) :
                children
                ||
                text
            }
        </button>
    )
}
