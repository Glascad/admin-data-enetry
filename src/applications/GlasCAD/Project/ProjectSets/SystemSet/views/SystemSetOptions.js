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
    return (
        <>
            {selectedOptionValues.map(({
                systemOption: {
                    id,
                    name,
                },
                selectedValueId,
                optionValues,
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
                                // label: 
                            }
                        }}
                    />
                ))}
        </>
    );
}
