import React, { useEffect } from 'react';
import { Input, Select } from '../../../../../../../../components';

export default function ElevationId({
    name,
    loading,
    _systemSets = [],
    _systemSets: {
        0: firstSystemSet
    } = {},
    systemSetId,
    updateElevation,
}) {

    const selectedSystemSet = (_systemSets.find(({ id }) => id === systemSetId) || {}).name;

    console.log({
        _systemSets,
        selectedSystemSet,

    })
    useEffect(() => {
        console.log('USING EFFECT')
        if (!selectedSystemSet && _systemSets.length > 0) updateElevation({ systemSetId: firstSystemSet.id });
    }, [!loading])


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
                value={selectedSystemSet}
                options={_systemSets.map(({ name }) => name)}
                onChange={value => updateElevation({
                    systemSetId: (_systemSets.find(({ name }) => name === value) || {}).id,
                })}
            />
        </>
    );
}
