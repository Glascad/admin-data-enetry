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
        const IE = document.getElementById("InteractiveElevation");
    
        console.log({ IE, scaleX, scaleY });
    
        if (IE) {
    
            const ratioY = IE.clientHeight / scaleY / pixelsPerInch;
            const ratioX = IE.clientWidth / scaleX / pixelsPerInch;
    
            const baseScaleY = ratioY * 0.6;
            const baseScaleX = ratioX * 0.75;
    
            const baseScale = Math.min(baseScaleY, baseScaleX);
    
            const baseTranslateX = -scaleX * 0.2;
    
            console.log({
                ratioY,
                ratioX,
                baseScaleX,
                baseScaleY,
                baseScale,
                baseTranslateX,
            });
    
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
                    y: translateY,
                },
            }}
        >
            {children}
        </TransformProvider>
    );
}

export default withRouter(withTransformContext(ElevationTransformProvider));