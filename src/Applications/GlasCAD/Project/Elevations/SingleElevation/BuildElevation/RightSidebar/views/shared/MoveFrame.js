import React, { PureComponent } from 'react';

import {
    TitleBar,
    Input,
} from '../../../../../../../../../components';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';
import { ImperialValue } from '../../../../../../../../../utils';

class MoveFrame extends PureComponent {

    state = {
        distance: new ImperialValue(6),
    };

    updateDistance = distance => this.setState({ distance });

    move = distance => this.props.ACTIONS.moveFrames({ distance });

    moveFalse = () => this.move(-this.state.distance.value);

    moveTrue = () => this.move(+this.state.distance.value);

    render = () => {
        const {
            state: {
                distance: {
                    value,
                },
            },
            props: {
                selection: {
                    items,
                    items: [
                        {
                            vertical,
                        } = {},
                    ],
                },
            },
            moveTrue,
            moveFalse,
            updateDistance,
        } = this;

        return (
            <>
                <TitleBar
                    title={`Move ${
                        vertical ?
                            'Vertical'
                            :
                            'Horizontal'
                        }`}
                />
                <Input
                    label="Distance"
                    type="inches"
                    initialValue={value}
                    onChange={updateDistance}
                />
                {items.every(({ canMoveByDistance }) => canMoveByDistance && canMoveByDistance(-value)) ? (
                    <button
                        className="sidebar-button empty"
                        onClick={moveFalse}
                    >
                        {vertical ? 'Right' : 'Up'}
                    </button>
                ) : null}
                {items.every(({ canMoveByDistance }) => canMoveByDistance && canMoveByDistance(+value)) ? (
                    <button
                        className="sidebar-button empty"
                        onClick={moveTrue}
                    >
                        {vertical ? 'Left' : 'Down'}
                    </button>
                ) : null}
            </>
        );
    }
}

export default {
    title: "Move Frame",
    component: withSelectionContext(withActionContext(MoveFrame)),
};
