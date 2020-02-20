import React from 'react';
import { Select } from '../../../../../../../components';
import { UPDATE_ITEM } from '../../../../ducks/actions';
import getPartId from '../../../../../../../app-logic/system/get-part-id';

export default function PartNumber({
    system,
    system: {
        _manufacturer: {
            _parts = [],
        } = {},
    } = {},
    selectedItem,
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
                ...selectedItem,
                update: {
                    name: partNumber.replace(/-/g, '_'),
                    partId: getPartId(partNumber, system)
                }
            })}
        />
    );
}