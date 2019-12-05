import React, { memo } from 'react';
import { Tray } from '../../../../../components';
import { Matrix } from '../../../../../utils';
import UPDATE_ITEM from '../../ducks/actions/update-item';
import Align from './Align';
import Nudge from './Nudge';
import Reflect from './Reflect';
import Rotate from './Rotate';

export default memo(function DetailTray({
    selectedItem,
    dispatch,
    partialAction,
    partialAction: {
        payload: partialPayload,
        payload: {
            transform: partialTransform,
        } = {}
    } = {},
    dispatchPartial,
}) {

    console.log(arguments[0])

    const TRANSFORM = (systemInput, {
        intermediateTransform,
        targetItem: {
            id,
            fakeId,
            __typename,
            path,
            transform,
        },
    }) => {
        const previousTransform = new Matrix(partialAction ?
            partialTransform
            :
            transform
        );
        // translations are independent of scale/skew
        const scaleSkewTransform = intermediateTransform.multiply(previousTransform.multiply([[1, 0, 0], [0, 1, 0], [0, 0, 0]]));
        const translateTransform = intermediateTransform.multiply(previousTransform.multiply([[0, 0, 0], [0, 0, 0], [0, 0, 1]]));
        // both transformations are then added together
        const resultingTransform = scaleSkewTransform.add(translateTransform);
        const update = {
            transform: resultingTransform.toObject(),
        };
        const payload = {
            ...partialAction ?
                partialPayload
                :
                {
                    id,
                    fakeId,
                    __typename,
                    path,
                    update,
                },
            update,
        };
        return UPDATE_ITEM(systemInput, payload);
    }

    const childProps = {
        selectedItem,
        dispatch,
        dispatchPartial,
        TRANSFORM,
    };

    return (
        <Tray>
            {/* <div className="tray-section">
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
            </div> */}
            <Nudge
                {...childProps}
            />
            <Align
                {...childProps}
            />
            <Reflect
                {...childProps}
            />
            <Rotate
                {...childProps}
            />
        </Tray>
    );
});
