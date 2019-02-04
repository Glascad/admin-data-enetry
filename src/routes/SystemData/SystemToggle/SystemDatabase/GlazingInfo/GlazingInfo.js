import React from 'react';

import {
    Input,
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
            _systemInfillSizes = [],
            _systemInfillPocketTypes = [],
            _systemInfillPocketSizes = [],
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
                items={_systemInfillSizes.map(({
                    nodeId: systemInfillSizeNID,
                    _infillSize,
                }) => ({
                    systemInfillSizeNID,
                    ..._infillSize,
                }))}
                multiSelect={{
                    allItems: allInfillSizes
                }}
                mapPillProps={({ size }) => ({
                    title: `${size}"`
                })}
                onCreate={_infillSize => createSystemInfillSize({
                    systemId,
                    infillSize: _infillSize.size,
                    _infillSize,
                })}
                onDelete={({ systemInfillSizeNID, ..._infillSize }) => deleteSystemInfillSize({
                    nodeId: systemInfillSizeNID,
                    systemId,
                    infillSize: _infillSize.size,
                    _infillSize,
                })}
            />
            <Input
                label="Default Infill Material Size"
                select={{
                    options: _systemInfillSizes
                        .map(({ _infillSize: { size } }) => ({
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
                items={_systemInfillPocketTypes
                    .map(({
                        nodeId,
                        _infillPocketType
                    }) => ({
                        systemInfillPocketTypeNID: nodeId,
                        ..._infillPocketType,
                    }))}
                multiSelect={{
                    allItems: allInfillPocketTypes
                }}
                mapPillProps={({ type }) => ({
                    title: type,
                })}
                onCreate={_infillPocketType => createSystemInfillPocketType({
                    systemId,
                    infillPocketTypeId: _infillPocketType.id,
                    _infillPocketType,
                })}
                onDelete={({ systemInfillPocketTypeNID, ..._infillPocketType }) => deleteSystemInfillPocketType({
                    nodeId: systemInfillPocketTypeNID,
                    systemId,
                    infillPocketTypeId: _infillPocketType.id,
                    _infillPocketType,
                })}
            />
            <ListWrapper
                label="Infill Pocket Sizes"
                items={_systemInfillPocketSizes
                    .map(({
                        nodeId: systemInfillPocketSizeNID,
                        _infillPocketSize,
                    }) => ({
                        systemInfillPocketSizeNID,
                        ..._infillPocketSize
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
