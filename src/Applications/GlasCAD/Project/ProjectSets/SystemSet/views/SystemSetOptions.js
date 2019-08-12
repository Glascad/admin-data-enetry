import React from 'react';
import { Input } from '../../../../../../components';
import { SELECT_OPTION_VALUE } from '../ducks/actions';

SystemSetOptions.navigationOptions = {
    path: "/options",
    name: "System Options",
};

export default function SystemSetOptions({
    systemSet: {
        selectedOptionValues = [],
    },
    dispatch,
}) {
    console.log(arguments[0]);
    return (
        <>
            {selectedOptionValues.map(({
                systemOption: {
                    id,
                    name,
                },
                selectedValueId,
                optionValues = [],
                optionValues: {
                    length,
                } = [],
            }) => (
                    <Input
                        key={id}
                        label={name}
                        select={{
                            value: {
                                value: selectedValueId,
                                label: (optionValues.find(({ id }) => id === selectedValueId) || {}).name,
                            },
                            options: optionValues.map(({ id, name }) => ({
                                value: id,
                                label: name,
                            })),
                            onChange: ({ value }) => dispatch(SELECT_OPTION_VALUE, {
                                optionId: id,
                                valueId: value,
                            }),
                        }}
                    />
                ))}
        </>
    );
}
