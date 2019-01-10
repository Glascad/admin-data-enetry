import React from 'react';

import {
    HeadedContainer,
    Input,
} from '../../../../components';

import ListWrapper3 from '../../../../components/ApolloListWrapper/ListWrapper3';

export default function SystemInfo({
    queryStatus: {
        system: {
            nodeId: systemNID,
            id: systemId,
            name,
            depth,
            defaultSightline,
            shimSize,
        } = {},
        systemType: {
            id: systemTypeId,
            type: systemTypeName,
        } = {},
        systemSystemTags,
        allSystemTypes,
        allSystemTags,
    },
    mutations: {
        updateSystem,
        createSystemSystemTag,
        deleteSystemSystemTag,
    },
}) {
    console.log(arguments);
    return (
        <HeadedContainer
            title="System Info"
            className="input-wrapper"
        >
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
            <ListWrapper3
                label="System Tags"
                items={systemSystemTags.map(({
                    nodeId: systemSystemTagNID,
                    systemTagBySystemTagId: systemTag,
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
                    systemTagBySystemTagId: systemTag,
                })}
                onDelete={({ systemSystemTagNID, ...systemTag }) => deleteSystemSystemTag({
                    nodeId: systemSystemTagNID,
                    systemTagId: systemTag.id,
                    systemId,
                    systemTagBySystemTagId: systemTag,
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
            </div>
            <Input
                label="Caulk Joint Size"
                type="number"
                value={shimSize}
                onChange={({ target: { value } }) => updateSystem({
                    nodeId: systemNID,
                    shimSize: value,
                })}
            />
        </HeadedContainer>
    );
}
