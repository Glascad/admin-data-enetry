import React from 'react';

export default function ElevationPreview({
    elevation,
}) {
    return (
        <div>
            {JSON.stringify(elevation)}
        </div>
    );
}
