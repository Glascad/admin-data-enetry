import React from 'react';
import { Select } from '../../../../../../../components';

const SystemName = ({
    item: {
        name,
    },
}) => (
        <Select
            data-cy={`edit-system-type`}
            readOnly={true}
            label={'System'}
            value={name}
        />
    );
export default SystemName;