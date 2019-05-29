import React from 'react';
import { Input } from '../../../../../../components';

SystemSetOptions.navigationOptions = {
    name: "System Options",
};

export default function SystemSetOptions({
    queryStatus: {
        systemSet: {
            id,
            infillSize: systemSetInfillSize,
            system: systemSetSystem,
            system: {
                infillSizes: systemSetSystemInfillSizes,
                manufacturer: systemSetManufacturer,
            } = {},
            selectedOptionValues = [],
        } = {},
        allManufacturers = [],
        allSystems = [],
    },
    systemSet,
    systemSetInput: {
        systemId,
        infillSize: infillSizeInput,
    },
    filters: {
        manufacturerId,
        systemTypeId,
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
                            onChange: ({ value }) => console.log({ value }),
                        }}
                    />
                ))}
        </>
    );
}
