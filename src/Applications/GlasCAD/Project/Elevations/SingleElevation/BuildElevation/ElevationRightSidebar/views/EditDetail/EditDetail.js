import React from 'react';
import { TitleBar } from '../../../../../../../../../components';
import { SelectionContext } from '../../../contexts/SelectionContext';

export default {
    title: "Edit Detail",
    component: EditDetail,
};

function EditDetail() {
    return (
        <SelectionContext.Consumer>
            {({
                items: {
                    0: {
                        refId,
                        detailType,
                        detailId,
                        configurationTypes,
                    } = {},
                },
            }) => (
                    <>
                        <TitleBar
                            title="Edit Detail"
                            selections={[detailId]}
                        />
                        {configurationTypes
                            .slice()
                            .sort(({ required: a }, { required: b }) => a === b ? 0 : b)
                            .map(({ _configurationType: { id, type }, required }) => (
                                <button
                                    key={id}
                                    className="sidebar-button empty"
                                >
                                    <div className="icon">{required ? "R" : "O"}</div>
                                    <span>{type}</span>
                                </button>
                            ))}
                    </>
                )}
        </SelectionContext.Consumer>
    );
}
