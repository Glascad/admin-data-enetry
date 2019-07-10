import React, { useRef, useEffect } from 'react';

import './ElevationPreview.scss';
import renderPreview from './render-preview';
import RecursiveElevation from '../SingleElevation/utils/recursive-elevation/elevation';
import { ErrorBoundary } from '../../../../../components';

function ElevationPreview({ preview, elevation, ...props }) {
    const ref = useRef();

    if (!preview) {
        if (elevation instanceof RecursiveElevation) preview = renderPreview(elevation);
        else preview = renderPreview(new RecursiveElevation(elevation));
    }

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

export default function ErrorBoundedElevationPreview(props) {
    return (
        <ErrorBoundary
            renderError={(error, info) => (
                <div></div>
            )}
        >
            <ElevationPreview
                {...props}
            />
        </ErrorBoundary>
    )
}