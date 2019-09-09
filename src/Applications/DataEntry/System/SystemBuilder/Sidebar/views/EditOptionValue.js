import React from 'react';
import { TitleBar, Input } from '../../../../../../components';
import { getParent, getChildren } from '../../ducks/utils';
import { UPDATE_OPTION_VALUE } from '../../ducks/actions';

function EditOptionValue({
    selectedItem: optionValue,
    selectedItem: {
        id: ovId,
        fakeId: ovFId,
        name: ovName,
        __typename,
    },
    system,
    systemMap,
    queryStatus: {
        validOptions = {},
    } = {},
    dispatch,
}) {

    const option = getParent(optionValue, system);
    const values = getChildren(option, systemMap);

    const validValues = validOptions
        .reduce((values, { name, _validOptionValues }) => (
            option.name.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                values
        ), []);

    const selectValidValues = validValues
        .filter(({ name }) => !values.some(v => v.name === name))
        .map(({ name }) => ({
            value: name,
            label: name,
        }));

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
                    options: selectValidValues,
                    onChange: ({ value }) => dispatch(UPDATE_OPTION_VALUE, {
                        id: ovId,
                        fakeId: ovFId,
                        __typename,
                        name: value,
                    }),
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
