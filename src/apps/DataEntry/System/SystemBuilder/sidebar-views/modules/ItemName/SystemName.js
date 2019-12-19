import React from 'react';
import { Select, Input } from '../../../../../../../components';

const SystemName = ({
    system: {
        name,
        _manufacturer: {
            name: mnfgName = "",
        } = {},
        systemType,
        sightline,
    },
    queryResult: {
        systemTypes = [],
    },
    dispatch,
}) => (
        <>
            <Input
                data-cy="system-name"
                label="System Name"
                value={name}
                onChange={({ target: { value } }) => dispatch(() => ({ name: value }))}
            />
            <Select
                data-cy={`manufacturer`}
                readOnly={true}
                label={'Manufacturer'}
                value={mnfgName}
            />
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
                initialValue={sightline}
                onChange={sightline => dispatch(() => ({ sightline }))}
            />
        </>
    );
export default SystemName;