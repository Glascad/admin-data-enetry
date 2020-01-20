import React from 'react';
import { Input, Select, useInitialState } from '../../../../components';

export default function SystemName({
    system: {
        name,
        _manufacturer: {
            name: mnfgName = "",
        } = {},
        systemType,
        sightline = 2,
    },
    queryResult: {
        systemTypes = [],
        __receivedAt,
    },
    dispatch,
    doNotRenderManufacturer = false,
}) {

    const [initialSightline, setInitialSightline] = useInitialState(sightline, [__receivedAt]);

    return (
        <>
            <Input
                data-cy="system-name"
                label="System Name"
                value={name}
                onChange={({ target: { value } }) => dispatch(() => ({ name: value }))}
            />
            {doNotRenderManufacturer ? null : (
                <Select
                    data-cy="manufacturer"
                    readOnly={true}
                    label="Manufacturer"
                    value={mnfgName}
                />
            )}
            <Select
                data-cy="system-type"
                label="System Type"
                value={systemType}
                options={systemTypes}
                onChange={systemType => dispatch(() => ({ systemType }))}
            />
            <Input
                data-cy="sightline"
                label="Sightline"
                type="inches"
                initialValue={initialSightline}
                onChange={sightline => dispatch(() => ({ sightline }))}
            />
        </>
    );
}
