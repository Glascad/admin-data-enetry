import React, { useRef } from 'react';
import { withTransformContext } from './TransformContext';
import useTransformBox from './use-viewport-transform-hook';
import './TransformBox.scss';

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
        spaceKey,
    },
    children,
    outerTransformRef,
    innerTransformRef,
    outerStyle,
    innerStyle,
    viewportRef,
    className = '',
    ...props
}) {
    const outerContainer = useRef(outerTransformRef);
    const innerContainer = useRef(innerTransformRef);

    useTransformBox(outerContainer, viewportRef);

    return (
        <div
            {...props}
            style={outerStyle}
            ref={outerContainer}
            className={`TransformBox ${
                className
                } ${
                spaceKey ?
                    'spacebar-pressed'
                    :
                    ''
                }`}
        >
            <div
                ref={innerContainer}
                style={{
                    ...innerStyle,
                    transform: `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`,
                }}
                className={`inner-transform-box`}
                onMouseDown={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default withTransformContext(TransformBox);
