import React, { useRef, useEffect } from 'react';

import './ElevationPreview.scss';

export default function ElevationPreview({ preview }) {
    const ref = useRef();

    useEffect(() => {
        ref.current.innerHTML = preview || '';
    }, [preview]);

    return (
        <div
            className="ElevationPreview"
            ref={ref}
        />
    );
}