import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';

import gql from 'graphql-tag';

import F from '../../../../../../schemas';

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
    ConfirmButton,
    useInitialState,
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

import AddHorizontals from './AddHorizontals';

const areEqual = (json, input) => {
    return _.isEqual({
        ...JSON.parse(json),
        name: undefined,
    }, {
            ...input,
            name: undefined,
        });
}

const allSystemsQuery = { query: gql`{ ...AllSystems } ${F.SYS.ALL_SYSTEMS}` };

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
        ${F.PRJ.ENTIRE_PROJECT}
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
    defaultElevation = null,
}) {

    const [runSaveDefault, saveDefaultResult, savingDefault] = useMutation(saveDefaultMutation);

    const initialElevationInput = JSON.parse(defaultElevation) || defaultElevationInput;

    const initalState = {
        elevation: initialElevationInput,
        system: {
            id: -1,
            name: "",
        },
    };

    const [initialHorizontalRoughOpening, setInitialHorizontalRoughOpening] = useInitialState(initialElevationInput.horizontalRoughOpening);
    const [initialVerticalRoughOpening, setInitialVerticalRoughOpening] = useInitialState(initialElevationInput.verticalRoughOpening);
    const [initialFinishedFloorHeight, setInitialFinishedFloorHeight] = useInitialState(initialElevationInput.finishedFloorHeight);

    // console.log(
    //     initialElevationInput.horizontalRoughOpening,
    //     initialElevationInput.verticalRoughOpening,
    //     initialElevationInput.finishedFloorHeight,
    // );

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
    } = useUndoRedo(initalState, [defaultElevation]);;

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
        try {
            const result = await runSaveDefault({
                id: +parseSearch(search).projectId,
                defaultElevation: JSON.stringify({
                    ...elevationInput,
                    name: undefined,
                }),
            });
        } catch (err) {
            console.error(`Error saving default elevation`);
            console.error(err);
        }
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

            // console.log({ elevationId });

            history.push(`${
                path.replace(/create/, 'build')
                }${
                parseSearch(search).update({ elevationId })
                }`);
        } catch (err) {
            console.error(`Error saving elevation`);
            console.error(err);
        }
    }, [mergedElevation]);

    // console.log("this is the CREATE elevation page");

    const cancelModalProps = {
        titleBar: {
            title: "Discard Elevation",
        },
        children: (
            <>
                <div>
                    You have unfinished changes.
                </div>
                <div>
                    Are you sure you want to discard your changes and leave this page ?
                </div>
            </>
        ),
        cancel: {
            text: "Stay",
        },
        finish: {
            className: "danger",
            text: "Leave",
        },
    };

    const doNotConfirm = areEqual(defaultElevation, elevationInput);

    return (
        <>
            <TitleBar
                // data-cy="new-elevation"
                title="New Elevation"
                selections={[name]}
                right={(
                    <>
                        <ConfirmButton
                            modalProps={cancelModalProps}
                            onClick={() => history.push(`${
                                path.replace(/\/elevation\/create-elevation/, '')
                                }${
                                search
                                }`)}
                            doNotConfirmWhen={doNotConfirm}
                        >
                            Cancel
                        </ConfirmButton>
                        <AsyncButton
                            data-cy="create"
                            className={`action ${name && startingBayQuantity ? '' : 'disabled'}`}
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
                    data-cy="elevation-id"
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
                            data-cy="rough-opening-width"
                            label="Width"
                            type="inches"
                            min={10}
                            initialValue={initialHorizontalRoughOpening}
                            onChange={horizontalRoughOpening => updateElevation({
                                horizontalRoughOpening: Math.max(
                                    +horizontalRoughOpening,
                                    10,
                                    startingBayQuantity * 5 + (
                                        startingBayQuantity + (
                                            1 * recursiveElevation.sightline
                                        )
                                    )
                                )
                            })}
                            onBlur={() => setInitialHorizontalRoughOpening(horizontalRoughOpening)}
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
                            data-cy="rough-opening-height"
                            label="Height"
                            type="inches"
                            min={10}
                            initialValue={initialVerticalRoughOpening}
                            onChange={verticalRoughOpening => updateElevation({
                                verticalRoughOpening: Math.max(
                                    +verticalRoughOpening,
                                    // 10,
                                    horizontals
                                        .reduce((sum, { distance }) => (
                                            sum
                                            +
                                            distance
                                            +
                                            recursiveElevation.sightline
                                        ), (
                                                recursiveElevation.sightline
                                                *
                                                2
                                                +
                                                5
                                            ))
                                    // horizontals.length * 5 + (
                                    //     horizontals.length + (
                                    //         1 * recursiveElevation.sightline
                                    //     )
                                    // )
                                ),
                            })}
                            onBlur={() => setInitialVerticalRoughOpening(verticalRoughOpening)}
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
                    data-cy="starting-bay"
                    label="Starting bay quantity"
                    type="number"
                    min={1}
                    max={100}
                    value={startingBayQuantity || ''}
                    onChange={({ target: { value } }) => updateElevation({
                        startingBayQuantity: Math.round(Math.min(
                            +value,
                            (
                                horizontalRoughOpening - recursiveElevation.sightline
                            ) / (
                                5 + recursiveElevation.sightline
                            )
                        )),
                    })}
                />
                <Input
                    data-cy="curb-height"
                    label="Curb Height"
                    type="inches"
                    min={0}
                    initialValue={initialFinishedFloorHeight}
                    onChange={finishedFloorHeight => updateElevation({ finishedFloorHeight })}
                    onBlur={setInitialFinishedFloorHeight}
                />
                <AddHorizontals
                    horizontals={horizontals}
                    measureFromOptions={measureFromOptions}
                    measureToOptions={measureToOptions}
                    updateElevation={updateElevation}
                    recursiveElevation={recursiveElevation}
                    verticalRoughOpening={verticalRoughOpening}
                />
                {/* <ElevationPreview
                    elevation={recursiveElevation}
                /> */}
                <GroupingBox
                    title="Preview"
                >
                    <ElevationPreview
                        data-cy="preview"
                        elevation={recursiveElevation}
                    />
                </GroupingBox>
                <div className="bottom-buttons">
                    <ConfirmButton
                        data-cy="cancel-button"
                        modalProps={cancelModalProps}
                        onClick={() => history.push(`${
                            path.replace(/\/elevation\/create-elevation/, '')
                            }${
                            search
                            }`)}
                        doNotConfirmWhen={doNotConfirm}
                    >
                        Cancel
                    </ConfirmButton>
                    <div className="buttons-right">
                        <AsyncButton
                            data-cy="save-as-default-button"
                            className={`action ${doNotConfirm ?
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
                            data-cy="create-button"
                            className={`action ${name && startingBayQuantity ? '' : 'disabled'}`}
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
