import React from 'react';

import {
    HeadedContainer,
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
        updateSystem,
        createSystemSystemTag,
        deleteSystemSystemTag,
    },
}) {
    return (
        <div className="input-wrapper">
            <TitleBar
                title="System Info"
            />
            <Input
                label="Name"
                value={name}
                onChange={({ target: { value } }) => updateSystem({
                    nodeId: systemNID,
                    name: value,
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
                    onChange: ({ value }) => updateSystem({
                        nodeId: systemNID,
                        systemTypeId: value,
                    }),
                }}
            />
            <ListWrapper
                label="System Tags"
                items={systemSystemTags.map(({
                    nodeId: systemSystemTagNID,
                    systemTag,
                }) => ({
                    systemSystemTagNID,
                    ...systemTag,
                }))}
                mapPillProps={({ tag }) => ({
                    title: tag,
                })}
                onCreate={systemTag => createSystemSystemTag({
                    systemTagId: systemTag.id,
                    systemId,
                    systemTag,
                })}
                onDelete={({ systemSystemTagNID, ...systemTag }) => deleteSystemSystemTag({
                    nodeId: systemSystemTagNID,
                    systemTagId: systemTag.id,
                    systemId,
                    systemTag,
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
                    onChange={({ target: { value } }) => updateSystem({
                        nodeId: systemNID,
                        depth: value
                    })}
                />
                <Input
                    label="System Sightline"
                    type="number"
                    value={defaultSightline}
                    onChange={({ target: { value } }) => updateSystem({
                        nodeId: systemNID,
                        defaultSightline: value,
                    })}
                />
                <Input
                    label="Caulk Joint Size"
                    type="number"
                    value={shimSize}
                    onChange={({ target: { value } }) => updateSystem({
                        nodeId: systemNID,
                        shimSize: value,
                    })}
                />
            </div>
        </div>
    );
}
