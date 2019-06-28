import React, { memo, useCallback, useMemo } from 'react';

import gql from 'graphql-tag';

import F from '../../../../../../schema';

import _ from 'lodash';

import { Link } from 'react-router-dom';

import {
    TitleBar,
    Input,
    GroupingBox,
    CircleButton,
    useUndoRedo,
    useQuery,
    AsyncButton,
    useMutation,
} from '../../../../../../components';

import ElevationPreview from '../../ElevationPreview/ElevationPreview';

import renderPreview from '../../ElevationPreview/render-preview';

import RecursiveElevation from '../utils/recursive-elevation/elevation';

import generateElevation from './generate-elevation';

import { parseSearch, ImperialValue } from '../../../../../../utils';

import './CreateElevation.scss';

import {
    measureFromOptions,
    measureToOptions,
    defaultHorizontal,
    defaultElevationInput,
} from './elevation-input';

const areEqual = (json, input) => {
    return _.isEqual({
        ...JSON.parse(json),
        name: undefined,
    }, {
            ...input,
            name: undefined,
        });
}

const allSystemsQuery = { query: gql`{ ...AllSystems } ${F.SYS_DATA.ALL_SYSTEMS}` };

const saveDefaultMutation = {
    mutation: gql`
        mutation UpdateProject($id: Int!, $defaultElevation: JSON!) {
            updateProjectById(
                input: {
                    id: $id
                    projectPatch: {
                        defaultElevation: $defaultElevation
                    }
                }
            ) {
                project {
                    ...EntireProject
                }
            }
        }
        ${F.PR_DATA.ENTIRE_PROJECT}
    `,
};

