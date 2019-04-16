import React, { PureComponent } from 'react';
import { TitleBar, withContext, Input } from '../../../../../../../../../components';
import { MOVE_FRAME } from '../../../ducks/actions';
import { SelectionContext } from '../../../contexts/SelectionContext';

class MoveFrame extends PureComponent {

    state = {
        distance: 5,
    };

    move = distance => {
        const {
            props: {
                context: {
                    itemsByRefId,
                },
                updateElevation,
            },
        } = this;

        const allRefIds = Object.keys(itemsByRefId);

        const moveFrameByRefId = refId => {
            // MUST ACCESS NEW ELEVATION OFF OF PROPS INSIDE TIMEOUT
            const {
                props: {
                    elevation: {
                        getItemByRefId,
                    },
                },
            } = this;

            const nextRefId = allRefIds[allRefIds.indexOf(refId) + 1];

            const _frame = getItemByRefId(refId);

            if (_frame) {
                // timeout allows rerendering between each deletion
                updateElevation(MOVE_FRAME, { _frame, distance }, () => setTimeout(() => moveFrameByRefId(nextRefId)));
            }
        }

        moveFrameByRefId(allRefIds[0]);
    }

    updateDistance = ({ target: { value } }) => this.setState({
        distance: value,
    });

    moveFalse = () => this.move(-this.state.distance);

    moveTrue = () => this.move(+this.state.distance);

    render = () => {
        const {
            state: {
                distance,
            },
            props: {
                context: {
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
                {items.every(({ canMoveByDistance }) => canMoveByDistance(-this.state.distance)) ? (
                    <button
                        className="sidebar-button empty"
                        onClick={moveFalse}
                    >
                        {vertical ? 'Right' : 'Up'}
                    </button>
                ) : null}
                {items.every(({ canMoveByDistance }) => canMoveByDistance(+this.state.distance)) ? (
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
    component: withContext(SelectionContext, undefined, { pure: true })(MoveFrame),
};
