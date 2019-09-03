import { useEffect } from 'react';

export default function useTransformBox(transformBoxRef, viewportRef) {
    useEffect(() => {
        const resizeViewport = () => {
            setTimeout(() => {
                try {
                    viewportRef.current.style.paddingBottom = "0";
                    viewportRef.current.style.marginBottom = "0";
                    viewportRef.current.style.overflowY = "hidden";
                    viewportRef.current.style.overflowX = "hidden";
                    transformBoxRef.current.style.height = `${
                        window.innerHeight
                        -
                        transformBoxRef.current.offsetTop
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
                    paddingBottom: viewportRef.current.style.paddingBottom,
                    marginBottom: viewportRef.current.style.marginBottom,
                    overflowY: viewportRef.current.style.overflowY,
                    overflowX: viewportRef.current.style.overflowX,
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

                    viewportRef.current.style.paddingBottom = paddingBottom;
                    viewportRef.current.style.marginBottom = marginBottom;
                    viewportRef.current.style.overflowY = overflowY;
                } catch (err) {
                    console.error(err);
                }
                window.removeEventListener('resize', resizeViewport);
            })
        };
    }, []);
}