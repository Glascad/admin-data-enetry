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
            _manufacturer: {
                name: manufacturerName = "",
            } = {},
            systemTypeId,
            _systemType: {
                type: systemTypeName = "",
            } = {},
            _systemSystemTags = [],
        } = {},
        // allSystems,
        allManufacturers = [],
        allSystemTypes = [],
        allSystemTags = [],
    },
    mutations: {
        createnewsystem,
        createnewsystemStatus: {
            data: {
                createnewsystem: {
                    systems: {
                        nodeId: createdSystemNID,
                    } = {}
                } = {}
            } = {}
        } = {},
    },
    batcher: {
        completeMutations,
        resetMutations,
    },
}) {
    if (createdSystemNID) {
        return (
            <Redirect
                to={`/system-data/info/database?systemNID=${createdSystemNID}`}
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
                    onChange={({ target: { value } }) => createnewsystem({
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
                        onChange: ({ value, label }) => createnewsystem({
                            nodeId: systemNID,
                            manufacturerid: value,
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
                        onChange: ({ value, label }) => createnewsystem({
                            nodeId: systemNID,
                            systemtypeId: value,
                            systemType: {
                                type: label
                            }
                        }),
                    }}
                />
                <div className="unfinished">
                    <ListWrapper
                        label="System Tags"
                        items={_systemSystemTags.map(({
                            nodeId: systemSystemTagNID,
                            systemTag,
                        }) => ({
                            systemSystemTagNID,
                            ...systemTag,
                        }))}
                        mapPillProps={({ tag }) => ({
                            title: tag,
                        })}
                        onCreate={({ id }) => createnewsystem({
                            nodeId: systemNID,
                            systemtags: _systemSystemTags
                                .map(({ systemTagId }) => systemTagId)
                                .concat(id),
                        })}
                        onDelete={({ id }) => createnewsystem({
                            nodeId: systemNID,
                            systemtags: _systemSystemTags
                                .map(({ systemTagId }) => systemTagId)
                                .fill(stid => stid !== id),
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
                        onChange={({ target: { value } }) => createnewsystem({
                            nodeId: systemNID,
                            depth: value
                        })}
                    />
                    <Input
                        label="System Sightline"
                        type="number"
                        value={defaultSightline}
                        onChange={({ target: { value } }) => createnewsystem({
                            nodeId: systemNID,
                            defaultSightline: value,
                        })}
                    />
                    <Input
                        label="Caulk Joint Size"
                        type="number"
                        value={shimSize}
                        onChange={({ target: { value } }) => createnewsystem({
                            nodeId: systemNID,
                            shimSize: value,
                        })}
                    />
                </div>
                <div className="bottom-buttons">
                    <Link
                        to="/system-data"
                        onClick={resetMutations}
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
