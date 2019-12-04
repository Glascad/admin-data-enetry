import React, { memo, useState } from 'react';
import { Input, Tray } from '../../../../../components';
import { Matrix } from '../../../../../utils';
import UPDATE_ITEM from '../../ducks/actions/update-item';
import { usePartialAction } from '../../ducks/hooks';
import Align from './Align';
import Nudge from './Nudge';
import Reflect from './Reflect';
import Rotate from './Rotate';

const initialState = {
    coordinate: {
        x: 0,
        y: 0,
    },
    nudge: 0,
    angle: 0,
};

export default memo(function DetailTray({
    selectItem,
    selectedItem,
    selectedItem: {
        id,
        fakeId,
        path,
        __typename,
        transform,
    } = {},
    dispatch,
}) {

    console.log(arguments[0])

    const { partialAction, dispatchPartial, cancelPartial, } = usePartialAction({ selectItem });
    const [state, setState] = useState(initialState);
    const { coordinate, nudge, angle } = state;
    const setCoordinate = (d, value) => setState(state => ({
        ...state,
        coordinate: {
            ...state.coordinate,
            [d]: +value,
        },
    }));
    const setNudge = value => setState(state => ({
        ...state,
        nudge: +value,
    }));
    const setAngle = angle => setState(state => ({
        ...state,
        angle: +angle,
    }));
    const dispatchTransform = intermediateTransform => {
        const previousTransform = new Matrix(partialAction ? partialAction.payload.transform : transform);
        // translations are independent of scale/skew
        const scaleSkewTransform = intermediateTransform.multiply(previousTransform.multiply([[1, 0, 0], [0, 1, 0], [0, 0, 0]]));
        const translateTransform = intermediateTransform.multiply(previousTransform.multiply([[0, 0, 0], [0, 0, 0], [0, 0, 1]]));
        // both transformations are then added together
        const resultingTransform = scaleSkewTransform.add(translateTransform);
        dispatch(UPDATE_ITEM, partialAction ?
            {
                ...partialAction.payload,
                update: {
                    transform: resultingTransform.toObject(),
                }
            }
            :
            {
                id,
                fakeId,
                __typename,
                path,
                update: {
                    transform: resultingTransform.toObject(),
                },
            });
    };

    return (
        <Tray>
            <div className="tray-section">
                {['x', 'y'].map(d => (
                    <Input
                        key={d}
                        data-cy={`${d}-coord`}
                        label={`${d} Coord`}
                        type="number"
                        value={coordinate[d]}
                        onChange={({ target: { value } }) => setCoordinate(d, +value)}
                    />
                ))}
            </div>
            <Nudge
                {...{
                    selectedItem,
                    nudge,
                    setNudge,
                    dispatchTransform,
                }}
            />
            <Align
                {...{
                    partialAction,
                    dispatchPartial,
                    cancelPartial,
                    selectedItem,
                    dispatchTransform,
                }}
            />
            <Reflect
                {...{
                    selectedItem,
                    dispatchTransform,
                }}
            />
            <Rotate
                {...{
                    selectedItem,
                    angle,
                    setAngle,
                    dispatchTransform,
                }}
            />
        </Tray>
    );
});
