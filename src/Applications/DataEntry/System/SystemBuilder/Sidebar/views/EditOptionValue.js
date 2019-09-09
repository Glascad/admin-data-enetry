import React from 'react';
import { TitleBar, Input } from '../../../../../../components';

function EditOptionValue({
    selectedItem: optionValue,
    selectedItem: {
        id: ovId,
        fakeId: ovFId,
        name: ovName,
        __typename,
    },
    dispatch,
}) {
    return (
        <>
            <TitleBar
                title="Edit Option Value"
            />
            <Input
                data-cy="edit-value-name"
                select={{
                    value: {
                        label: ovName,
                        value: ovName,
                    },
                    options: [],
                    onChange: () => { },
                }}
            />
        </>
    );
}

export const SystemOptionValue = {
    title: "Edit Option Value",
    component: EditOptionValue,
};

export const DetailOptionValue = SystemOptionValue;
export const ConfigurationOptionValue = DetailOptionValue;
