import React, { memo, useState } from 'react';

import {
    TitleBar,
    Input,
    useInitialState,
} from '../../../../../../../../../components';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';
import { ImperialValue } from '../../../../../../../../../utils';

function AddBay({
    selection: {
        items,
    },
    ACTIONS: {
        addBay,
    },
}) {

    const [initialDistance] = useInitialState(new ImperialValue("3'"), []);
    const [distance, setDistance] = useState(initialDistance.value);

    return (
        <>
            <TitleBar
                title="Add Bay"
            />
            <Input
                label="Distance"
                type="inches"
                autoFocus={true}
                initialValue={initialDistance}
                onChange={({ value }) => setDistance(value)}
            />
            {items.every(({ canAddBayByDirectionAndDistance }) => canAddBayByDirectionAndDistance(true, distance)) ? (
                <button
                    className="sidebar-button empty"
                    onClick={() => addBay({ first: true, distance })}
                >
                    Add Bay Left
                </button>
            ) : null}
            {items.every(({ canAddBayByDirectionAndDistance }) => canAddBayByDirectionAndDistance(false, distance)) ? (
                <button
                    className="sidebar-button empty"
                    onClick={() => addBay({ first: false, distance })}
                >
                    Add Bay Right
                </button>
            ) : null}
        </>
    );
}

export default {
    title: "Add Bay",
    component: withSelectionContext(withActionContext(memo(AddBay))),
};