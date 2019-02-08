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
        updateEntireSystem,
    },
}) {
    console.log(arguments[0]);
    return (
        <>
            <TitleBar
                title="Glazing Info"
            />
            <Input
                label="Glass Bite"
                type="number"
                value={defaultGlassBite}
                onChange={({ target: { value } }) => updateEntireSystem({
                    id: systemId,
                    nodeId: systemNID,
                    defaultGlassBite: value,
                })}
            />
            <ListWrapper
                label="Infill Material Sizes"
                items={_systemInfillSizes.map(sis => ({ ...sis, size: sis.infillSize }))}
                identifier="size"
                mapPillProps={({ size }) => ({
                    title: `${size}"`,
                })}
                multiSelect={{
                    allItems: allInfillSizes,
                }}
                onFinish={({ addedItems, deletedItems }) => updateEntireSystem({
                    id: systemId,
                    nodeId: systemNID,
                    newInfillSizes: addedItems.map(({ size }) => size),
                    oldInfillSizes: deletedItems.map(({ size }) => size),
                })}
            />
            <Input
                label="Default Infill Material Size"
                select={{
                    options: _systemInfillSizes
                        .map(({ size }) => ({
                            value: size,
                            label: size,
                        })),
                    value: {
                        label: defaultGlassSize,
                        value: defaultGlassSize,
                    },
                    onChange: ({ value }) => updateEntireSystem({
                        nodeId: systemNID,
                        defaultGlassSize: value,
                    }),
                }}
            />
            <ListWrapper
                label="Infill Pocket Types"
                items={_systemInfillPocketTypes.map(({ _infillPocketType }) => ({ ..._infillPocketType }))}
                identifier="id"
                multiSelect={{
                    allItems: allInfillPocketTypes
                }}
                mapPillProps={({ type }) => ({
                    title: type,
                })}
                onFinish={({ addedItems, deletedItems }) => updateEntireSystem({
                    id: systemId,
                    nodeId: systemNID,
                    newInfillPocketTypeIds: addedItems.map(({ id }) => id),
                    oldInfillPocketTypeIds: deletedItems.map(({ id }) => id),
                })}
            />
            <ListWrapper
                label="Infill Pocket Sizes"
                items={_systemInfillPocketSizes.map(sips => ({ ...sips, size: sips.infillPocketSize }))}
                identifier="size"
                multiSelect={{
                    allItems: allInfillPocketSizes
                }}
                mapPillProps={({ size }) => ({
                    title: `${size}"`
                })}
                onFinish={({ addedItems, deletedItems }) => updateEntireSystem({
                    id: systemId,
                    nodeId: systemNID,
                    newInfillPocketSizes: addedItems.map(({ size }) => size),
                    oldInfillPocketSizes: deletedItems.map(({ size }) => size),
                })}
            />
        </>
    );
}
