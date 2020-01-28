import React, { useState, useLayoutEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TransformProvider, {
    withTransformContext,
    TransformContext,
} from '../../../../../../../components/contexts/transform/TransformContext';

export {
    withTransformContext,
    TransformContext,
};

export const pixelsPerInch = 4;

const defaultScale = 1; // Same as Transform Context

function ElevationTransformProvider({
    elevation: {
        rawElevation: {
            id,
        } = {},
        roughOpening: {
            width,
            height,
        } = {},
        finishedFloorHeight,
    } = {},
    children,
}) {

    const [scaleX, setScaleX] = useState(defaultScale);
    const [scaleY, setScaleY] = useState(defaultScale);
    const [translateX, setTranslateX] = useState(0);

    useLayoutEffect(() => {
        const IE = document.getElementById("InteractiveElevation");

        if (IE) {
            const { clientHeight, clientWidth } = IE;

            const ratioY = clientHeight / height / pixelsPerInch;
            const ratioX = clientWidth / width / pixelsPerInch;

            const baseScaleY = ratioY * 0.6;
            const baseScaleX = ratioX * 0.75;

            const baseScale = Math.min(baseScaleY, baseScaleX);

            const baseTranslateX = -width * 0.2;

            setScaleX(baseScale);
            setScaleY(baseScale);
            setTranslateX(baseTranslateX);
        }
    }, [id]);

    return (
        <TransformProvider
            initialState={{
                scale: {
                    x: scaleX,
                    y: scaleY,
                },
                translate: {
                    x: translateX,
                    y: -finishedFloorHeight,
                },
            }}
        >
            {children}
        </TransformProvider>
    );
}

export default withRouter(withTransformContext(ElevationTransformProvider));