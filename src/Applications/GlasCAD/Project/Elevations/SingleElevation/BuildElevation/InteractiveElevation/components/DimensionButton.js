import React, { PureComponent } from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';
import { withContext, Input } from '../../../../../../../../components';
import { unique, ImperialValue } from '../../../../../../../../utils';
import { MOVE_FRAME } from '../../ducks/actions';
import { withActionContext } from '../../contexts/ActionContext';
import { pixelsPerInch } from '../../contexts/TransformContext';

class DimensionButton extends PureComponent {

    state = {
        newDimension: new ImperialValue(),
    };

    mostRecentClick = 0;

    handleClick = ({
        button,
        buttons,
        detail,
        nativeEvent,
        target,
        relatedTarget,
        type,
        view,
        timestamp,
    }) => {
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

        if (currentMilliseconds - mostRecentClick < 500) {
            // console.log("DOUBLE CLICK - toggle editing state");
            selectDimension(dimension);
        }
        else if (selected) {
            // console.log("SINGLE CLICK - unselect");
            containers.forEach(container => unselectItem(container));
        }
        else {
            // console.log("SINGLE CLICK - select");
            containers.forEach(container => selectItem(container, true));
        }

        this.mostRecentClick = currentMilliseconds;
    }

    componentDidMount = () => this.componentDidUpdate({ dimension: {} });

    // component doesn't update often -- must be dynamically calculated every time
    componentDidUpdate = ({ editing: oldEditing, dimension: { dimension: oldDimension } }) => {
        const {
            props: {
                editing: newEditing,
                dimension: {
                    dimension,
                },
            },
        } = this;
        // console.log({ dimension });
        // console.log(this.props.dimension);

        if ((oldEditing !== newEditing) || (oldDimension !== dimension)) {
            // console.log(`UPDATING DIMENSION: ${dimension}`);

            const newDimension = new ImperialValue(dimension);

            console.log({ newDimension });

            this.setState({ newDimension });
        }
    }

    handleFocus = ({ target }) => setTimeout(() => target.select());

    handleChange = newDimension => this.setState({ newDimension });

    handleKeyDown = e => {
        const {
            key,
            target,
        } = e;
        if (key === 'Enter') {
            target.blur();
        }
        else if (key !== 'Escape') {
            if (key === ' ') {
                target.value += ' ';
                e.preventDefault();
            }
            e.stopPropagation();
        }
    }

    handleBlur = () => {
        const {
            state: {
                newDimension: {
                    value: newDimension,
                },
            },
            props: {
                ACTIONS: {
                    updateDimension,
                },
            },
        } = this;

        console.log({ newDimension });

        updateDimension({ newDimension });
    }

    get styleKeys() {
        return this.props.dimension.vertical ?
            {
                dimension: 'Height',
                offset: 'bottom',
                trackOffset: 'left',
            } : {
                dimension: 'Width',
                offset: 'left',
                trackOffset: 'bottom',
            };
    }

    get style() {

        const {
            props: {
                track,
                dimension: {
                    vertical,
                    registerReactComponent,
                },
                finishedFloorHeight,
                scaledDimension: dimension,
                scaledOffset: offset,
            },
            styleKeys: {
                dimension: dimensionKey,
                offset: offsetKey,
                trackOffset: trackOffsetKey,
            },
        } = this;

        // size = 24, space = 12
        const trackOffset = -36 * (track + 1) - 50;

        registerReactComponent(this);

        return {
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
    }

    render = () => {
        const {
            state: {
                newDimension,
                newDimension: {
                    stringValue,
                },
            },
            props: {
                dimension: {
                    refId,
                    vertical,
                },
                selected,
                editing,
            },
            handleClick,
            handleFocus,
            handleChange,
            handleKeyDown,
            handleBlur,
            style,
        } = this;

        // console.log({ stringValue });

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
                        type="inches"
                        initialValue={newDimension}
                        onFocus={handleFocus}
                        onChange={handleChange}
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
                            {stringValue}
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
        dimension: unscaledDimension,
        offset: unscaledOffset,
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
    scaledDimension: pixelsPerInch * unscaledDimension,
    scaledOffset: pixelsPerInch * unscaledOffset,
});

export default withContext(SelectionContext, mapSelectionProps, { pure: true })(withActionContext(DimensionButton));
