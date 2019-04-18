import React, { PureComponent } from 'react';

import {
    TitleBar,
    Input,
} from '../../../../../../../../../components';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';

class MoveFrame extends PureComponent {

    state = {
        distance: 5,
    };

    updateDistance = ({ target: { value } }) => this.setState({
        distance: value,
    });

    move = distance => this.props.ACTIONS.moveFrames({ distance });

    moveFalse = () => this.move(-this.state.distance);

    moveTrue = () => this.move(+this.state.distance);

    render = () => {
        const {
            state: {
                distance,
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
                    type="number"
                    value={distance}
                    onChange={updateDistance}
                />
                {items.every(({ canMoveByDistance }) => canMoveByDistance && canMoveByDistance(-this.state.distance)) ? (
                    <button
                        className="sidebar-button empty"
                        onClick={moveFalse}
                    >
                        {vertical ? 'Right' : 'Up'}
                    </button>
                ) : null}
                {items.every(({ canMoveByDistance }) => canMoveByDistance && canMoveByDistance(+this.state.distance)) ? (
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
