import React, { Component, createContext } from 'react';

import sidebarStates from './RightSidebar/states';

import { DIRECTIONS } from '../utils/recursive-elevation/directions';

export const SelectionContext = createContext();

export default class SelectionProvider extends Component {

    state = {
        sidebarState: sidebarStates.ZoomAndPan,
        sidebarOpen: true,
        selectedItems: [],
    };

    componentDidMount = () => {
        this.updateViewportWidth();
        window.addEventListener('keydown', this.watchCtrlKeyDown);
        window.addEventListener('keydown', this.watchArrowKey);
        window.addEventListener('keyup', this.watchCtrlKeyUp);
        // document.body.addEventListener('mousedown', this.cancelSelection);
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.watchCtrlKeyDown);
        window.removeEventListener('keydown', this.watchArrowKey);
        window.removeEventListener('keyup', this.watchCtrlKeyUp);
        // document.body.removeEventListener('mousedown', this.cancelSelection);
    }

    watchCtrlKeyDown = ({ ctrlKey, metaKey }) => this.ctrlKey = ctrlKey || metaKey;

    watchCtrlKeyUp = ({ ctrlKey, metaKey }) => this.ctrlKey = ctrlKey || metaKey;

    watchArrowKey = ({ key }) => {

        if (!this.ctrlKey) {
            const {
                state: {
                    selectedItems: {
                        0: refId,
                        length,
                    },
                },
                props: {
                    elevation,
                },
            } = this;

            if (length === 1
                &&
                refId.match(/Container/)
            ) {
                const direction = DIRECTIONS[
                    key === "ArrowUp" ? "UP"
                        :
                        key === "ArrowDown" ? "DOWN"
                            :
                            key === "ArrowLeft" ? "LEFT"
                                :
                                key === "ArrowRight" ? "RIGHT"
                                    :
                                    ""];

                if (direction) {
                    const container = elevation.getItemByRefId(refId);

                    if (container) {
                        const nextContainer = container._getFirstOrLastContainerByDirection(...direction, false);

                        if (nextContainer) {
                            this.setState({
                                selectedItems: [nextContainer.refId],
                            });
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
        if (!this.ctrlKey) {
            this.setState(({ selectedItems }) => ({
                selectedItems: selectedItems.includes(id) ?
                    selectedItems.filter(item => item !== id)
                    :
                    selectedItems.concat(id),
            }), () => this.state.selectedItems.length ?
                this.setSidebarState(
                    this.state.selectedItems[0].match(/Container/) ?
                        this.state.selectedItems.length > 1 ?
                            sidebarStates.EditMultipleLites
                            :
                            sidebarStates.EditLite
                        :
                        this.state.selectedItems[0].match(/Frame/) ?
                            this.state.selectedItems.length > 1 ?
                                sidebarStates.EditMultipleFrames
                                :
                                sidebarStates.EditFrame
                            :
                            sidebarStates.EditMultipleLites
                )
                :
                this.toggleSidebar(false)
            );
        }
    }

    toggleSidebar = sidebarOpen => {
        this.setState({
            sidebarOpen: typeof sidebarOpen === 'boolean' ?
                sidebarOpen
                :
                !this.state.sidebarOpen,
        }, this.updateViewportWidth);
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
        const VP = document.getElementById("Viewport");
        const RSB = document.getElementById("RightSidebar");
        VP.style.marginRight = `${RSB.clientWidth}px`;
    }

    setSidebarState = sidebarState => this.setState(() => ({
        sidebarState,
    }), () => this.toggleSidebar(true));

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
        } = this;

        return (
            <SelectionContext.Provider
                value={{
                    sidebar: {
                        state: sidebarState,
                        open: sidebarOpen,
                        toggle: toggleSidebar,
                        setState: setSidebarState,
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
