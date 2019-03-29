import React from 'react';

import { SelectionContext } from '../../../contexts/SelectionContext';

export default function BackButton() {
    return (
        <SelectionContext.Consumer>
            {({
            }) => (
                    <button
                        className="sidebar-button empty"
                    >
                        Cancel
                    </button>
                )}
        </SelectionContext.Consumer>
    );
}
