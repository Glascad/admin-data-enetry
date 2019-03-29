import React from 'react';

import { SelectionContext } from '../../../contexts/SelectionContext';

import {
    TitleBar,
} from '../../../../../../../../../components';

import BackButton from '../components/BackButton';

export default {
    name: "Add Vertical",
    component: AddVertical,
};

function AddVertical() {
    return (
        <SelectionContext.Consumer>
            {({
                selection: {
                    items,
                },
            }) => (
                    <>
                        <TitleBar
                            title="Add Vertical"
                        />
                        <div className="bottom-buttons">
                            <BackButton />
                            <button
                                className="sidebar-button empty"
                                onClick={() => { }}
                            >
                                Reset
                            </button>
                            <button
                                className="sidebar-button action"
                                onClick={() => { }}
                            >
                                Add
                            </button>
                        </div>
                    </>
                )}
        </SelectionContext.Consumer>
    );
}
