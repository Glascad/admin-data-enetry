import React, { PureComponent, createContext } from 'react';

import RecursiveElevation from '../../utils/recursive-elevation/elevation';

import { getDirectionFromArrowKey } from '../../utils/recursive-elevation/directions';
import { unique } from '../../../../../../../utils';
import { withContext } from '../../../../../../../components';

export const SelectionContext = createContext();

export const withSelectionContext = withContext(SelectionContext, ({ context }) => ({ selection: context }), { pure: true });

const {
    RecursiveContainer,
    RecursiveFrame,
    RecursiveDimension,
    RecursiveDetail,
} = RecursiveElevation;

export default class SelectionProvider extends PureComponent {

    state = {
        selectedItems: [],
        selectedDimension: {},
    };

    componentDidMount = () => {
        // this.updateViewportWidth();
        window.addEventListener('keydown', this.escape);
        window.addEventListener('keydown', this.watchHotKeyDown);
        window.addEventListener('keyup', this.watchHotKeyUp);
        window.addEventListener('keydown', this.watchArrowKeyDown);
        // document.body.addEventListener('mousedown', this.cancelSelection);
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.escape);
        window.removeEventListener('keydown', this.watchHotKeyDown);
        window.removeEventListener('keyup', this.watchHotKeyUp);
        window.removeEventListener('keydown', this.watchArrowKeyDown);
        // document.body.removeEventListener('mousedown', this.cancelSelection);
    }

    componentDidUpdate = ({ elevation: oldElevation }) => {
        const {
            state: {
                selectedItems,
                selectedItems: {
                    length,
                },
            },
            props: {
                elevation: newElevation,
            },
        } = this;

        if (oldElevation !== newElevation && length) {
            this.cancelSelection();

            selectedItems.forEach(({ refId }) => {
                const newItem = newElevation.getItemByRefId(refId);
                this.selectItem(newItem);
            });
        }
    }

    escape = ({ key }) => key === 'Escape' && this.cancelSelection();

    watchHotKeyDown = ({ key, ctrlKey, metaKey, shiftKey }) => {
        if (key === ' ') this.spaceKey = true;
        if (ctrlKey || metaKey) this.ctrlKey = true;
        if (shiftKey) this.shiftKey = true;
    }

    watchHotKeyUp = ({ key, ctrlKey, metaKey, shiftKey }) => {
        if (key === ' ') this.spaceKey = false;
        if (!(ctrlKey || metaKey)) this.ctrlKey = false;
        if (!shiftKey) this.shiftKey = false;
    }

    watchArrowKeyDown = ({ key }) => {
        if (!this.spaceKey) {
            const {
                state: {
                    selectedItems,
                    selectedItems: {
                        length,
                    },
                },
                shiftKey,
            } = this;

            const {
                [length - 1]: selectedItem
            } = selectedItems;

            if (selectedItem instanceof RecursiveContainer) {
                const direction = getDirectionFromArrowKey(key);

                if (direction) {
                    const [vertical, first] = direction;
                    const nextContainer = selectedItem.getFirstOrLastContainerByDirection(...direction, !first);

                    if (
                        nextContainer
                        &&
                        !nextContainer.customRoughOpening
                    ) {
                        if (!shiftKey) this.cancelSelection();
                        this.selectItem(nextContainer, true);
                    }
                }
            }
        }
    };

    selectItem = (item, doNotUnselect = false) => {
        if (
            item
            &&
            !item.customRoughOpening
            &&
            !this.spaceKey
            &&
            (
                item instanceof RecursiveContainer
                ||
                item instanceof RecursiveFrame
                ||
                item instanceof RecursiveDetail
                ||
                typeof item === 'string'
            )
        ) {

            this.setState(({
                selectedItems,
                selectedItems: [firstItem],
            }) => ({
                // if item is a string, replace entire selection
                // if selection is empty, initiate selection
                selectedItems: unique((
                    !firstItem
                    ||
                    typeof item === "string"
                    ||
                    typeof firstItem === "string"
                    ||
                    item instanceof RecursiveDetail
                ) ?
                    selectedItems.includes(item) ?
                        selectedItems.filter(selectedItem => selectedItem !== item)
                        :
                        [item]
                    :
                    // only allow selection of one class at a time
                    (
                        firstItem.class === item.class
                        &&
                        firstItem.vertical === item.vertical
                        &&
                        !item.customRoughOpening
                    ) ?
                        selectedItems.includes(item) ?
                            doNotUnselect ?
                                // move item to end of array if should not unselect
                                selectedItems
                                    .filter(selectedItem => selectedItem !== item)
                                    .concat(item)
                                :
                                // remove/unselect an already-selected item
                                selectedItems
                                    .filter(selectedItem => selectedItem !== item)
                            :
                            // add/select an unselected item
                            selectedItems.concat(item)
                        :
                        // only add items that arent already selected
                        selectedItems
                )
            }));
        }
    }

    unselectItem = item => this.setState(({ selectedItems }) => ({
        selectedItems: selectedItems.filter(selectedItem => selectedItem !== item),
    }));

    cancelSelection = () => this.setState(() => ({ selectedItems: [], selectedDimension: {} }));

    selectDimension = selectedDimension => {
        const canEditDimension = selectedDimension.containers.every(({ getFrameByDirection }) => {
            const firstFrame = getFrameByDirection(selectedDimension.vertical, true);
            const secondFrame = getFrameByDirection(selectedDimension.vertical, false);
            return (
                firstFrame
                &&
                firstFrame.canMoveByDirection(true)
                &&
                secondFrame
                &&
                secondFrame.canMoveByDirection(false)
            );
        });
        
        if (canEditDimension) {
            this.cancelSelection();
            selectedDimension.containers.forEach(this.selectItem);
            this.setState(() => ({ selectedDimension }));
        }
    }

    // updateViewportWidth = () => {
    //     const VP = document.getElementById("Viewport");
    //     const RSB = document.getElementById("RightSidebar");
    //     VP.style.marginRight = `${RSB.clientWidth}px`;
    // }

    render = () => {
        const {
            state: {
                selectedItems,
                selectedDimension,
            },
            props: {
                children,
            },
            selectItem,
            selectDimension,
            unselectItem,
            cancelSelection,
        } = this;

        const selectionByRefId = selectedItems
            .reduce((byRefId, item) => ({
                ...byRefId,
                [item.refId]: item,
            }),
                {});

        return (
            <SelectionContext.Provider
                value={{
                    items: selectedItems,
                    itemsByRefId: selectionByRefId,
                    dimension: selectedDimension,
                    selectItem,
                    selectDimension,
                    unselectItem,
                    cancelSelection,
                }}
            >
                {children}
            </SelectionContext.Provider>
        )
    }
}
