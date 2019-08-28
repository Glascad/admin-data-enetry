import React, { createContext, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import useInitialState from '../hooks/use-initial-state';
import withContext from '../higher-order/with-context';

export const TransformContext = createContext();

// this is the higher-order component that we can use to add the value from below onto props
export const withTransformContext = withContext(TransformContext, ({ context }) => ({ transform: context }), { pure: true });

export const defaultScale = 1;
const minScale = 0.1;

const TransformProvider = ({
    initialState: {
        baseScale: initialBaseScale = defaultScale,
        scrollMultiplier: initialScrollMultiplier = 0.0007,
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
}) => {

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
    const [scaleX, setScaleX] = useInitialState(initialScaleX, dependencies);
    const [scaleY, setScaleY] = useInitialState(initialScaleY, dependencies);
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
                setScaleX(scaleX => Math.max(+scaleX + scaleNudge, minScale) || minScale);
                setScaleY(scaleY => Math.max(+scaleY + scaleNudge, minScale) || minScale);

            } else if (key === "ArrowDown") {
                e.preventDefault();
                setScaleX(scaleX => Math.max(+scaleX - scaleNudge, minScale) || minScale)
                setScaleY(scaleY => Math.max(+scaleY - scaleNudge, minScale) || minScale)
            }
        }
    };

    const watchSpaceKeyDown = ({ key }) => {
        if (key === ' ' && !spaceKeyRef.current) spaceKeyRef.current = true;
    };

    const watchSpaceKeyUp = ({ key }) => {
        if (key === ' ') spaceKeyRef.current = false;
    };

    const watchScroll = e => {
        e.preventDefault();
        setScaleX(scaleX => Math.max(+scaleX - scrollMultiplier * e.deltaY, minScale) || minScale);
        setScaleY(scaleY => Math.max(+scaleY - scrollMultiplier * e.deltaY, minScale) || minScale);
    };

    const watchMouseDown = e => {
        if (spaceKeyRef.current || e.which === 2) {
            startPanning(e);
        }
    };

    const startPanning = e => {

        e.preventDefault();
        e.stopPropagation();

        const { clientX, clientY } = e;

        const mouseStart = {
            x: +clientX - +translateX,
            y: +clientY - +translateY,
        };

        const pan = e => {

            const { clientX, clientY } = e;
            const {
                x: mouseStartX,
                y: mouseStartY
            } = mouseStart;

            e.preventDefault();
            setTranslateX(+clientX - +mouseStartX)
            setTranslateY(+clientY - +mouseStartY)
        };

        const stopPanning = () => {

            window.removeEventListener('mousemove', pan, true);
            window.removeEventListener('touchmove', pan, true);

            setGrabbing(false);
        }

        setGrabbing(true);

        setTimeout(() => {
            window.addEventListener('mousemove', pan, true);
            window.addEventListener('touchmove', pan, true);
            window.addEventListener('mouseup', stopPanning, true);
            window.addEventListener('touchend', stopPanning, true);
        });
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
        window.addEventListener('keydown', watchArrowKeys);
        window.addEventListener('keydown', watchSpaceKeyDown);
        window.addEventListener('keyup', watchSpaceKeyUp);
        window.addEventListener('mousedown', watchMouseDown, true);
        window.addEventListener('touchstart', startPanning);
        window.addEventListener('wheel', watchScroll, { passive: false });
        return () => {
            window.removeEventListener('keydown', watchArrowKeys);
            window.removeEventListener('keydown', watchSpaceKeyDown);
            window.removeEventListener('keyup', watchSpaceKeyUp);
            window.removeEventListener('mousedown', watchMouseDown, true);
            window.removeEventListener('touchstart', startPanning);
            window.removeEventListener('wheel', watchScroll, { passive: false });
        }
    }, [translateX, translateY]);

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
    };

    // console.log(value);

    return (
        <TransformContext.Provider
            value={value}
        >
            {children}
            {grabbing ? (
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
            ) : null}
        </TransformContext.Provider>
    );
}

export default withRouter(TransformProvider);