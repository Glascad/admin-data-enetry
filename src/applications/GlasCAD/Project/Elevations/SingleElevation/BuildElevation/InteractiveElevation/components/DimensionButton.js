import React, { PureComponent } from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';
import { withContext, Input } from '../../../../../../../../components';

class DimensionButton extends PureComponent {

    state = {
        input: 0,
    };

    handleClick = () => {
        const {
            props: {
                selected,
                selectItem,
                unselectItem,
                dimension: {
                    containers,
                },
            },
        } = this;

        if (selected) containers.forEach(container => unselectItem(container))
        else containers.forEach(container => selectItem(container, true));
    }

    handleDoubleClick = () => {
        const {
            props: {
                dimension,
                selected,
                selectDimension,
            },
            handleClick,
        } = this;

        if (!selected) handleClick();
        selectDimension(dimension);
    }

    componentDidUpdate = ({ editing: oldEditing }) => {
        const {
            props: {
                editing: newEditing,
                dimension: {
                    dimension,
                },
            },
        } = this;

        if (oldEditing !== newEditing) this.setState({ input: dimension.toFixed(2).replace(/\.*0*$/, '') });
    }

    handleInput = ({ target: { value } }) => this.setState({ input: value });

    render = () => {
        const {
            state: {
                input,
            },
            props: {
                track,
                dimension: {
                    refId,
                    vertical,
                    dimension,
                    offset,
                },
                selected,
                editing,
                finishedFloorHeight,
            },
            handleClick,
            handleDoubleClick,
            handleInput,
        } = this;

        const dimensionKey = vertical ?
            'Height'
            :
            'Width';

        const offsetKey = vertical ?
            'bottom'
            :
            'left';

        const trackOffsetKey = vertical ?
            'left'
            :
            'bottom';

        // size = 24, space = 12
        const trackOffset = -36 * (track + 1) - 50;

        return (
            <button
                id={refId}
                className={`DimensionButton ${
                    vertical ?
                        'vertical'
                        :
                        'horizontal'
                    } ${
                    selected ?
                        'selected'
                        :
                        ''
                    }`}
                style={{
                    [dimensionKey.toLowerCase()]: dimension,
                    [`max${dimensionKey}`]: dimension,
                    [`min${dimensionKey}`]: dimension,
                    [offsetKey]: offset,
                    [trackOffsetKey]: trackOffset,
                    transform: vertical ?
                        undefined
                        :
                        `translateY(${finishedFloorHeight}px)`,
                }}
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
            >
                {editing ? (
                    <Input
                        type="number"
                        value={input}
                        onChange={handleInput}
                    />
                ) : (
                        <div>
                            {dimension.toFixed(2).replace(/\.*0*$/, '')}
                        </div>
                    )}
            </button>
        );
    }
}

const mapProps = ({
    dimension,
    dimension: {
        containers,
    },
    context: {
        items,
        selectItem,
        unselectItem,
        selectedDimension,
        selectDimension,
    },
}) => ({
    context: undefined,
    selected: items.some(item => containers.includes(item)),
    selectItem,
    unselectItem,
    editing: selectedDimension === dimension,
    selectDimension,
});

export default withContext(SelectionContext, mapProps, { pure: true })(DimensionButton);
