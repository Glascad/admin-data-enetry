import React from 'react';


import {
    Input,
    ListWrapper,
    TitleBar,
} from '../../../../../components';
import {
    UPDATE_SYSTEM,
    UPDATE_SYSTEM_LIST,
} from '../system-manager/system-actions';

export default function SystemInfo({
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
    queryStatus: {
        allSystemTypes = [],
        allSystemTags = [],
    },
    updateSystem,
}) {
    return (
        <>
            <TitleBar
                title="System Info"
            />
            <Input
                label="Name"
                value={name}
                onChange={({ target: { value } }) => updateSystem(UPDATE_SYSTEM, { name: value })}
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
                    onChange: ({ value }) => updateSystem(UPDATE_SYSTEM, { systemTypeId: value }),
                }}
            />
            <ListWrapper
                label="System Tags"
                identifier="id"
                items={_systemSystemTags.map(({ _systemTag }) => ({ ..._systemTag }))}
                mapPillProps={({ tag }) => ({
                    title: tag,
                })}
                onFinish={({ addedItems, deletedItems }) => updateSystem(UPDATE_SYSTEM_LIST, {
                    systemTagIds: {
                        addedItems: addedItems.map(({ id }) => id),
                        deletedItems: deletedItems.map(({ id }) => id),
                    },
                })}
                multiSelect={{
                    allItems: allSystemTags,
                }}
            />
            <div className="input-group">
                <Input
                    label="System Depth"
                    type="number"
                    value={depth}
                    onChange={({ target: { value } }) => updateSystem(UPDATE_SYSTEM, { depth: value })}
                />
                <Input
                    label="System Sightline"
                    type="number"
                    value={defaultSightline}
                    onChange={({ target: { value } }) => updateSystem(UPDATE_SYSTEM, { defaultSightline: value })}
                />
                <Input
                    label="Caulk Joint Size"
                    type="number"
                    value={shimSize}
                    onChange={({ target: { value } }) => updateSystem(UPDATE_SYSTEM, { shimSize: value })}
                />
            </div>
        </>
    );
}
