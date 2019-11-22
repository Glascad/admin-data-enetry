import React from 'react';
import { Select } from '../../../../../../../../components';

export default function PartNumber({
    system: {
        _manufacturer: {
            _parts = [],
        } = {},
    } = {},
    item: {
        part: {
            partNumber = '',
        } = {},
    },
    name,
    itemName,
}) {

    const selectOptions = _parts.map(({ partNumber }) => partNumber).filter(name => name !== partNumber);

    return (
        <Select
            data-cy={`edit-${name.toLowerCase()}-type`}
            readOnly={name === 'System'}
            label={name}
            value={itemName}
            options={selectOptions}
            onChange={name => console.log(name)}
        />
    );
}