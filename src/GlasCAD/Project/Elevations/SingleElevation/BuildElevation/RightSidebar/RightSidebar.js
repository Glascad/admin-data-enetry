import React from 'react';

import { SelectionContext } from '../SelectionContext';

import './RightSidebar.scss';

export default function RightSidebar({
    elevation,
    updateElevation,
}) {
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
                        <Children
                            elevation={elevation}
                            updateElevation={updateElevation}
                        />
                    </div>
                )}
        </SelectionContext.Consumer>
    );
}
