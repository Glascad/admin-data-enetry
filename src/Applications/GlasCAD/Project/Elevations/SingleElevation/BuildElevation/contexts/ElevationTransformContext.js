import React, { useEffect, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { withContext, useInitialState } from '../../../../../../../components';
// here we need to import the provider, just like in App.js
import TransformProvider, { withTransformContext } from '../../../../../../../components/state/TransformContext';

// so here we don't need to create a new context, we simply use `withTransformContext()` to add the context to props

export const pixelsPerInch = 4;

const defaultScale = 1; //import

const ElevationTransformProvider = ({
    elevation,
    elevation: {
        rawElevation: {
            id,
        } = {},
    } = {},
    children,
    initialState: {
        scale: {
            x: initialScaleX = defaultScale,
            y: initialScaleY = defaultScale,
        } = {},
        translate: {
            x: initialTranslateX = 0,
            y: initialTranslateY = 0,
        } = {},
    } = {},
}) => {
    const dependencies = [
        initialScaleX,
        initialScaleY,
        initialTranslateX,
        initialScaleY
    ];

    const [scaleX, setScaleX] = useInitialState(initialScaleX, dependencies);
    const [scaleY, setScaleY] = useInitialState(initialScaleY, dependencies);
    const [translateX, setTranslateX] = useInitialState(initialTranslateX, dependencies);
    const [translateY, setTranslateY] = useInitialState(initialTranslateY, dependencies); //do we need this?

    useEffect(() => {
        setZoom(scaleX, scaleY)
    }, [id]);

    const setZoom = (x, y) => {
        const IE = document.getElementById("InteractiveElevation");

        if (IE) {

            const ratioY = IE.clientHeight / y / pixelsPerInch;
            const ratioX = IE.clientWidth / x / pixelsPerInch;

            const baseScaleY = ratioY * 0.6;
            const baseScaleX = ratioX * 0.75;

            const baseScale = Math.min(baseScaleY, baseScaleX);

            const baseTranslateX = -x * 0.2;

            setScaleX(baseScale);
            setScaleY(baseScale);
            setTranslateX(baseTranslateX)
        };
    }


    return (
        <TransformProvider
            initialState={{
                scale: {
                    x: scaleX,
                    y: scaleY,
                },
                translate: {
                    x: translateX,
                    y: translateY,
                },
            }}
        >
            {children}
        </TransformProvider>
    );
}

export default withRouter(withTransformContext(ElevationTransformProvider));