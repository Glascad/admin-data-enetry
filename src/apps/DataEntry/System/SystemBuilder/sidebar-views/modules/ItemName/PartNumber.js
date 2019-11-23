import React from 'react';
import { Select } from '../../../../../../../components';
import { UPDATE_ITEM } from '../../../../ducks/actions';

export default function PartNumber({
    system: {
        _manufacturer: {
            _parts = [],
        } = {},
    } = {},
    item: {
        path,
        __typename,
    },
    name,
    itemName,
    dispatch,
}) {

    const selectOptions = _parts.map(({ partNumber }) => partNumber).filter(partNumber => partNumber.replace(/-/g, "_") !== itemName);

    return (
        <Select
            data-cy={`edit-${name.toLowerCase()}-type`}
            readOnly={name === 'System'}
            label={name}
            value={itemName}
            options={selectOptions}
            onChange={partNumber => dispatch(UPDATE_ITEM, {
                path,
                __typename,
                update: {
                    name: partNumber.replace(/-/g, '_'),
                }
            })}
        />
    );
}