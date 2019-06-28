import React, { useRef, useEffect } from 'react';

export default function ElevationTile({ preview }) {
    console.log({ preview });
    const ref = useRef();

    useEffect(() => {
        ref.current.innerHTML = preview || '';
    }, [preview]);

    return (
        <div
            className="ElevationTile"
            ref={ref}
        />
    );
}