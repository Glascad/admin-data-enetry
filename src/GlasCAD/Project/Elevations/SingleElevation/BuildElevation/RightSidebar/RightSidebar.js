import React from 'react';

import { SelectionContext } from '../SelectionContext';

import './RightSidebar.scss';

export default function RightSidebar() {
    return (
        <SelectionContext.Consumer>
            {({
                sidebar: {
                    open,
                    toggle,
                    state: {
                        name = '',
                        component: Children = () => null,
                    } = {},
                },
            }) => (
                    <div id="RightSidebar" className={open ? "" : "closed"}>
                        <button
                            className="sidebar-button primary"
                            onClick={toggle}
                        >
                            Close {name}
                        </button>
                        <Children />
                    </div>
                )}
        </SelectionContext.Consumer>
    );
}
