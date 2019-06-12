import React, { PureComponent } from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';
import { withContext, Input } from '../../../../../../../../components';
import { unique } from '../../../../../../../../utils';
import { MOVE_FRAME } from '../../ducks/actions';
import { withActionContext } from '../../contexts/ActionContext';

class DimensionButton extends PureComponent {

    state = {
        newDimension: 0,
    };

    mostRecentClick = 0;

    handleClick = () => {
        const {
            props: {
                selected,
                selectItem,
                unselectItem,
                dimension,
                dimension: {
                    containers,
                },
                selectDimension,
            },
            mostRecentClick,
        } = this;

        const currentMilliseconds = Date.now();

        // double click (toggle editing state)
        if (currentMilliseconds - mostRecentClick < 500) selectDimension(dimension);
        // single click (unselect)
        else if (selected) containers.forEach(container => unselectItem(container))
        // single click (select)
        else containers.forEach(container => selectItem(container, true));

        this.mostRecentClick = currentMilliseconds;
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

        if (oldEditing !== newEditing) this.setState({ newDimension: dimension.toFixed(2).replace(/\.*0*$/, '') });
    }

    handleFocus = ({ target }) => setTimeout(() => target.select());

    handleInput = ({ target: { value } }) => this.setState({ newDimension: value });

    handleKeyDown = e => {
        const {
            key,
            target,
        } = e;
        if (key === 'Enter') {
            target.blur();
        }
        else if (key !== 'Escape') {
            if (key === ' ') e.preventDefault();
            e.stopPropagation();
        }
    }

    handleBlur = () => {
        const {
            state: {
                newDimension,
            },
            props: {
                ACTIONS: {
                    updateDimension,
                },
            },
        } = this;

        updateDimension({ newDimension });
    }

    render = () => {
        const {
            state: {
                newDimension,
            },
            props: {
                track,
                dimension: {
                    refId,
                    vertical,
                    dimension,
                    offset,
                    registerReactComponent,
                },
                selected,
                editing,
                finishedFloorHeight,
            },
            handleClick,
            handleFocus,
            handleInput,
            handleKeyDown,
            handleBlur,
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

        registerReactComponent(this);

        const style = {
            [dimensionKey.toLowerCase()]: dimension,
            [`max${dimensionKey}`]: dimension,
            [`min${dimensionKey}`]: dimension,
            [offsetKey]: offset,
            [trackOffsetKey]: trackOffset,
            transform: vertical ?
                undefined
                :
                `translateY(${finishedFloorHeight}px)`,
        };

        // console.log(this);
        // console.log({ dimension });

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
                style={style}
                onClick={handleClick}
            >
                {editing ? (
                    <Input
                        type="number"
                        value={newDimension}
                        onFocus={handleFocus}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        autoFocus={true}
                        style={vertical ?
                            Object.entries(style)
                                .reduce((reducedStyle, [key, value]) => ({
                                    ...reducedStyle,
                                    [key.match(/height/i) ?
                                        key.replace(/height/, 'width')
                                            .replace(/Height/, 'Width')
                                        :
                                        key.match(/bottom/) ?
                                            key.replace(/bottom/, 'left')
                                            :
                                            key.replace(/left/, 'bottom')]: value,
                                }), {})
                            :
                            {
                                ...style,
                                transform: 'none',
                            }
                        }
                    />
                ) : (
                        <div>
                            {Number(dimension).toFixed(2).replace(/\.*0*$/, '')}
                        </div>
                    )}
            </button>
        );
    }
}

const mapSelectionProps = ({
    dimension,
    dimension: {
        containers,
    },
    context: {
        items,
        selectItem,
        unselectItem,
        dimension: selectedDimension,
        selectDimension,
    },
}) => ({
    context: undefined,
    selected: items.some(item => containers.includes(item)),
    selectItem,
    unselectItem,
    editing: selectedDimension === dimension,
    selectDimension,
    selectedDimension,
});

export default withContext(SelectionContext, mapSelectionProps, { pure: true })(withActionContext(DimensionButton));
