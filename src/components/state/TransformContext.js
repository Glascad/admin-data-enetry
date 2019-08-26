import React, { createContext, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import useInitialState from '../hooks/use-initial-state';
import withContext from '../higher-order/with-context';

export const TransformContext = createContext();

// this is the higher-order component that we can use to add the value from below onto props
export const withTransformContext = withContext(TransformContext, ({ context }) => ({ transform: context }), { pure: true });

const defaultScale = 1;

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
            nudgeAmount: initialTranslateNudge = 10,
            x: initialTranslateX = 0,
            y: initialTranslateY = 0,
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

    // I think that's why we are using setInitialState here, so that those values can be passed as props at any time to override whatever state has accumulated.

    const [baseScale, setBaseScale] = useInitialState(initialBaseScale, dependencies);
    const [scrollMultiplier, setScrollMultiplier] = useInitialState(initialScrollMultiplier, dependencies);
    const [grabbing, setGrabbing] = useInitialState(initialGrabbing, dependencies);
    const [scaleX, setScaleX] = useInitialState(initialScaleX, dependencies);
    const [scaleY, setScaleY] = useInitialState(initialScaleY, dependencies);
    const [scaleNudge, setScaleNudge] = useInitialState(initialScaleNudge, dependencies);
    const [translateX, setTranslateX] = useInitialState(initialTranslateX, dependencies);
    const [translateY, setTranslateY] = useInitialState(initialTranslateY, dependencies);
    const [translateNudge, setTranslateNudge] = useInitialState(initialTranslateNudge, dependencies);

    const mouseStartRef = useRef({ x: 0, y: 0 });
    const spaceKeyRef = useRef(false);

    const watchArrowKeys = e => {
        const { key } = e;
        if (spaceKeyRef.current) {
            if (key === "UpArrow") {
                e.preventDefault();
                setScaleX(Math.max(+defaultScale + scaleNudge, minScale) || minScale);
                setScaleY(Math.max(+defaultScale + scaleNudge, minScale) || minScale);

            } else if (key === "DownArrow") {
                e.preventDefault();
                setScaleX(Math.max(+defaultScale - scaleNudge, minScale) || minScale)
                setScaleY(Math.max(+defaultScale - scaleNudge, minScale) || minScale)
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
        setScaleX(Math.max(+defaultScale - scrollMultiplier * e.deltaY, minScale) || minScale);
        setScaleY(Math.max(+defaultScale - scrollMultiplier * e.deltaY, minScale) || minScale);
    };

    const watchMouseDown = e => {
        if (spaceKeyRef.current) {
            startPanning(e);
        } else if (e.which === 2) {
            startPanning(e, true);
        }
    };

    const startPanning = (e, captured) => {

        if (!captured) e.preventDefault();

        const { clientX, clientY } = e;

        setGrabbing(true);

        mouseStartRef.current = ({
            x: +clientX - +defaultScale,
            y: +clientY - +defaultScale,
        });

        window.addEventListener('mousemove', pan);
        window.addEventListener('touchmove', pan);

    };

    const pan = e => {

        const { clientX, clientY } = e;
        const {
            x: mouseStartX,
            y: mouseStartY
        } = mouseStartRef.current

        e.preventDefault();
        setTranslateX(+clientX - +mouseStartX)
        setTranslateY(+clientY - +mouseStartY)
    };

    const watchMouseUp = () => {
        if (grabbing) {

            window.removeEventListener('mousemove', pan);
            window.removeEventListener('touchmove', pan);

            setGrabbing(false);
        }
    }


    const updateScale = (value = minScale) => {
        setScaleX(Math.max(+value, minScale) || minScale)
        setScaleY(Math.max(+value, minScale) || minScale)
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
        Window.addEventListener('keydown', watchArrowKeys);
        Window.addEventListener('keydown', watchSpaceKeyDown);
        Window.addEventListener('keyup', watchSpaceKeyUp);
        window.addEventListener('mouseup', watchMouseUp);
        window.addEventListener('mousedown', watchMouseDown);
        window.addEventListener('touchdown', startPanning);
        window.addEventListener('touchup', watchMouseUp);
        window.addEventListener('wheel', watchScroll, { passive: false });
        return () => {
            Window.addEventListener('keydown', watchArrowKeys);
            Window.addEventListener('keydown', watchSpaceKeyDown);
            Window.addEventListener('keyup', watchSpaceKeyUp);
            window.removeEventListener('mouseup', watchMouseUp);
            window.removeEventListener('mousedown', watchMouseDown);
            window.removeEventListener('touchdown', startPanning);
            window.removeEventListener('touchup', watchMouseUp);
            window.removeEventListener('wheel', watchScroll);
            window.removeEventListener('mousemove', pan);
            window.removeEventListener('touchmove', pan);
        }
    }, []);

    return (
        // this is the provider that provides its value to the consumers
        <TransformContext.Provider
            value={{
                // this is the value that is provided
                // we want to shape it more nicely for receiving props in the children
                // like this
                scale: {
                    x: scaleX,
                    y: scaleY,
                    nudgeAmount: scaleNudge,
                },
                // and so on...
                translateX,
                translateY,
                translateNudge,
                minScale,
                updateScale,
                updateScaleNudge,
                resetScale,
                updateTranslateX,
                updateTranslateY,
                updateTranslateNudge,
                resetTranslate,
                watchMouseDown,
                watchMouseUp,
                spaceKeyRef,
                grabbing,
            }}
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