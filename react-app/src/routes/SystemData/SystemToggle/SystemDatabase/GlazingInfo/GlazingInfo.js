import React from 'react';

import {
    Input,
    HeadedContainer,
    ListWrapper,
} from '../../../../../components';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';

export default function GlazingInfo({
    queryStatus: {
        system: {
            nodeId: systemNID,
            id: systemId,
            defaultGlassBite = 0,
            defaultGlassSize = 0,
            systemInfillSizes = [],
            systemInfillPocketTypes = [],
            systemInfillPocketSizes = [],
        } = {},
        allInfillSizes = [],
        allInfillPocketTypes = [],
        allInfillPocketSizes = [],
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
    return (
        <>
            <TitleBar
                title="Glazing Info"
            />
            <Input
                label="Glass Bite"
                type="number"
                value={defaultGlassBite}
                onChange={({ target: { value } }) => updateSystem({
                    nodeId: systemNID,
                    defaultGlassBite: value,
                })}
            />
            <ListWrapper
                label="Infill Material Sizes"
                items={systemInfillSizes.map(({
                    nodeId: systemInfillSizeNID,
                    infillSize,
                }) => ({
                    systemInfillSizeNID,
                    ...infillSize,
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
                    infillSize: infillSize,
                })}

                onDelete={({ systemInfillSizeNID, ...infillSize }) => deleteSystemInfillSize({
                    nodeId: systemInfillSizeNID,
                    systemId,
                    infillSize: infillSize.size,
                    infillSize: infillSize,
                })}
            />
            <Input
                label="Default Infill Material Size"
                select={{
                    options: systemInfillSizes
                        .map(({ infillSize: { size } }) => ({
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
            <ListWrapper
                label="Infill Pocket Types"
                items={systemInfillPocketTypes
                    .map(({
                        nodeId,
                        infillPocketType
                    }) => ({
                        systemInfillPocketTypeNID: nodeId,
                        ...infillPocketType,
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
                    infillPocketType,
                })}
                onDelete={({ systemInfillPocketTypeNID, ...infillPocketType }) => deleteSystemInfillPocketType({
                    nodeId: systemInfillPocketTypeNID,
                    systemId,
                    infillPocketTypeId: infillPocketType.id,
                    infillPocketType,
                })}
            />
            <ListWrapper
                label="Infill Pocket Sizes"
                items={systemInfillPocketSizes
                    .map(({
                        nodeId: systemInfillPocketSizeNID,
                        infillPocketSize,
                    }) => ({
                        systemInfillPocketSizeNID,
                        ...infillPocketSize
                    }))}
                multiSelect={{
                    allItems: allInfillPocketSizes
                }}
                mapPillProps={({ size }) => ({
                    title: `${size}"`
                })}
                onCreate={({ size }) => createSystemInfillPocketSize({
                    systemId,
                    infillPocketSize: size,
                })}
                onDelete={({ systemInfillPocketSizeNID, size }) => deleteSystemInfillPocketSize({
                    nodeId: systemInfillPocketSizeNID,
                    infillPocketSize: size,
                })}
            />
        </>
    );
}
