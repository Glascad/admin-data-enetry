import React from 'react';

import {
    Link,
    Redirect,
} from 'react-router-dom';

import {
    HeadedContainer,
    Input,
    // ListWrapper,
} from '../../../../components';

export default function CreateSystem({
    routerProps: {
        history,
    },
    queryStatus: {
        system: {
            nodeId: systemNID,
            id: systemId,
            name,
            depth,
            defaultSightline,
            shimSize,
            manufacturerId,
            manufacturerByManufacturerId: {
                name: manufacturerName,
            } = {},
            systemTypeId,
            systemTypeBySystemTypeId: {
                type: systemTypeName,
            } = {},
        } = {},
        // allSystems,
        // systemSystemTags,
        allManufacturers,
        allSystemTypes,
        // allSystemTags,
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
        // createSystemSystemTag,
        // deleteSystemSystemTag,
    },
    batcher: {
        completeMutations
    },
}) {
    console.log(arguments);
    if (createdSystemNID) {
        return (
            <Redirect
                to={`/system-data/database?systemNID=${createdSystemNID}`}
            />
        )
    } else {
        return (
            <HeadedContainer
                title="New System"
                className="input-wrapper"
            >
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
                            manufacturerByManufacturerId: {
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
                            systemTypeBySystemTypeId: {
                                type: label
                            }
                        }),
                    }}
                />
                {/* <ListWrapper
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
                />*/}
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
                            className="primary"
                            onClick={completeMutations}
                        >
                            Create
                    </button>
                    </div>
                </div>
            </HeadedContainer>
        );
    }
}
