import React, { Component, createContext } from 'react';

import sidebarStates from './RightSidebar/states';

import { DIRECTIONS, getDirectionFromArrowKey } from '../utils/recursive-elevation/directions';

export const SelectionContext = createContext();

const updateSidebarState = state => state;

export default class SelectionProvider extends Component {

    state = {
        sidebarState: sidebarStates.EditLite,
        previousSidebarStates: [],
        sidebarOpen: true,
        selectedItems: [],
    };

    componentDidMount = () => {
        this.updateViewportWidth();
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

    // setState = (arg, cb) => super.setState(
    //     arg,
    //     () => super.setState(
    //         newState => updateSidebarState(newState),
    //         cb));

    setState = (arg, cb) => {
        if (typeof arg !== 'function') {
            console.error(arg)
            throw new Error(`Please use functional setState() in <SelectionContext/>. Found type: ${typeof arg}`);
        } else {
            return super.setState(state => updateSidebarState(arg(state)), cb);
        }
    }

    escape = ({ key }) => key === 'Escape' && this.toggleSidebar(false);

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
                props: {
                    elevation,
                },
                shiftKey,
            } = this;

            const {
                [length - 1]: refId = '',
            } = selectedItems;

            if (refId.match(/Container/)) {
                const direction = getDirectionFromArrowKey(key);

                if (direction) {
                    const container = elevation.getItemByRefId(refId);

                    if (container) {
                        const nextContainer = container.getFirstOrLastContainerByDirection(...direction, false);

                        if (nextContainer) {
                            this.setState(({ selectedItems }) => ({
                                selectedItems: shiftKey ?
                                    selectedItems.concat(nextContainer.refId)
                                    :
                                    [nextContainer.refId],
                            }));
                        }
                    }
                }
            }
        }
    };

    // cancelSelection = ({ target: { id } }) => !isvalidId(id) && this.setState({
    //     selectedItems: [],
    // });

    handleMouseDown = ({ target: { id } }) => {
        if (!this.spaceKey && id.match(/Vertical|Horizontal|Container|Detail|Dimension/)) {
            this.setState(({ selectedItems }) => ({
                selectedItems: selectedItems.includes(id) ?
                    selectedItems.filter(item => item !== id)
                    :
                    selectedItems.length ?
                        selectedItems[0].slice(0, 4) === id.slice(0, 4) ?
                            selectedItems.concat(id)
                            :
                            selectedItems
                        :
                        [id],
            }), () => !this.state.selectedItems.length
                &&
                this.toggleSidebar(false)
            );
        }
    }

    toggleSidebar = sidebarOpen => {
        this.setState(state => ({
            sidebarOpen: typeof sidebarOpen === 'boolean' ?
                sidebarOpen
                :
                !state.sidebarOpen,
        }), this.updateViewportWidth);
        this.updateSelectionAfterSidebarToggle();
    }

    updateSelectionAfterSidebarToggle = () => {
        this.setState(({ sidebarOpen, selectedItems }) => ({
            selectedItems: sidebarOpen ?
                selectedItems
                :
                [],
        }));
    }

    updateViewportWidth = () => {
        // const VP = document.getElementById("Viewport");
        // const RSB = document.getElementById("RightSidebar");
        // VP.style.marginRight = `${RSB.clientWidth}px`;
    }

    setSidebarState = (sidebarState, clearSelection = false) => this.setState(({
        sidebarState: prevState,
        previousSidebarStates,
        selectedItems,
    }) => ({
        sidebarState,
        previousSidebarStates: previousSidebarStates.concat(prevState),
        selectedItems: clearSelection ?
            []
            :
            selectedItems,
    }), () => this.toggleSidebar(true));

    revertSidebarState = () => this.setState(({
        previousSidebarStates,
        previousSidebarStates: {
            length,
        },
    }) => ({
        sidebarState: previousSidebarStates[length - 1],
        previousSidebarStates: previousSidebarStates.slice(0, length - 1),
    }));

    render = () => {
        const {
            state: {
                sidebarState,
                sidebarOpen,
                selectedItems,
            },
            props: {
                children,
            },
            handleMouseDown,
            toggleSidebar,
            setSidebarState,
            revertSidebarState,
        } = this;

        return (
            <SelectionContext.Provider
                value={{
                    sidebar: {
                        state: sidebarState,
                        open: sidebarOpen,
                        toggle: toggleSidebar,
                        setState: setSidebarState,
                        revert: revertSidebarState,
                    },
                    selection: {
                        items: selectedItems,
                        handleMouseDown,
                    },
                }}
            >
                {children}
            </SelectionContext.Provider>
        )
    }
}
