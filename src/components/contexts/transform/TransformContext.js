import React, { createContext, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import useInitialState from '../../hooks/use-initial-state';
import withContext from '../../higher-order/with-context';

export const TransformContext = createContext();

// this is the higher-order component that we can use to add the value from below onto props
export const withTransformContext = withContext(TransformContext, ({ context }) => ({ transform: context, context: undefined }), { pure: true });

const defaultScale = 1;
const minScale = 0.1;

function TransformProvider({
    initialState: {
        baseScale: initialBaseScale = defaultScale,
        scrollMultiplier: initialScrollMultiplier = 0.001,
        grabbing: initialGrabbing = false,
        scale: {
            x: initialScaleX = defaultScale,
            y: initialScaleY = defaultScale,
            nudgeAmount: initialScaleNudge = 0.01,
        } = {},
        translate: {
            x: initialTranslateX = 0,
            y: initialTranslateY = 0,
            nudgeAmount: initialTranslateNudge = 10,
        } = {},
    } = {},
    children,
}) {

    const outerContainerRef = useRef();
    const innerContainerRef = useRef();

    const element = outerContainerRef.current;

    const dependencies = [
        initialBaseScale,
        initialScrollMultiplier,
        initialGrabbing,
        initialScaleX,
        initialScaleY,
        initialScaleNudge,
        initialTranslateX,
        initialTranslateY,
        initialTranslateNudge,
    ];

    const [baseScale, setBaseScale] = useInitialState(initialBaseScale, dependencies);
    const [scrollMultiplier, setScrollMultiplier] = useInitialState(initialScrollMultiplier, dependencies);
    const [grabbing, setGrabbing] = useInitialState(initialGrabbing, dependencies);
    const [scaleX, setScaleX] = useInitialState(Math.max(initialScaleX, minScale), dependencies);
    const [scaleY, setScaleY] = useInitialState(Math.max(initialScaleY, minScale), dependencies);
    const [scaleNudge, setScaleNudge] = useInitialState(initialScaleNudge, dependencies);
    const [translateX, setTranslateX] = useInitialState(initialTranslateX, dependencies);
    const [translateY, setTranslateY] = useInitialState(initialTranslateY, dependencies);
    const [translateNudge, setTranslateNudge] = useInitialState(initialTranslateNudge, dependencies);

    const spaceKeyRef = useRef(false);

    const watchArrowKeys = e => {
        const { key } = e;
        if (spaceKeyRef.current) {
            if (key === "ArrowUp") {
                e.preventDefault();
                const getNewScale = scale => Math.max(+scale + scaleNudge, minScale) || minScale;
                setScaleX(getNewScale);
                setScaleY(getNewScale);

            } else if (key === "ArrowDown") {
                e.preventDefault();
                const getNewScale = scale => Math.max(+scale - scaleNudge, minScale) || minScale;
                setScaleX(getNewScale);
                setScaleY(getNewScale);
            }
        }
    };

    const watchSpaceKeyDown = ({ key }) => {
        if (key === ' ') spaceKeyRef.current = true;
    };

    const watchSpaceKeyUp = ({ key }) => {
        if (key === ' ') spaceKeyRef.current = false;
    };

    const clearKeys = () => {
        console.log("Clearing keys");
        spaceKeyRef.current = false;
    };

    const watchScroll = e => {
        e.preventDefault();
        const getNewScale = scale => Math.max(+scale - scrollMultiplier * e.deltaY * scale, minScale) || minScale;
        setScaleX(getNewScale);
        setScaleY(getNewScale);
    };

    const watchMouseDown = e => {
        if (spaceKeyRef.current || e.which === 2) {
            startPanning(e, false);
        }
    };

    const startPanning = (e, passive = true) => {
        if (element) {

            if (!passive) e.preventDefault();
            e.stopPropagation();

            const {
                touches: {
                    length: touchCount,
                    0: touch,
                } = {},
            } = e;

            if (!touchCount || touchCount <= 1) {

                const { clientX, clientY } = touch || e;

                const mouseStart = {
                    x: +clientX - +translateX,
                    y: +clientY - +translateY,
                };

                const pan = passive => e => {

                    const {
                        touches: {
                            length: touchCount,
                            0: touch,
                        } = {},
                    } = e;

                    if (!touchCount || touchCount <= 1) {

                        const { clientX, clientY } = touch || e;

                        const {
                            x: mouseStartX,
                            y: mouseStartY
                        } = mouseStart;

                        if (!passive) e.preventDefault();

                        setTranslateX(+clientX - +mouseStartX);
                        setTranslateY(+clientY - +mouseStartY);
                    } else {
                        console.log(`Too many touches: ${touchCount}`);
                    }
                };

                const passivePan = pan(true);
                const nonPassivePan = pan(false);

                const stopPanning = () => {

                    window.removeEventListener('mousemove', nonPassivePan, { capture: true });
                    window.removeEventListener('touchmove', passivePan, { capture: true, passive: true });

                    setGrabbing(false);
                    document.body.style.cursor = 'default';
                };

                setGrabbing(true);
                document.body.style.cursor = 'grabbing !important';

                setTimeout(() => {
                    window.addEventListener('mousemove', nonPassivePan, { capture: true });
                    window.addEventListener('touchmove', passivePan, { capture: true, passive: true });
                    window.addEventListener('mouseup', stopPanning, { capture: true });
                    window.addEventListener('touchend', stopPanning, { capture: true });
                    window.addEventListener('blur', stopPanning);
                    document.addEventListener('visibilitychange', stopPanning);
                });
            } else {
                console.log(`Too many touches: ${touchCount}`);
            }
        }
    };

    const updateScale = (value = minScale) => {
        const newScaleX = Math.max(+value, minScale) || minScale;
        setScaleX(newScaleX);
        const newScaleY = Math.max(+value, minScale) || minScale;
        setScaleY(newScaleY);
    };

    const updateScaleNudge = (value = minScale) => setScaleNudge(Math.max(+value, minScale) || minScale);

    const updateTranslateX = (value = 0) => setTranslateX(+value || 0);

    const updateTranslateY = (value = 0) => setTranslateY(-value || 0);

    const updateTranslateNudge = (value = 0) => setTranslateNudge(+value || 0);

    // reset zoom
    const resetScale = () => {
        setScaleX(baseScale);
        setScaleY(baseScale);
    };

    // reset pan
    const resetTranslate = () => {
        setTranslateX(0);
        setTranslateY(0);
    };

    useEffect(() => {
        if (element) {
            element.addEventListener('mousedown', watchMouseDown, { capture: true });
            element.addEventListener('touchstart', startPanning, { passive: true });
            element.addEventListener('wheel', watchScroll, { passive: false });
            window.addEventListener('keydown', watchArrowKeys);
            window.addEventListener('keydown', watchSpaceKeyDown);
            window.addEventListener('keyup', watchSpaceKeyUp);
            document.addEventListener('visibilitychange', clearKeys);
            return () => {
                element.removeEventListener('mousedown', watchMouseDown, { capture: true });
                element.removeEventListener('touchstart', startPanning, { passive: true });
                element.removeEventListener('wheel', watchScroll, { passive: false });
                element.removeEventListener('blur', clearKeys);
                window.removeEventListener('keydown', watchArrowKeys);
                window.removeEventListener('keydown', watchSpaceKeyDown);
                window.removeEventListener('keyup', watchSpaceKeyUp);
                document.removeEventListener('visibilitychange', clearKeys);
            }
        }
    }, [translateX, translateY, element]);

    const value = {
        scale: {
            x: scaleX,
            y: scaleY,
            nudgeAmount: scaleNudge,
        },
        translate: {
            x: translateX,
            y: translateY,
            nudgeAmount: translateNudge,
        },
        minScale,
        updateScale,
        updateScaleNudge,
        resetScale,
        updateTranslateX,
        updateTranslateY,
        updateTranslateNudge,
        resetTranslate,
        watchMouseDown,
        spaceKeyRef,
        grabbing,
        outerContainerRef,
        innerContainerRef,
    };

    return (
        <TransformContext.Provider
            value={value}
        >
            {children}
            {/* {grabbing ? (
                <div
                    id="cursor-grabbing-"
                    style={{
                        cursor: 'grabbing',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '100vh',
                        width: '100vw',
                        zIndex: 99999,
                    }}
                />
            ) : null} */}
        </TransformContext.Provider>
    );
}

export default withRouter(TransformProvider);