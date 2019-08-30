import React from 'react';
import { withTransformContext } from './TransformContext';

function TransformBox({
    transform: {
        translate: {
            x,
            y,
        },
        scale: {
            x: scaleX,
            y: scaleY,
        },
    },
    style,
    selectedClass,
    children,
    ...props
}) {
    return (
        <div
            {...props}
            style={{
                ...style,
                transform: `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`,
            }}
            onMouseDown={e => e.stopPropagation()}
        >
            {children}
        </div>
    );
}

export default withTransformContext(TransformBox);
