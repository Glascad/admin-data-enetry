import React from 'react';
import { Select } from '../../../../../../../components';

const SystemName = ({
itemName,
}) => (
    <Select
            data-cy={`edit-system-type`}
            readOnly={true}
            label={'System'}
            value={itemName}
    />
);
export default SystemName;