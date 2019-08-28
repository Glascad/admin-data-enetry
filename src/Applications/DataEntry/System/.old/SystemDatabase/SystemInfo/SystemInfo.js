import React from 'react';

import {
    Input,
    ListWrapper,
    TitleBar,
} from '../../../../../../components';

import { UPDATE_KEYS } from '../ducks/actions';

export default function SystemInfo({
    system: {
        id: systemId,
        name = "",
        // depth = 0,
        // defaultSightline = 0,
        // shimSize = 0,
        _manufacturer: {
            id: manufacturerId,
            name: manufacturerName,
        } = {},
        systemType,
        // _systemType: {
        //     id: systemType,
        //     type: systemTypeName = "",
        // } = {},
        // _systemSystemTags = [],
    },
    queryStatus: {
        allSystemTypes = [],
        // allSystemTags = [],
        allManufacturers = [],
    },
    updateSystem,
}) {
    return (
        <>
            <TitleBar
                title="System Info"
            />
            <Input
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
                    // can only update manufacturer of new system
                    onChange: ({ value }) => !systemId && updateSystem(UPDATE_KEYS, { manufacturerId: value }),
                }}
            />
            <Input
                label="Name"
                value={name}
                onChange={({ target: { value } }) => updateSystem(UPDATE_KEYS, { name: value })}
            />
            <Input
                label="System Type"
                select={{
                    value: {
                        value: systemType,
                        label: systemType,
                    },
                    options: allSystemTypes.map(({ type }) => ({
                        value: type,
                        label: type,
                    })),
                    onChange: ({ value }) => updateSystem(UPDATE_KEYS, { systemType: value }),
                }}
            />
            {/* <ListWrapper
                label="System Tags"
                identifier="id"
                items={_systemSystemTags.map(({ _systemTag }) => ({ ..._systemTag }))}
                mapPillProps={({ tag }) => ({
                    title: tag,
                })}
                onFinish={({ addedItems, deletedItems }) => updateSystem(UPDATE_LIST, {
                    systemTagIds: {
                        addedItems: addedItems.map(({ id }) => id),
                        deletedItems: deletedItems.map(({ id }) => id),
                    },
                })}
                multiSelect={{
                    allItems: allSystemTags,
                }}
            /> */}
            {/* <div className="input-group">
                <Input
                    label="System Depth"
                    type="number"
                    value={depth}
                    onChange={({ target: { value } }) => updateSystem(UPDATE_KEYS, {
                        depth: +value,
                    })}
                />
                <Input
                    label="System Sightline"
                    type="number"
                    value={defaultSightline}
                    onChange={({ target: { value } }) => updateSystem(UPDATE_KEYS, {
                        defaultSightline: +value,
                    })}
                />
                <Input
                    label="Caulk Joint Size"
                    type="number"
                    value={shimSize}
                    onChange={({ target: { value } }) => updateSystem(UPDATE_KEYS, {
                        shimSize: +value,
                    })}
                />
            </div> */}
        </>
    );
}
