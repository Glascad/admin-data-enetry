import React, { PureComponent } from 'react';

import {
    TitleBar,
    Input,
} from '../../../../../../../../../components';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';
import { ImperialValue } from '../../../../../../../../../utils';

class AddBay extends PureComponent {

    state = {
        distance: new ImperialValue(6),
    };

    updateDistance = distance => this.setState({ distance });

    addTheBay = (first, distance) => this.props.ACTIONS.addBay({ first, distance });

    addFirst = () => this.addTheBay(true, this.state.distance.value);
    addSecond = () => this.addTheBay(false, this.state.distance.value);

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
            },
            updateDistance,
            add,
        } = this;

        return (
            <>
                <TitleBar
                    title="Add Bay"
                />
                <Input
                    label="Distance"
                    type="inches"
                    autoFocus={true}
                    initialValue={distance}
                    onChange={updateDistance}
                />
                {items.every(({ canAddBayByDirectionAndDistance }) => canAddBayByDirectionAndDistance(true, value)) ? (
                    <button
                        className="sidebar-button empty"
                        onClick={this.addFirst}
                    >
                        {'Add Bay Left'}
                    </button>
                ) : null} 
                {items.every(({ canAddBayByDirectionAndDistance }) => canAddBayByDirectionAndDistance(false, value)) ? (
                    <button
                        className="sidebar-button empty"
                        onClick={this.addSecond}
                    >
                        {'Add Bay Right'}
                    </button>
                ) : null}
            </>
        );
    }
}

export default {
    title: "Add Bay",
    component: withSelectionContext(withActionContext(AddBay)),
};