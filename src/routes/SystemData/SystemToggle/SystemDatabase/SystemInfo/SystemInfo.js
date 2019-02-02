import React from 'react';

import {
    Input,
    ListWrapper,
} from '../../../../../components';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';

export default function SystemInfo({
    queryStatus: {
        system: {
            nodeId: systemNID,
            id: systemId,
            name = "",
            depth = 0,
            defaultSightline = 0,
            shimSize = 0,
            systemType: {
                id: systemTypeId,
                type: systemTypeName = "",
            } = {},
            systemSystemTags = [],
        } = {},
        allSystemTypes = [],
        allSystemTags = [],
    },
    mutations: {
        updateEntireSystem,
        createSystemSystemTag,
        deleteSystemSystemTag,
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
                onChange={({ target: { value } }) => updateEntireSystem({
                    id: systemId,
                    nodeId: systemNID,
                    newName: value,
                })}
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
                    onChange: ({ value }) => updateEntireSystem({
                        id: systemId,
                        nodeId: systemNID,
                        newSystemTypeId: value,
                    }),
                }}
            />
            <ListWrapper
                label="System Tags"
                identifier="id"
                items={systemSystemTags.map(({ systemTag }) => ({ ...systemTag }))}
                mapPillProps={({ tag }) => ({
                    title: tag,
                })}
                onCreate={({ id }) => updateEntireSystem({
                    id: systemId,
                    nodeId: systemNID,
                    newSystemTags: [id],
                })}
                onDelete={({ id }) => updateEntireSystem({
                    id: systemId,
                    nodeId: systemNID,
                    oldSystemTags: [id],
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
                    onChange={({ target: { value } }) => updateEntireSystem({
                        id: systemId,
                        nodeId: systemNID,
                        newDepth: value
                    })}
                />
                <Input
                    label="System Sightline"
                    type="number"
                    value={defaultSightline}
                    onChange={({ target: { value } }) => updateEntireSystem({
                        id: systemId,
                        nodeId: systemNID,
                        newDefaultSightline: value,
                    })}
                />
                <Input
                    label="Caulk Joint Size"
                    type="number"
                    value={shimSize}
                    onChange={({ target: { value } }) => updateEntireSystem({
                        id: systemId,
                        nodeId: systemNID,
                        newShimSize: value,
                    })}
                />
            </div>
        </>
    );
}
