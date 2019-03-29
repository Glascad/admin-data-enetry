import React from 'react';

import { SelectionContext } from '../contexts/SelectionContext';

import './RightSidebar.scss';

export default function RightSidebar({
    elevation,
    updateElevation,
}) {
    return (
        <SelectionContext.Consumer>
            {({
                selection: {
                    items,
                    items: {
                        0: selectedItem,
                        length,
                    },
                    cancelSelection,
                    selectableClasses,
                    getSelectableClass,
                },
            }) => (
                    <div id="RightSidebar" className={selectedItem ? "" : "closed"}>
                        <button
                            className="sidebar-button primary"
                            onClick={cancelSelection}
                        >
                            Close
                        </button>
                    </div>
                )}
        </SelectionContext.Consumer>
    );
}
