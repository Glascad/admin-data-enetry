import React, { useEffect, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { withContext, useInitialState } from '../../../../../../../components';
import TransformProvider, {
    withTransformContext,
    TransformContext,
} from '../../../../../../../components/state/TransformContext';

export {
    withTransformContext,
    TransformContext,
};
    
export const pixelsPerInch = 4;

const defaultScale = 1; //Same as Transform Context

const ElevationTransformProvider = ({
    elevation: {
        rawElevation: {
            id,
        } = {},
        roughOpening:{
            x: rox,
            y: roy,
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
        } = {},
    } = {},
}) => {
    const dependencies = [
        initialScaleX,
        initialScaleY,
        initialTranslateX,
    ];

    const [scaleX, setScaleX] = useInitialState(initialScaleX, dependencies);
    const [scaleY, setScaleY] = useInitialState(initialScaleY, dependencies);
    const [translateX, setTranslateX] = useInitialState(initialTranslateX, dependencies);

    useEffect(() => {
        const IE = document.getElementById("InteractiveElevation");
    
        if (IE) {
    
            const ratioY = IE.clientHeight / roy / pixelsPerInch;
            const ratioX = IE.clientWidth / rox / pixelsPerInch;
    
            const baseScaleY = ratioY * 0.6;
            const baseScaleX = ratioX * 0.75;
    
            const baseScale = Math.min(baseScaleY, baseScaleX);
    
            const baseTranslateX = -rox * 0.2;
    
            setScaleX(baseScale);
            setScaleY(baseScale);
            setTranslateX(baseTranslateX)
        };
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
                },
            }}
        >
            {children}
        </TransformProvider>
    );
}

export default withRouter(withTransformContext(ElevationTransformProvider));