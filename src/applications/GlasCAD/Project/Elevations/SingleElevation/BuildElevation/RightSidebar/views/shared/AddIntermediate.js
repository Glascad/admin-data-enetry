import React, { PureComponent } from 'react';

import {
    TitleBar,
    Input,
} from '../../../../../../../../../components';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';

class AddFrame extends PureComponent {

    state = {
        distance: 5,
    };

    updateDistance = ({ target: { value } }) => this.setState({
        distance: value,
    });

    add = () => {
        const {
            props: {
                ACTIONS: {
                    addFrame,
                },
                selection: {
                    items: [container],
                },
                vertical,
            },
            state: {
                distance,
            },
        } = this;

        addFrame({
            container,
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
                <button
                    className="sidebar-button action"
                    onClick={add}
                >
                    Add {vertical ? 'Vertical' : 'Horizontal'}
                </button>
            </>
        );
    }
}

export const AddVertical = {
    title: "Add Vertical",
    component: withSelectionContext(withActionContext(props => <AddFrame {...props} vertical={true} />)),
};

export const AddHorizontal = {
    title: "Add Horizontal",
    component: withSelectionContext(withActionContext(props => <AddFrame {...props} vertical={false} />)),
};
