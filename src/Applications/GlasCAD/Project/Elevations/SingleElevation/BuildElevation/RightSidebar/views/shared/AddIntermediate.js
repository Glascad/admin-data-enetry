import React, { PureComponent } from 'react';

import {
    TitleBar,
    Input,
} from '../../../../../../../../../components';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';

class AddIntermediates extends PureComponent {

    state = {
        distance: 5,
    };

    updateDistance = ({ target: { value } }) => this.setState({
        distance: +value,
    });

    add = () => {
        const {
            props: {
                ACTIONS: {
                    addIntermediates,
                },
                vertical,
            },
            state: {
                distance,
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
                />
                <Input
                    label="Distance"
                    type="number"
                    value={distance}
                    onChange={updateDistance}
                />
                {items.every(({ canAddIntermediateByVerticalAndDistance }) => canAddIntermediateByVerticalAndDistance(this.state.vertical, this.state.distance)) ? (
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
    component: withActionContext(props => <AddIntermediates {...props} vertical={true} />),
};

export const AddHorizontal = {
    title: "Add Horizontal",
    component: withActionContext(props => <AddIntermediates {...props} vertical={false} />),
};
