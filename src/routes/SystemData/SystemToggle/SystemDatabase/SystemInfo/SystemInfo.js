import React from 'react';

import {
    Input,
    ListWrapper,
} from '../../../../../components';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';

export default function SystemInfo({
    queryStatus: {
        system: {
            name = "",
            depth = 0,
            defaultSightline = 0,
            shimSize = 0,
            _systemType: {
                id: systemTypeId,
                type: systemTypeName = "",
            } = {},
            _systemSystemTags = [],
        } = {},
        allSystemTypes = [],
        allSystemTags = [],
    },
    methods: {
        handleChange,
        handleListChange,
        handleOptionChange,
        handleOptionValueChange,
        createOption,
        createOptionValue,
        deleteOption,
        deleteOptionValue,
    },
}) {
    console.log(arguments[0]);
    return (
        <>
            <TitleBar
                title="System Info"
            />
            <Input
                label="Name"
                value={name}
                onChange={({ target: { value } }) => handleChange('name', value)}
            />
            <Input
                label="System Type"
                select={{
                    value: {
                        value: systemTypeId,
                        label: systemTypeName,
                    },
                    options: allSystemTypes.map(({ id, type }) => ({
                        value: id,
                        label: type,
                    })),
                    onChange: ({ value }) => handleChange('systemTypeId', value),
                }}
            />
            <ListWrapper
                label="System Tags"
                identifier="id"
                items={_systemSystemTags.map(({ _systemTag }) => ({ ..._systemTag }))}
                mapPillProps={({ tag }) => ({
                    title: tag,
                })}
                onFinish={({ addedItems, deletedItems }) => handleListChange('systemTagIds',
                    addedItems.map(({ id }) => id),
                    deletedItems.map(({ id }) => id),
                )}
                multiSelect={{
                    allItems: allSystemTags,
                }}
            />
            <div className="input-group">
                <Input
                    label="System Depth"
                    type="number"
                    value={depth}
                    onChange={({ target: { value } }) => handleChange('depth', value)}
                />
                <Input
                    label="System Sightline"
                    type="number"
                    value={defaultSightline}
                    onChange={({ target: { value } }) => handleChange('defaultSightline', value)}
                />
                <Input
                    label="Caulk Joint Size"
                    type="number"
                    value={shimSize}
                    onChange={({ target: { value } }) => handleChange('shimSize', value)}
                />
            </div>
        </>
    );
}
