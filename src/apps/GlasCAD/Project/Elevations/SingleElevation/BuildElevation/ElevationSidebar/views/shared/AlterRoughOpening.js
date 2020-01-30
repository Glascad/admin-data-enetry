import React, { memo, useState } from 'react';

import { withSelectionContext } from '../../../contexts/SelectionContext';

import {
    TitleBar, Input, useInitialState,
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

    const [initialValue] = useInitialState(new ImperialValue(18), []);
    const [distance, setDistance] = useState(initialValue.value);

    const title = first ? "Raise Curb" : "Step Head";
    const dataCy = first ? "raise-curb" : "step-head";

    const allContainers = firstItem instanceof RecursiveContainer ?
        items
        :
        unique(items.reduce((containers, _frame) => containers.concat(_frame.getContainersByDirection(!first)), []));

    // console.log(allContainers);

    return (
        <>
            <TitleBar
                title={title}
            />
            <Input
                label="Distance"
                type="inches"
                data-cy="distance"
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
                    (distance.value ? distance.value : distance) - (
                        container.getFrameByDirection(true, first).sightline
                        ||
                        0
                    )
                ) || (
                    distance.value === container.getMaxRoughOpeningDistanceByDirection(first)
                )
            )) ? (
                    <button
                        data-cy={dataCy}
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
    dataCy: "raise-curb",
    component: withSelectionContext(withActionContext(memo(props => <AlterRoughOpening {...props} first={true} />))),
};

export const StepHead = {
    title: "Step Head",
    dataCy: "step-head",
    component: withSelectionContext(withActionContext(memo(props => <AlterRoughOpening {...props} first={false} />))),
};
