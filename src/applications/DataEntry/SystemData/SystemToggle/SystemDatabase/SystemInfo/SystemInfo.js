import React from 'react';


import {
    Input,
    ListWrapper,
    TitleBar,
} from '../../../../../../components';
import ACTIONS from '../ducks/actions';

export default function SystemInfo({
    system: {
        id: systemId,
        name = "",
        depth = 0,
        defaultSightline = 0,
        shimSize = 0,
        _manufacturer: {
            id: manufacturerId,
            name: manufacturerName,
        } = {},
        _systemType: {
            id: systemTypeId,
            type: systemTypeName = "",
        } = {},
        _systemSystemTags = [],
    },
    queryStatus: {
        allSystemTypes = [],
        allSystemTags = [],
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
                    onChange: ({ value }) => !systemId && updateSystem(ACTIONS.UPDATE, { manufacturerId: value }),
                }}
            />
            <Input
                label="Name"
                value={name}
                onChange={({ target: { value } }) => updateSystem(ACTIONS.UPDATE, { name: value })}
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
                    onChange: ({ value }) => updateSystem(ACTIONS.UPDATE, { systemTypeId: value }),
                }}
            />
            <ListWrapper
                label="System Tags"
                identifier="id"
                items={_systemSystemTags.map(({ _systemTag }) => ({ ..._systemTag }))}
                mapPillProps={({ tag }) => ({
                    title: tag,
                })}
                onFinish={({ addedItems, deletedItems }) => updateSystem(ACTIONS.UPDATE_LIST, {
                    systemTagIds: {
                        addedItems: addedItems.map(({ id }) => id),
                        deletedItems: deletedItems.map(({ id }) => id),
                    },
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
                    onChange={({ target: { value } }) => updateSystem(ACTIONS.UPDATE, {
                        depth: +value,
                    })}
                />
                <Input
                    label="System Sightline"
                    type="number"
                    value={defaultSightline}
                    onChange={({ target: { value } }) => updateSystem(ACTIONS.UPDATE, {
                        defaultSightline: +value,
                    })}
                />
                <Input
                    label="Caulk Joint Size"
                    type="number"
                    value={shimSize}
                    onChange={({ target: { value } }) => updateSystem(ACTIONS.UPDATE, {
                        shimSize: +value,
                    })}
                />
            </div>
        </>
    );
}
