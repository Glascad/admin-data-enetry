import React from 'react';

import {
    Link,
    Redirect,
} from 'react-router-dom';

import {
    TitleBar,
    Input,
    ListWrapper,
} from '../../../../components';

export default function CreateSystem({
    queryStatus: {
        system: {
            nodeId: systemNID,
            id: systemId,
            name = "",
            depth = 0,
            defaultSightline = 0,
            shimSize = 0,
            manufacturerId,
            manufacturer: {
                name: manufacturerName = "",
            } = {},
            systemTypeId,
            systemType: {
                type: systemTypeName = "",
            } = {},
            systemSystemTags = [],
        } = {},
        // allSystems,
        allManufacturers = [],
        allSystemTypes = [],
        allSystemTags = [],
    },
    mutations: {
        createSystem,
        createSystemStatus: {
            data: {
                createSystem: {
                    system: {
                        nodeId: createdSystemNID,
                    } = {}
                } = {}
            } = {}
        } = {},
        createSystemSystemTag,
        deleteSystemSystemTag,
    },
    batcher: {
        completeMutations
    },
}) {
    if (createdSystemNID) {
        return (
            <Redirect
                to={`/system-data/database?systemNID=${createdSystemNID}`}
            />
        )
    } else {
        return (
            <>
                <TitleBar
                    title="New System"
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
                        onChange: ({ value, label }) => createSystem({
                            nodeId: systemNID,
                            manufacturerId: value,
                            manufacturer: {
                                name: label,
                            }
                        }),
                    }}
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
                        onChange: ({ value, label }) => createSystem({
                            nodeId: systemNID,
                            systemTypeId: value,
                            systemType: {
                                type: label
                            }
                        }),
                    }}
                />
                <div className="unfinished">
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
                </div>
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
                    <Input
                        label="Caulk Joint Size"
                        type="number"
                        value={shimSize}
                        onChange={({ target: { value } }) => createSystem({
                            nodeId: systemNID,
                            shimSize: value,
                        })}
                    />
                </div>
                <div className="bottom-buttons">
                    <Link
                        to="/system-data"
                    >
                        <button
                            className="empty"
                        >
                            Cancel
                        </button>
                    </Link>
                    <div>
                        <button
                            className="action"
                            onClick={completeMutations}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
