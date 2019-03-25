import React from 'react';

import { SelectionContext } from '../../../SelectionContext';

export default function BackButton() {
    return (
        <SelectionContext.Consumer>
            {({
                sidebar: {
                    revert,
                },
            }) => (
                    <button
                        className="sidebar-button empty"
                        onClick={revert}
                    >
                        Cancel
                    </button>
                )}
        </SelectionContext.Consumer>
    );
}
