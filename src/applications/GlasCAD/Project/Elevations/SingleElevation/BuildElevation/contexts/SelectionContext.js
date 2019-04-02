import React, { Component, createContext } from 'react';

import RecursiveElevation from '../../utils/recursive-elevation/elevation';
import { DIRECTIONS, getDirectionFromArrowKey } from '../../utils/recursive-elevation/directions';

export const SelectionContext = createContext();

const {
    RecursiveContainer,
    RecursiveFrame,
    RecursiveDimension,
    RecursiveDetail,
} = RecursiveElevation;

const selectableClasses = [
    RecursiveContainer,
    RecursiveFrame,
    RecursiveDetail,
    String,
    "string",
];

const getSelectedClass = item => item && selectableClasses.find(SelectedClass => (
    typeof item === SelectedClass
    ||
    item instanceof SelectedClass
));

export default class SelectionProvider extends Component {

    state = {
        selectedItems: [],
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

            selectedItems.forEach(({ refId, elevation: { instanceCount } }) => {
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

                    if (nextContainer) {
                        if (!shiftKey) this.cancelSelection();
                        this.selectItem(nextContainer, true);
                    }
                }
            }
        }
    };

    selectItem = (item, doNotUnselect = false) => {
        if (!this.spaceKey) {

            const SelectedClass = getSelectedClass(item);

            if (SelectedClass) {
                this.setState(({
                    selectedItems,
                    selectedItems: [firstItem],
                }) => ({
                    // if item is a string, replace entire selection
                    // if selection is empty, initiate selection
                    selectedItems: (
                        !selectedItems.length
                        ||
                        SelectedClass === "string"
                        ||
                        getSelectedClass(firstItem) === "string"
                    ) ?
                        [item]
                        :
                        // only allow selection of one class at a time
                        (
                            getSelectedClass(firstItem) === SelectedClass
                            &&
                            firstItem.vertical === item.vertical
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
                            selectedItems,
                }));
            }
        }
    }

    unselectItem = item => this.setState(({ selectedItems }) => ({
        selectedItems: selectedItems.filter(selectedItem => selectedItem !== item),
    }));

    cancelSelection = () => this.setState({ selectedItems: [] });

    // updateViewportWidth = () => {
    //     const VP = document.getElementById("Viewport");
    //     const RSB = document.getElementById("RightSidebar");
    //     VP.style.marginRight = `${RSB.clientWidth}px`;
    // }

    render = () => {
        const {
            state: {
                selectedItems,
            },
            props: {
                children,
            },
            selectItem,
            unselectItem,
            cancelSelection,
        } = this;

        return (
            <SelectionContext.Provider
                value={{
                    items: selectedItems,
                    selectItem,
                    unselectItem,
                    cancelSelection,
                }}
            >
                {children}
            </SelectionContext.Provider>
        )
    }
}