export default memo(function CreateElevation({
    history,
    location: {
        search,
    },
    match: {
        path,
    },
    updateEntireElevation,
    updating: creating,
    defaultElevation = JSON.stringify(defaultElevationInput),
}) {

    const [runSaveDefault, saveDefaultResult, savingDefault] = useMutation(saveDefaultMutation);

    const initalState = {
        elevation: JSON.parse(defaultElevation),
        system: {
            id: -1,
            name: "",
        },
    };

    const undoRedo = useUndoRedo(initalState, [defaultElevation]);

    const {
        currentState,
        currentState: {
            elevation: elevationInput,
            elevation: {
                name,
                verticalLock,
                horizontalLock,
                verticalRoughOpening,
                horizontalRoughOpening,
                verticalMasonryOpening,
                horizontalMasonryOpening,
                startingBayQuantity,
                finishedFloorHeight,
                horizontals,
            },
            system: {
                id: systemId,
                name: systemName,
            },
        },
        pushState,
    } = undoRedo;

    const updateElevation = update => pushState(({ elevation }) => ({
        elevation: {
            ...elevation,
            ...update,
        },
    }));

    const mergedElevation = useMemo(() => generateElevation(elevationInput), [elevationInput]);

    const recursiveElevation = useMemo(() => new RecursiveElevation(mergedElevation), [mergedElevation]);

    const [fetchAllSystems, { allSystems = [] }] = useQuery(allSystemsQuery);

    const { projectId } = parseSearch(search);

    const saveDefault = async () => {
        const result = await runSaveDefault({
            id: +parseSearch(search).projectId,
            defaultElevation: JSON.stringify({
                ...elevationInput,
                name: undefined,
            }),
        });
    }

    const save = useCallback(async () => {

        const {
            _elevationContainers,
            _containerDetails,
            ...createdElevation
        } = mergedElevation;

        const elevation = {
            projectId: +projectId,
            name,
            containers: _elevationContainers.map(({
                bay,
                row,
                id,
                ...container
            }) => ({
                ...container,
                fakeId: id,
            })),
            details: _containerDetails.map(({
                id,
                firstContainerId,
                secondContainerId,
                ...detail
            }) => ({
                ...detail,
                firstContainerFakeId: firstContainerId,
                secondContainerFakeId: secondContainerId,
            })),
            ...createdElevation,
            preview: renderPreview(recursiveElevation),
        };

        try {
            const {
                updateEntireElevation: {
                    elevation: [
                        {
                            id: elevationId,
                        },
                    ],
                },
            } = await updateEntireElevation({ elevation });

            history.push(`${
                path.replace(/create/, 'build')
                }${
                parseSearch(search).update({ elevationId })
                }`);
        } catch (err) {
            console.error(err);
        }
    }, [mergedElevation]);

    console.log("this is the CREATE elevation page");

    return (
        <>
            <TitleBar
                title="New Elevation"
                selections={[name]}
                right={(
                    <>
                        <Link
                            to={`${
                                path.replace(/\/elevation\/create-elevation/, '')
                                }${
                                search
                                }`}
                        >
                            <button>
                                Cancel
                            </button>
                        </Link>
                        <AsyncButton
                            className={`action ${name ? '' : 'disabled'}`}
                            onClick={save}
                            loading={creating}
                            loadingText="Creating"
                        >
                            Create
                        </AsyncButton>
                    </>
                )}
            />
            <div
                id="CreateElevation"
                className="card"
            >
                <Input
                    label="Elevation ID"
                    autoFocus={true}
                    value={name}
                    onChange={({ target: { value } }) => updateElevation({
                        name: value,
                    })}
                />
                <Input
                    label="System set"
                    disabled={true}
                    select={{
                        value: {
                            label: systemName,
                            value: systemId,
                        },
                        options: allSystems.map(({ id, name }) => ({
                            label: name,
                            value: id,
                        })),
                        onChange: ({ value }) => this.setState({
                            system: allSystems.find(({ id }) => id === value),
                        }),
                    }}
                />
                <GroupingBox
                    title="Rough opening"
                >
                    <div className="input-group">
                        <Input
                            label="Width"
                            type="inches"
                            min={0}
                            initialValue={horizontalRoughOpening}
                            onChange={horizontalRoughOpening => updateElevation({ horizontalRoughOpening })}
                        />
                        <Input
                            label="Masonry opening"
                            disabled={true}
                            type="switch"
                            readOnly={true}
                            checked={horizontalMasonryOpening}
                        />
                    </div>
                    <div className="input-group">
                        <Input
                            label="Height"
                            type="inches"
                            min={0}
                            initialValue={verticalRoughOpening}
                            onChange={verticalRoughOpening => updateElevation({ verticalRoughOpening })}
                        />
                        <Input
                            label="Masonry opening"
                            disabled={true}
                            type="switch"
                            readOnly={true}
                            checked={verticalMasonryOpening}
                        />
                    </div>
                </GroupingBox>
                <Input
                    label="Starting bay quantity"
                    type="number"
                    min={1}
                    max={100}
                    value={startingBayQuantity || ''}
                    onChange={({ target: { value } }) => updateElevation({
                        startingBayQuantity: Math.min(+value, 100),
                    })}
                />
                <Input
                    label="Curb Height"
                    type="inches"
                    min={0}
                    initialValue={finishedFloorHeight}
                    onChange={finishedFloorHeight => updateElevation({ finishedFloorHeight })}
                />
                <GroupingBox
                    title="Horizontals"
                    circleButton={{
                        actionType: "add",
                        className: "action",
                        onClick: () => {
                            const lastHorizontal = horizontals[horizontals.length - 1] || defaultHorizontal;

                            const {
                                distance: {
                                    value,
                                },
                            } = lastHorizontal;

                            var { originalContainer: topContainer } = recursiveElevation;

                            while (topContainer.topContainers.length) {
                                topContainer = topContainer.topContainers[0];
                            }

                            if (topContainer.daylightOpening.y > value + recursiveElevation.sightline) {
                                updateElevation({
                                    horizontals: horizontals.concat(lastHorizontal),
                                });
                            }
                        },
                    }}
                >
                    {horizontals.length ?
                        horizontals.map(({
                            distance,
                            from,
                            to,
                        }, i) => (
                                <div
                                    id="add-horizontals"
                                    className="input-group"
                                    key={i}
                                >
                                    <Input
                                        label="Measure from"
                                        disabled={true}
                                        select={{
                                            value: {
                                                value: from,
                                                label: from,
                                            },
                                            options: measureFromOptions,
                                            onChange: ({ value }) => updateElevation({
                                                horizontals: horizontals.replace(i, {
                                                    distance,
                                                    from: value,
                                                    to,
                                                }),
                                            }),
                                        }}
                                    />
                                    <Input
                                        label="Measure to"
                                        disabled={true}
                                        select={{
                                            value: {
                                                value: to,
                                                label: to,
                                            },
                                            options: measureToOptions,
                                            onChange: ({ value }) => updateElevation({
                                                horizontals: horizontals.replace(i, {
                                                    distance,
                                                    from,
                                                    to: value,
                                                }),
                                            }),
                                        }}
                                    />
                                    <Input
                                        label="Distance"
                                        type="inches"
                                        min={0}
                                        initialValue={distance}
                                        onChange={distance => updateElevation({
                                            horizontals: horizontals.replace(i, {
                                                distance,
                                                from,
                                                to,
                                            }),
                                        })}
                                    />
                                    <CircleButton
                                        actionType="delete"
                                        className="danger"
                                        onClick={() => updateElevation({
                                            horizontals: horizontals.filter((_, j) => j !== i),
                                        })}
                                    >
                                        Delete
                                    </CircleButton>
                                </div>
                            )) : (
                            <div>
                                No Horizontals
                            </div>
                        )}
                </GroupingBox>
                {/* <ElevationPreview
                    elevation={recursiveElevation}
                /> */}
                <GroupingBox
                    title="Preview"
                >
                    <ElevationPreview
                        preview={renderPreview(recursiveElevation)}
                    />
                </GroupingBox>
                <div className="bottom-buttons">
                    <Link
                        to={`${
                            path.replace(/\/elevation\/create-elevation/, '')
                            }${
                            search
                            }`}
                    >
                        <button>
                            Cancel
                        </button>
                    </Link>
                    <div className="buttons-right">
                        <AsyncButton
                            className={`action ${areEqual(defaultElevation, elevationInput) ?
                                'disabled'
                                :
                                ''
                                }`}
                            onClick={saveDefault}
                            loading={savingDefault}
                            loadingText="Saving"
                        >
                            Save As Default
                        </AsyncButton>
                        <AsyncButton
                            className={`action ${name ? '' : 'disabled'}`}
                            onClick={save}
                            loading={creating}
                            loadingText="Creating"
                        >
                            Create
                        </AsyncButton>
                    </div>
                </div>
            </div>
        </>
    );
});
