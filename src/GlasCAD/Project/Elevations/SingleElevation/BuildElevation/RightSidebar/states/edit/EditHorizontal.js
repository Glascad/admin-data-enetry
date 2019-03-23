import React from 'react';
import { SelectionContext } from '../../../SelectionContext';
import { TitleBar } from '../../../../../../../../components';

export default {
    name: "Edit Horizontal",
    component: EditHorizontal,
};

function EditHorizontal() {
    return (
        <SelectionContext.Consumer>
            {({ }) => (
                <>
                    <TitleBar
                        title="Edit Horizontal"
                    />
                    <div className="input-group">

                    </div>
                    <button
                        className="sidebar-button danger"
                        onClick={() => { }}
                    >
                        Delete Horizontal
                    </button>
                </>
            )}
        </SelectionContext.Consumer>
    );
}
