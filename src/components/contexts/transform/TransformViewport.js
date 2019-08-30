import { useContext, useState, useEffect, useRef } from 'react';
import { StaticContext } from "../../../Applications/Statics/Statics";

export default function TransformViewPort({
    transformationRef,
}) {
    const staticContext = useContext(StaticContext);

    useEffect(() => {
        const resizeViewport = () => {
            setTimeout(() => {
                try {
                    staticContext.Viewport.current.style.paddingBottom = "0";
                    staticContext.Viewport.current.style.marginBottom = "0";
                    staticContext.Viewport.current.style.overflowY = "hidden";
                    staticContext.Viewport.current.style.overflowX = "hidden";
                    transformationRef.current.style.height = `${
                        window.innerHeight
                        -
                        transformationRef.current.offsetTop
                        -
                        48}px`;
                } catch (err) {
                    console.error(err);
                }
            });
        }

        var previousViewportStyles;

        setTimeout(() => {
            try {
                previousViewportStyles = {
                    paddingBottom: staticContext.Viewport.current.style.paddingBottom,
                    marginBottom: staticContext.Viewport.current.style.marginBottom,
                    overflowY: staticContext.Viewport.current.style.overflowY,
                    overflowX: staticContext.Viewport.current.style.overflowX,
                };
            } catch (err) {
                console.error(err);
            }
        });

        resizeViewport();

        window.addEventListener('resize', resizeViewport);


        return () => {
            setTimeout(() => {
                try {
                    const {
                        paddingBottom,
                        marginBottom,
                        overflowY,
                    } = previousViewportStyles;

                    staticContext.Viewport.current.style.paddingBottom = paddingBottom;
                    staticContext.Viewport.current.style.marginBottom = marginBottom;
                    staticContext.Viewport.current.style.overflowY = overflowY;
                } catch (err) {
                    console.error(err);
                }
                window.removeEventListener('resize', resizeViewport);
            })
        };
    }, []);

}