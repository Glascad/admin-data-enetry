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
    RecursiveDimension,
    RecursiveDetail,
    "string",
];

const getSelectedClass = item => selectableClasses.find(SelectedClass => (
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
                    const nextContainer = selectedItem.getFirstOrLastContainerByDirection(...direction, false);

                    if (nextContainer) {
                        this.setState(({ selectedItems }) => ({
                            selectedItems: shiftKey ?
                                selectedItems.concat(nextContainer)
                                :
                                [nextContainer],
                        }));
                    }
                }
            }
        }
    };

    selectItem = (item, doNotUnselect = false) => {
        if (!this.spaceKey) {

            const SelectedClass = getSelectedClass(item);

            if (SelectedClass) {
                this.setState(({ selectedItems }) => ({
                    // if item is a string, replace entire selection
                    // if selection is empty, initiate selection
                    selectedItems: (
                        !selectedItems.length
                        ||
                        SelectedClass === "string"
                        ||
                        getSelectedClass(selectedItems[0]) === "string"
                    ) ?
                        [item]
                        :
                        // only allow selection of one class at a time
                        getSelectedClass(selectedItems[0]) === SelectedClass ?
                            selectedItems.includes(item) && !doNotUnselect ?
                                // remove/unselect an already-selected item
                                selectedItems.filter(selectedItem => selectedItem !== item)
                                :
                                // add/select an unselected item
                                selectedItems.concat(item)
                            :
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
                    selection: {
                        items: selectedItems,
                        selectItem,
                        unselectItem,
                        cancelSelection,
                    },
                }}
            >
                {children}
            </SelectionContext.Provider>
        )
    }
}
