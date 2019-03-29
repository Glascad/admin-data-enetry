import React from 'react';
import { SelectionContext } from '../../../contexts/SelectionContext';
import { TitleBar } from '../../../../../../../../../components';

export default {
    name: "Edit Vertical",
    component: EditVertical,
};

function EditVertical() {
    return (
        <SelectionContext.Consumer>
            {({ }) => (
                <>
                    <TitleBar
                        title="Edit Vertical"
                    />
                    <div className="input-group">
                        
                    </div>
                    <button
                        className="sidebar-button danger"
                        onClick={() => { }}
                    >
                        Delete Vertical
                    </button>
                </>
            )}
        </SelectionContext.Consumer>
    );
}
