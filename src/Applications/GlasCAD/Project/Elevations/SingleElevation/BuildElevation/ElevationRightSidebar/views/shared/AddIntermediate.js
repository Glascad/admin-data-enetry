import React, { PureComponent } from 'react';

import {
    TitleBar,
    Input,
} from '../../../../../../../../../components';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';
import { ImperialValue } from '../../../../../../../../../utils';

class AddIntermediates extends PureComponent {

    state = {
        distance: new ImperialValue(6),
    };

    updateDistance = distance => this.setState({ distance });

    add = () => {
        const {
            props: {
                ACTIONS: {
                    addIntermediates,
                },
                vertical,
            },
            state: {
                distance: {
                    value: distance,
                },
            },
        } = this;

        addIntermediates({
            vertical,
            distance,
        });
    }

    render = () => {
        const {
            state: {
                distance,
                distance: {
                    value,
                },
            },
            props: {
                selection: {
                    items,
                },
                vertical,
            },
            updateDistance,
            add,
        } = this;

        return (
            <>
                <TitleBar
                    title={`Add ${
                        vertical ?
                            'Vertical'
                            :
                            'Horizontal'
                        }`}
                    data-cy={`add-${
                        vertical ?
                            'vertical'
                            :
                            'horizontal'
                        }`}
                />
                <Input
                    label="Distance"
                    type="inches"
                    autoFocus={true}
                    initialValue={distance}
                    onChange={updateDistance}
                    onEnter={add}
                />
                {items.every(({ canAddIntermediateByVerticalAndDistance }) => canAddIntermediateByVerticalAndDistance(vertical, value)) ? (
                    <button
                        className="sidebar-button action"
                        onClick={add}
                    >
                        Add {vertical ? 'Vertical' : 'Horizontal'}
                    </button>
                ) : null}
            </>
        );
    }
}

export const AddVertical = {
    title: "Add Vertical",
    component: withSelectionContext(withActionContext(props => <AddIntermediates {...props} vertical={true} />)),
};

export const AddHorizontal = {
    title: "Add Horizontal",
    component: withSelectionContext(withActionContext(props => <AddIntermediates {...props} vertical={false} />)),
};
