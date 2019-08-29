import React, { PureComponent } from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';
import { withContext, Input } from '../../../../../../../../components';
import { unique, ImperialValue } from '../../../../../../../../utils';
import { withActionContext } from '../../contexts/ActionContext';
import { pixelsPerInch, withTransformContext } from '../../contexts/ElevationTransformContext';

class DimensionButton extends PureComponent {

    state = {
        newDimension: new ImperialValue(),
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
                    containers: {
                        length,
                    },
                },
                selectDimension,
            },
            mostRecentClick,
        } = this;

        const currentMilliseconds = Date.now();

        // console.log({
        //     currentMilliseconds,
        //     mostRecentClick,
        // });

        if (length) {
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
        }

        this.mostRecentClick = currentMilliseconds;
    }

    componentDidMount = () => {
        this.componentDidUpdate({ dimension: {} });
    }

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

            this.setState({ newDimension });
        }
    }

    handleFocus = ({ target }) => setTimeout(() => target.select());

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

    handleBlur = ({ value: newDimension }) => this.props.ACTIONS.updateDimension({ newDimension });

    get styleKeys() {
        return this.props.dimension.vertical ?
            {
                dimension: 'Height',
                offset: 'bottom',
                trackOffset: 'left',
                borderLeft: 'Bottom',
                borderRight: 'Top',
            } : {
                dimension: 'Width',
                offset: 'left',
                trackOffset: 'bottom',
                borderLeft: 'Left',
                borderRight: 'Right',
            };
    }

    get style() {

        const {
            state: {
                editing,
            },
            props: {
                track,
                first,
                dimension: {
                    vertical,
                    elevation: {
                        roughOpening: {
                            x: ROx,
                            y: ROy,
                        },
                    },
                },
                transform: {
                    scale: {
                        x: scaleX,
                        y: scaleY,
                    },
                },
                finishedFloorHeight,
                scaledDimension: dimension,
                scaledOffset: offset,
            },
            styleKeys: {
                dimension: dimensionKey,
                offset: offsetKey,
                trackOffset: trackOffsetKey,
                borderLeft: borderLeftKey,
                borderRight: borderRightKey,
            },
        } = this;

        // size = 24, space = 12
        const trackOffset = ((
            (36 * (track + 1) + (vertical ? 65 : 50))
            *
            (first ? -1 : 1)
        ) / scaleY
        ) + (
                (first ? 0 : vertical ? ROx : ROy)
                *
                pixelsPerInch
            );

        return {
            [dimensionKey.toLowerCase()]: dimension,
            [`max${dimensionKey}`]: dimension,
            [`min${dimensionKey}`]: dimension,
            [offsetKey]: offset,
            [trackOffsetKey]: trackOffset,
            transform: `${
                editing ?
                    ''
                    :
                    vertical ?
                        `scaleX(${1 / scaleX})`
                        :
                        `scaleY(${1 / scaleY})`
                } ${
                vertical ?
                    ''
                    :
                    `translateY(${
                    finishedFloorHeight
                    }px)`
                }`,
            [`border${borderLeftKey}Width`]: 1 / scaleX,
            [`border${borderRightKey}Width`]: 1 / scaleX,
        };
    }

    get inputStyle() {
        const {
            props: {
                transform: {
                    scale: {
                        x: scaleX,
                        y: scaleY,
                    },
                },
                scaledDimension: dimension,
            },
        } = this;

        return {
            transform: `scaleX(${1 / scaleX})`,
            width: dimension,
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
                transform: {
                    scale: {
                        x: scaleX,
                        y: scaleY,
                    },
                },
                dimension: {
                    refId,
                    vertical,
                    precedence,
                    registerReactComponent,
                    isRoughOpening,
                },
                selected,
                editing,
                scaledDimension,
            },
            handleClick,
            handleFocus,
            handleChange,
            handleKeyDown,
            handleBlur,
            style,
            inputStyle,
        } = this;

        registerReactComponent(this);

        // console.log({ refId });

        if (!scaledDimension) return null;

        return (
            <button
                id={refId}
                data-cy={refId.toLowerCase()}
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
                    } ${
                    editing ?
                        'editing'
                        :
                        ''
                    } ${
                    isRoughOpening ?
                        'rough-opening'
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
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        autoFocus={true}
                        style={inputStyle}
                    />
                ) : (
                        <div>
                            <div
                                style={{
                                    transform: `scaleX(${1 / scaleX})`,
                                }}
                            >
                                {stringValue}
                                {/* {precedence.toFixed(2)} */}
                            </div>
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

export default withContext(
    SelectionContext,
    mapSelectionProps,
    { pure: true },
)(
    withTransformContext(
        withActionContext(DimensionButton)
    )
);
