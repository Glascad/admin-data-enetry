import React from 'react';
import { CollapsibleTitle, GroupingBox, Input, Select } from '../../../../../../components';
import { SELECT_SYSTEM } from '../ducks/actions';

export default function SystemSetInfo({
    systemName,
    allSystems,
    dispatch,
    manufacturerName,
    systemType,
    name,
}) {
    return (
        <CollapsibleTitle
            title="System Set"
        >
            <GroupingBox
                title="System Info"
            >
                <div className="input-group">
                    <Select
                        data-cy="system-name"
                        label="System"
                        value={systemName}
                        options={allSystems.map(({ name }) => name)}
                        onChange={system => dispatch(SELECT_SYSTEM, system)}
                    />
                    <Select
                        data-cy="manufacturer-name"
                        label="Manufacturer"
                        readOnly={true}
                        value={manufacturerName}
                    />
                    <Select
                        data-cy="system-type"
                        label="System Type"
                        readOnly={true}
                        value={systemType}
                    />
                </div>
            </GroupingBox>
            <Input
                data-cy="system-set-name"
                label="System Set Name"
                value={name}
                onChange={({ target: { value } }) => dispatch((_, systemSetUpdate) => ({
                    ...systemSetUpdate,
                    name: value,
                }))}
            />
        </CollapsibleTitle>
    );
}
