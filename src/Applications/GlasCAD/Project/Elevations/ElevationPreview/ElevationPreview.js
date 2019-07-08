import React, { useRef, useEffect } from 'react';

import './ElevationPreview.scss';

export default function ElevationPreview({ preview, ...props }) {
    const ref = useRef();

    useEffect(() => {
        ref.current.innerHTML = preview || '';
    }, [preview]);

    return (
        <div
            {...props}
            className="ElevationPreview"
            ref={ref}
        />
    );
}