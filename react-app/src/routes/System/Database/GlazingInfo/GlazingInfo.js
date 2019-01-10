import React from 'react';

import {
    Input,
    HeadedContainer,
} from '../../../../components';

import ListWrapper3 from '../../../../components/ApolloListWrapper/ListWrapper3';

export default function GlazingInfo({
    queryStatus: {
        system: {
            nodeId: systemNID,
            id: systemId,
            defaultGlassBite,
            defaultGlassSize,
        },
        systemInfillSizes,
        allInfillSizes,
        systemInfillPocketTypes,
        allInfillPocketTypes,
        systemInfillPocketSizes,
        allInfillPocketSizes,
    },
    mutations: {
        updateSystem,
        createSystemInfillSize,
        deleteSystemInfillSize,
        createSystemInfillPocketType,
        deleteSystemInfillPocketType,
        createSystemInfillPocketSize,
        deleteSystemInfillPocketSize,
    },
}) {
    console.log(arguments);
    return (
        <HeadedContainer
            title="Glazing Info"
        >
            <Input
                label="Glass Bite"
                value={defaultGlassBite}
                onChange={({ target: { value } }) => updateSystem({
                    nodeId: systemNID,
                    defaultGlassBite: value,
                })}
            />
            <ListWrapper3
                label="Infill Material Sizes"
                items={systemInfillSizes.map(({
                    nodeId: systemInfillSizeNID,
                    infillSizeByInfillSize,
                }) => ({
                    systemInfillSizeNID,
                    ...infillSizeByInfillSize,
                }))}
                multiSelect={{
                    allItems: allInfillSizes
                }}
                mapPillProps={({ size }) => ({
                    title: `${size}"`
                })}
                onCreate={infillSize => createSystemInfillSize({
                    systemId,
                    infillSize: infillSize.size,
                    infillSizeByInfillSize: infillSize,
                })}
                
                onDelete={({ systemInfillSizeNID, ...infillSize }) => deleteSystemInfillSize({
                    nodeId: systemInfillSizeNID,
                    systemId,
                    infillSize: infillSize.size,
                    infillSizeByInfillSize: infillSize,
                })}
            />
            <Input
                label="Default Infill Material Size"
                select={{
                    options: systemInfillSizes
                        .map(({ infillSizeByInfillSize: { size } }) => ({
                            value: size,
                            label: size,
                        })),
                    value: {
                        label: defaultGlassSize,
                        value: defaultGlassSize,
                    },
                    onChange: ({ value }) => updateSystem({
                        nodeId: systemNID,
                        defaultGlassSize: value,
                    }),
                }}
            />
            <ListWrapper3
                label="Infill Pocket Types"
                items={systemInfillPocketTypes
                    .map(({
                        nodeId,
                        infillPocketTypeByInfillPocketTypeId
                    }) => ({
                        systemInfillPocketTypeNID: nodeId,
                        ...infillPocketTypeByInfillPocketTypeId,
                    }))}
                multiSelect={{
                    allItems: allInfillPocketTypes
                }}
                mapPillProps={({ type }) => ({
                    title: type,
                })}
                onCreate={infillPocketType => createSystemInfillPocketType({
                    systemId,
                    infillPocketTypeId: infillPocketType.id,
                    infillPocketTypeByInfillPocketTypeId: infillPocketType,
                })}
                onDelete={({ systemInfillPocketTypeNID, ...infillPocketType }) => deleteSystemInfillPocketType({
                    nodeId: systemInfillPocketTypeNID,
                    systemId,
                    infillPocketTypeId: infillPocketType.id,
                    infillPocketTypeByInfillPocketTypeId: infillPocketType,
                })}
            />
            <ListWrapper3
                label="Infill Pocket Sizes"
                items={systemInfillPocketSizes
                    .map(({
                        nodeId: systemInfillPocketSizeNID,
                        infillPocketSizeByInfillPocketSize,
                    }) => ({
                        systemInfillPocketSizeNID,
                        ...infillPocketSizeByInfillPocketSize
                    }))}
                multiSelect={{
                    allItems: allInfillPocketSizes
                }}
                mapPillProps={({ size }) => ({
                    title: `${size}"`
                })}
                onCreate={infillPocketSize => createSystemInfillPocketSize({
                    systemId,
                    infillPocketSize: infillPocketSize.size,
                    infillPocketSizeByInfillPocketSize: infillPocketSize,
                })}
                onDelete={({ systemInfillPocketSizeNID, ...infillPocketSize }) => deleteSystemInfillPocketSize({
                    nodeId: systemInfillPocketSizeNID,
                    infillPocketSize: infillPocketSize.size,
                    infillPocketSizeByInfillPocketSize: infillPocketSize,
                })}
            />
        </HeadedContainer>
    );
}
