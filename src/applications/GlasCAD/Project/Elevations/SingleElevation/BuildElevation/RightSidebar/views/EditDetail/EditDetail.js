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
                items: details,
            }) => (
                    <div>
                        {details.map(({
                            refId,
                            detailType,
                            detailId,
                            configurationTypes,
                        }) => (
                                <div
                                    className=""
                                    key={refId}
                                >
                                    <TitleBar
                                        title="Edit Detail"
                                        selections={[detailId]}
                                    />
                                    {configurationTypes.map(ct => (
                                        <div>
                                            {ct.name}
                                        </div>
                                    ))}
                                </div>
                            ))}
                    </div>
                )}
        </SelectionContext.Consumer>
    );
}
