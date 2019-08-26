import React, { useEffect, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { withContext, useInitialState } from '../../../../../../../components';
// here we need to import the provider, just like in App.js
import TransformProvider, /** not sure we need this --> */ { TransformContext, withTransformContext } from '../../../../../../../components/state/TransformContext';


// so here we don't need to create a new context, we simply use `withTransformContext()` to add the context to props

export const ElevationTransformContext = createContext();

export const withElevationTransformContext = withContext(ElevationTransformContext, ({ context }) => ({ transform: context }), { pure: true });

export const pixelsPerInch = 4;

const defaultScale = 1;

const minScale = 0.1;

const ElevationTransformProvider = ({
    elevation,
    elevation: {
        rawElevation: {
            id,
        } = {},
        roughOpening: initialRO,
    } = {},
    children,
    // initialState: {
    //     scale: {
    //         x: initialScaleX = defaultScale,
    //         y: initialScaleY = defaultScale,
    //     } = {},
    //     translate: {
    //         x: initialTranslateX = 0,
    //         y: initialTranslateY = 0,
    //     } = {},
    // } = {},
}) => {

    // here we have to use state for the initial values, that we can send as props (only when the elevation on props changes), so that the provider will use it as the initial state

    // It takes some getting used to. It didn't make much sense to me at first, but useEffect runs whenever it's dependencies change

    useEffect(() => {
        // set initial zoom

        // vvv only when the id changes (from navigating to a new elevation)
    }, [id]);

    // any other questions? sweet.
    // see you this afternoon haha
    // i'll push this so you can pull my notes


    // const [scaleX, setScaleX] = useInitialState(initialScaleX, dependencies);
    // const [scaleY, setScaleY] = useInitialState(initialScaleY, dependencies);
    // const [translateX, setTranslateX] = useInitialState(initialTranslateX, dependencies);
    // const [translateY, setTranslateY] = useInitialState(initialTranslateY, dependencies);

    // console.log(zoom);


    // const setZoom = (x, y) => {
    //     const IE = document.getElementById("InteractiveElevation");

    //     if (IE) {

    //         const ratioY = IE.clientHeight / y / pixelsPerInch;
    //         const ratioX = IE.clientWidth / x / pixelsPerInch;

    //         const baseScaleY = ratioY * 0.6;
    //         const baseScaleX = ratioX * 0.75;

    //         const baseScale = Math.min(baseScaleY, baseScaleX);

    //         const baseTranslateX = -x * 0.2;

    //         this.setState(({ scale, translate }) => ({
    //             baseScale,
    //             scale: {
    //                 ...scale,
    //                 x: baseScale,
    //                 y: baseScale,
    //             },
    //             translate: {
    //                 ...translate,
    //                 x: baseTranslateX,
    //             },
    //         }));
    //     }
    // }

    // useEffect(() => {

    // })

    // state = {
    //     baseScale: defaultScale,
    //     scrollMultiplier: 0.0007,
    //     scale: {
    //         x: defaultScale,
    //         y: defaultScale,
    //         nudgeAmount: 0.01,
    //     },
    //     translate: {
    //         nudgeAmount: 10,
    //         x: 0,
    //         y: 0,
    //     },
    //     grabbing: false,
    // };

    // componentDidUpdate = ({

    // }) => {
    //     const {
    //         props: {
    //             elevation: {
    //                 rawElevation: {
    //                     id: newId,
    //                 } = {},
    //                 roughOpening: newRO,
    //                 roughOpening: {
    //                     x,
    //                     y,
    //                 } = {},
    //             } = {},
    //             location: {
    //                 search,
    //             },
    //         },
    //     } = this;

    //     if (
    //         (
    //             oldId !== newId
    //         ) || (
    //             (
    //                 typeof x === 'number'
    //             ) && (
    //                 typeof y === 'number'
    //             ) && (
    //                 !oldX
    //                 ||
    //                 !oldY
    //                 ||
    //                 typeof oldX !== 'number'
    //                 ||
    //                 typeof oldY !== 'number'
    //             )
    //         )
    //     ) {

    //         this.setZoom(x, y)

    //         setTimeout(() => {
    //             this.setZoom(x, y)
    //         })
    //     }
    // }

    return (
        <TransformProvider
            // children can be passed between the tags
            // children={children}
        >
            {children}
        </TransformProvider>
    );
}

// add it down here, like this
export default withRouter(withTransformContext(ElevationTransformProvider));