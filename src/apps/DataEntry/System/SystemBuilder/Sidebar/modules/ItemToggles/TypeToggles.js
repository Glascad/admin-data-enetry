import React from 'react';
import { Input } from '../../../../../../../components';
import { UPDATE_ITEM } from '../../../../ducks/actions';

export default function TypeToggles({
    name,
    selectedItem,
    selectedItem: {
        optional,
    },
    dispatch,
}) {
    
    return name === 'Configuration' ? (
        <Input
            data-cy="required-optional"
            type="switch"
            label="Required"
            checked={!optional}
            onChange={() => dispatch(UPDATE_ITEM, {
                ...selectedItem,
                update: {
                    optional: !optional,
                },
            })}
        />
    ) : null;
}
