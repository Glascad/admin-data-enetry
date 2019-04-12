import React, { PureComponent } from 'react';
import { TitleBar, withContext } from '../../../../../../../../../components';
import { MOVE_FRAME } from '../../../ducks/actions';
import { SelectionContext } from '../../../contexts/SelectionContext';

class MoveFrame extends PureComponent {

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

    moveTrue = () => this.move(5);

    moveFalse = () => this.move(-5);

    render = () => {
        const {
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
                {items.every(({ canMoveSecond }) => canMoveSecond) ? (
                    <button
                        className="sidebar-button empty"
                        onClick={moveFalse}
                    >
                        {vertical ? 'Right' : 'Up'}
                    </button>
                ) : null}
                {items.every(({ canMoveFirst }) => canMoveFirst) ? (
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
