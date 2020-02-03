import React from 'react';
import { Input, Select } from '../../../../../../../../components';

export default function ElevationId({
    name,
    _systemSets,
    systemSetId,
    updateElevation,
}) {
    return (
        <>
            <Input
                data-cy="elevation-id"
                label="Elevation ID"
                autoFocus={true}
                value={name}
                onChange={({ target: { value } }) => updateElevation({
                    name: value,
                })}
            />
            <Select
                data-cy="system-set"
                label="System set"
                value={(_systemSets.find(({ id }) => id === systemSetId) || {}).name}
                options={_systemSets.map(({ name }) => name)}
                onChange={value => updateElevation({
                    systemSetId: (_systemSets.find(({ name }) => name === value) || {}).id,
                })}
            />
        </>
    );
}
