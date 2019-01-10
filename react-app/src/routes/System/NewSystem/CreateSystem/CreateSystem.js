import React from 'react';

import {
    HeadedContainer,
    Input,
} from '../../../../components';

import ListWrapper3 from '../../../../components/ApolloListWrapper/ListWrapper3';

export default function CreateSystem({
    // queryStatus: {
    //     system: {
    //         nodeId: systemNID,
    //         id: systemId,
    //         name,
    //         depth,
    //         defaultSightline,
    //         shimSize,
    //     },
    //     manufacturer: {
    //         id: manufacturerId,
    //         name: manufacturerName,
    //     },
    //     systemType: {
    //         id: systemTypeId,
    //         type: systemTypeName,
    //     },
    //     allSystems,
    //     systemSystemTags,
    //     allManufacturers,
    //     allSystemTypes,
    //     allSystemTags,
    // },
    // mutations: {
    //     createSystem,
    //     createSystemSystemTag,
    //     deleteSystemSystemTag,
    // },
}) {
    console.log(arguments);
    return (
        <HeadedContainer
            title="New System"
            className="input-wrapper"
        >
            {/* <Input
                label="Manufacturer"
                select={{
                    value: {
                        value: manufacturerId,
                        label: manufacturerName,
                    },
                    options: allManufacturers.map(({ id, name }) => ({
                        value: id,
                        label: name,
                    })),
                    onChange: ({ value }) => createSystem({
                        nodeId: systemNID,
                        manufacturerId: value,
                    }),
                }}
            />
            <Input
                label="Name"
                value={name}
                onChange={({ target: { value } }) => createSystem({
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
                    onChange: ({ value }) => createSystem({
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
                    onChange={({ target: { value } }) => createSystem({
                        nodeId: systemNID,
                        depth: value
                    })}
                />
                <Input
                    label="System Sightline"
                    type="number"
                    value={defaultSightline}
                    onChange={({ target: { value } }) => createSystem({
                        nodeId: systemNID,
                        defaultSightline: value,
                    })}
                />
            </div>
            <Input
                label="Caulk Joint Size"
                type="number"
                value={shimSize}
                onChange={({ target: { value } }) => createSystem({
                    nodeId: systemNID,
                    shimSize: value,
                })}
            /> */}
        </HeadedContainer>
    );
}
