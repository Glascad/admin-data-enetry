import React, { useRef, useEffect } from 'react';
import { withTransformContext } from './TransformContext';
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
        innerContainerRef,
        outerContainerRef,
    },
    children,
    outerStyle,
    innerStyle,
    viewportRef,
    className = '',
    overtakeViewport = true,
    ...props
}) {

    useEffect(() => {
        if (overtakeViewport) {
            var previousViewportStyles;

            setTimeout(() => {
                try {
                    previousViewportStyles = {
                        paddingBottom: viewportRef.current.style.paddingBottom,
                        marginBottom: viewportRef.current.style.marginBottom,
                        overflowY: viewportRef.current.style.overflowY,
                        overflowX: viewportRef.current.style.overflowX,
                    };
                } catch (err) {
                    console.error(err);
                }
            });

            const resizeViewport = () => setTimeout(() => {
                try {
                    viewportRef.current.style.paddingBottom = "0";
                    viewportRef.current.style.marginBottom = "0";
                    viewportRef.current.style.overflowY = "hidden";
                    viewportRef.current.style.overflowX = "hidden";
                    outerContainerRef.current.style.height = `${
                        window.innerHeight
                        -
                        outerContainerRef.current.offsetTop
                        -
                        48}px`;
                } catch (err) {
                    console.error(err);
                }
            });

            resizeViewport();

            window.addEventListener('resize', resizeViewport);

            return () => setTimeout(() => {
                try {
                    const {
                        paddingBottom,
                        marginBottom,
                        overflowY,
                    } = previousViewportStyles;

                    viewportRef.current.style.paddingBottom = paddingBottom;
                    viewportRef.current.style.marginBottom = marginBottom;
                    viewportRef.current.style.overflowY = overflowY;
                } catch (err) {
                    console.error(err);
                }
                window.removeEventListener('resize', resizeViewport);
            });
        };
    }, []);

    return (
        <div
            {...props}
            ref={outerContainerRef}
            style={outerStyle}
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
                ref={innerContainerRef}
                style={{
                    ...innerStyle,
                    transform: `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`,
                }}
                className={`inner-transform-box`}
                onMouseDown={e => e.stopPropagation()}
            >
                {children}
            </div>
            {["top", "bottom", "left", "right"].map(direction => (
                <div key={direction} className={`fade ${direction}-fade`} />
            ))}
        </div>
    );
}

export default withTransformContext(TransformBox);
