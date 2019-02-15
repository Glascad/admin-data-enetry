import React from 'react';

import {
    Input,
    ListWrapper,
} from '../../../../../components';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';
import { UPDATE_SYSTEM, UPDATE_SYSTEM_LIST } from '../system-manager/system-actions';

export default function GlazingInfo({
    system: {
        nodeId: systemNID,
        id: systemId,
        defaultGlassBite = 0,
        defaultGlassSize = 0,
        _systemInfillSizes = [],
        _systemInfillPocketTypes = [],
        _systemInfillPocketSizes = [],
    } = {},
    queryStatus: {
        allInfillSizes = [],
        allInfillPocketTypes = [],
        allInfillPocketSizes = [],
    },
    updateSystem,
}) {
    console.log(arguments[0]);
    console.log(_systemInfillPocketTypes.map(({ _infillPocketType }) => ({ ..._infillPocketType })));
    return (
        <>
            <TitleBar
                title="Glazing Info"
            />
            <Input
                label="Glass Bite"
                type="number"
                value={defaultGlassBite}
                onChange={({ target: { value } }) => updateSystem(UPDATE_SYSTEM, {
                    defaultGlassBite: +value,
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
                onFinish={({ addedItems, deletedItems }) => updateSystem(UPDATE_SYSTEM_LIST, {
                    infillSizes: {
                        addedItems: addedItems.map(({ size }) => size),
                        deletedItems: deletedItems.map(({ size }) => size),
                    },
                })}
            />
            <Input
                label="Default Infill Material Size"
                select={{
                    options: _systemInfillSizes
                        .map(({ infillSize }) => ({
                            value: infillSize,
                            label: infillSize,
                        })),
                    value: {
                        label: defaultGlassSize,
                        value: defaultGlassSize,
                    },
                    onChange: ({ value }) => updateSystem(UPDATE_SYSTEM, {
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
                onFinish={({ addedItems, deletedItems }) => updateSystem(UPDATE_SYSTEM_LIST, {
                    infillPocketTypeIds: {
                        addedItems: addedItems.map(({ id }) => id),
                        deletedItems: deletedItems.map(({ id }) => id),
                    },
                })}
            />
            <ListWrapper
                label="Infill Pocket Sizes"
                items={_systemInfillPocketSizes.map(sips => ({ ...sips, size: sips.infillPocketSize }))}
                identifier="size"
                multiSelect={{
                    allItems: allInfillPocketSizes,
                }}
                mapPillProps={({ size }) => ({
                    title: `${size}"`,
                })}
                onFinish={({ addedItems, deletedItems }) => updateSystem(UPDATE_SYSTEM_LIST, {
                    infillPocketSizes: {
                        addedItems: addedItems.map(({ size }) => +size),
                        deletedItems: deletedItems.map(({ size }) => +size),
                    },
                })}
            />
        </>
    );
}
