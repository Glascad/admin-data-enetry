import React, { memo, useState } from 'react';

import { withSelectionContext } from '../../../contexts/SelectionContext';

import {
    TitleBar, Input,
} from '../../../../../../../../../components';

import { withActionContext } from '../../../contexts/ActionContext';
import { ImperialValue, unique } from '../../../../../../../../../utils';
import RecursiveContainer from '../../../../utils/recursive-elevation/container';

function AlterRoughOpening({
    first,
    selection: {
        items,
        items: [firstItem],
        length,
    },
    ACTIONS: {
        alterRoughOpening,
        deleteContainers,
    },
}) {

    const initialValue = new ImperialValue(12);
    const [distance, setDistance] = useState(initialValue);

    const title = first ? "Raise Curb" : "Step Head";

    const allContainers = firstItem instanceof RecursiveContainer ?
        items
        :
        unique(items.reduce((containers, _frame) => containers.concat(_frame.getContainersByDirection(!first)), []));

    return (
        <>
            <TitleBar
                title={title}
            />
            <Input
                label="Distance"
                type="inches"
                initialValue={initialValue}
                onChange={setDistance}
                onEnter={() => alterRoughOpening({
                    distance: distance.value,
                    first,
                })}
            />
            {allContainers.every(container => (
                container.canAddIntermediateByVerticalAndDistance(
                    false,
                    distance.value - (
                        container.getFrameByDirection(true, first).sightline
                        ||
                        0
                    )
                ) || (
                    distance.value === container.getMaxRoughOpeningDistanceByDirection(first)
                )
            )) ? (
                    <button
                        className="sidebar-button empty"
                        onClick={() => alterRoughOpening({
                            distance: distance.value,
                            first,
                        })}
                    >
                        {title}
                    </button>
                ) : null}
            {allContainers.every(({ canDelete }) => canDelete) ? (
                <button
                    className="sidebar-button danger"
                    onClick={deleteContainers}
                >
                    Delete Lite{length > 1 ? 's' : ''}
                </button>
            ) : null}
        </>
    );
}

export const RaiseCurb = {
    title: "Raise Curb",
    component: withSelectionContext(withActionContext(memo(props => <AlterRoughOpening {...props} first={true} />))),
};

export const StepHead = {
    title: "Step Head",
    component: withSelectionContext(withActionContext(memo(props => <AlterRoughOpening {...props} first={false} />))),
};
