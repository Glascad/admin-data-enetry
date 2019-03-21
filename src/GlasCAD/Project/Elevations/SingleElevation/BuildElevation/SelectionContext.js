import React, { Component, createContext } from 'react';

export const SelectionContext = createContext();

export default class SelectionProvider extends Component {

    state = {
        open: true,
        items: [],
    };

    componentDidMount = () => {
        this.updateViewportWidth();
        window.addEventListener('keydown', this.watchCtrlKeyDown);
        window.addEventListener('keyup', this.watchCtrlKeyUp);
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.watchCtrlKeyDown);
        window.removeEventListener('keyup', this.watchCtrlKeyUp);
    }

    watchCtrlKeyDown = ({ ctrlKey, metaKey }) => this.ctrlKey = ctrlKey || metaKey;

    watchCtrlKeyUp = ({ ctrlKey, metaKey }) => this.ctrlKey = ctrlKey || metaKey;

    handleMouseDown = ({ target: { id } }) => !this.ctrlKey && this.setState(({ items }) => ({
        items: items.includes(id) ?
            items.filter(item => item !== id)
            :
            items.concat(id),
    }));

    toggle = open => this.setState({
        open: typeof open === 'boolean' ?
            open
            :
            !this.state.open,
    }, this.updateViewportWidth);

    updateViewportWidth = () => {
        const VP = document.getElementById("Viewport");
        const RSB = document.getElementById("RightSidebar");
        VP.style.marginRight = `${RSB.clientWidth}px`;
    }

    render = () => {
        const {
            state: {
                open,
                items,
            },
            props: {
                children,
            },
            handleMouseDown,
            toggle,
        } = this;

        return (
            <SelectionContext.Provider
                value={{
                    sidebar: {
                        open,
                        toggle,
                    },
                    selection: {
                        items,
                        handleMouseDown,
                    },
                }}
            >
                {children}
            </SelectionContext.Provider>
        )
    }
}
