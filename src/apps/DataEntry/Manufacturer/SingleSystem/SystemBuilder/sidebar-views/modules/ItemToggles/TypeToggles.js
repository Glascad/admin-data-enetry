import React from 'react';
import { Input } from '../../../../../../../../components';
import { UPDATE_ITEM } from '../../../../ducks/actions';

const TypeToggles = ({
    type,
    item,
    item: {
        optional
    },
    dispatch,
}) => type === 'Configuration' ? (
    <Input
        data-cy="required-optional"
        type="switch"
        label="Required"
        checked={!optional}
        onChange={() => dispatch(UPDATE_ITEM, {
            ...item,
            update: {
                optional: !optional,
            },
        })}
    />
    ) : null;

export default TypeToggles;