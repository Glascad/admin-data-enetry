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
    cancelPartial,
    systemMap,
    selectedConfigurationPaths,
}) {

    // console.log(arguments[0]);

    const TRANSFORM = (systemInput, {
        appliedTransform,
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
        const update = {
            transform: previousTransform.applyTransformation(appliedTransform).toObject(),
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
        cancelPartial,
        TRANSFORM,
        systemMap,
        selectedConfigurationPaths,
    };

    return (
        <Tray>
            <Nudge {...childProps} />
            <Align {...childProps} />
            <Reflect {...childProps} />
            <Rotate {...childProps} />
        </Tray>
    );
});
