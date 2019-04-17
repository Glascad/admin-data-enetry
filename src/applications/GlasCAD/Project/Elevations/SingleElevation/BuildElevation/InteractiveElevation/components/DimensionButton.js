import React, { PureComponent } from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';
import { withContext, Input } from '../../../../../../../../components';
import { unique } from '../../../../../../../../utils';
import { MOVE_FRAME } from '../../ducks/actions';

class DimensionButton extends PureComponent {

    state = {
        input: 0,
    };

    mostRecentClick = 0;

    handleClick = () => {
        const {
            props: {
                editing,
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

        if (oldEditing !== newEditing) this.setState({ input: dimension.toFixed(2).replace(/\.*0*$/, '') });
    }

    handleInput = ({ target: { value } }) => this.setState({ input: value });

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
                input,
            },
            props: {
                dimension: {
                    vertical,
                    dimension,
                    containers,
                },
                updateElevation,
            },
        } = this;


        const firstDetailRefIds = unique(...containers
            .map(({ getDetailsByDirection }) => getDetailsByDirection(vertical, true)))
            .map(({ refId }) => refId);

        const secondDetailRefIds = unique(...containers
            .map(({ getDetailsByDirection }) => getDetailsByDirection(vertical, false)))
            .map(({ refId }) => refId);

        console.log({ firstDetailRefIds, secondDetailRefIds });

        const moveFrameByRefId = (refId, prevRefIds = []) => {
            // MUST ACCESS NEW ELEVATION OFF OF PROPS INSIDE TIMEOUT
            // THIS IS DANGEROUS BECAUSE THE INSTANCE MIGHT BE UNMOUNTED - then the old elevation will still be referenced
            const {
                props: {
                    dimension: {
                        elevation: {
                            instanceCount,
                            getItemByRefId,
                        },
                    },
                },
            } = this;

            const firstIndex = firstDetailRefIds.indexOf(refId);

            const first = firstIndex !== -1;

            const nextRefId = first && firstIndex < firstDetailRefIds.length - 1 ?
                firstDetailRefIds[firstIndex + 1]
                :
                secondDetailRefIds[secondDetailRefIds.indexOf(refId) + 1];
            
            console.log({ instanceCount });

            console.log(this.props.dimension.elevation.instanceCount);

            console.log({ firstIndex, first, nextRefId, refId, prevRefIds, detail: getItemByRefId(refId) });

            if (prevRefIds.includes(refId)) moveFrameByRefId(nextRefId, prevRefIds);
            else {
                const { _frame } = getItemByRefId(refId) || {};

                if (_frame) {
                    const distance = (dimension - input) / (first ? -2 : 2);

                    console.log(`MOVING FRAME ${refId}`);
                    console.log({ _frame, distance, dimension, input, first });
                    // timeout allows rerendering between each deletion
                    updateElevation(
                        MOVE_FRAME,
                        { _frame, distance },
                        () => setTimeout(
                            () => moveFrameByRefId(
                                nextRefId,
                                prevRefIds.concat(_frame.details.map(({ refId }) => refId))
                            ),
                            250,
                        ),
                    );
                }
            }
        }

        moveFrameByRefId(firstDetailRefIds[0]);
    }

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
                    registerReactComponent,
                    elevation: {
                        instanceCount,
                    },
                },
                selected,
                editing,
                finishedFloorHeight,
            },
            handleClick,
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

        console.log(`DIMENSION BUTTON INSTANCE COUNT: ${instanceCount}`);

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
                        value={input}
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

export default withContext(SelectionContext, mapProps, { pure: true })(DimensionButton);
