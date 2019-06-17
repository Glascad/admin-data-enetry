import React, { PureComponent } from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';
import { withContext, Input } from '../../../../../../../../components';
import { unique, ImperialValue } from '../../../../../../../../utils';
import { MOVE_FRAME } from '../../ducks/actions';
import { withActionContext } from '../../contexts/ActionContext';

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

    // componentDidMount = () => this.componentDidUpdate({ dimension: {} });

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
        console.log({ dimension });
        console.log(this.props.dimension);

        if ((oldEditing !== newEditing) || (oldDimension !== dimension)) {
            console.log(`UPDATING DIMENSION: ${dimension}`);

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
            if (key === ' ') e.preventDefault();
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
                    dimension,
                    offset,
                    registerReactComponent,
                },
                finishedFloorHeight,
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
                newDimension: {
                    value,
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

        console.log({ stringValue });

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
                        initialValue={value}
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
