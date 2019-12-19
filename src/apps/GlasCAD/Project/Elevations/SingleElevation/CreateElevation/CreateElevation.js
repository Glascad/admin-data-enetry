import gql from 'graphql-tag';
import _ from 'lodash';
import React, { memo, useCallback, useMemo } from 'react';
import { GroupingBox, Input, useInitialState, useMutation, useRedoableState } from '../../../../../../components';
import F from '../../../../../../schemas';
import { parseSearch } from '../../../../../../utils';
import ElevationPreview from '../../ElevationPreview/ElevationPreview';
import renderPreview from '../../ElevationPreview/render-preview';
import RecursiveElevation from '../utils/recursive-elevation/elevation';
import { defaultElevationInput, measureFromOptions, measureToOptions } from './utils/elevation-input';
import generateElevation from './utils/generate-elevation';
import AddHorizontals from './CreateElevationView/AddHorizontals/AddHorizontals';
import ElevationId from './CreateElevationView/ElevationId/ElevationId';
import { Footer, Header } from './CreateElevationView/Header&Footer/Header&Footer';
import RoughOpening from './CreateElevationView/RoughOpening/RoughOpening';

const areEqual = (json, input) => _.isEqual({
    ...JSON.parse(json),
    name: undefined,
}, {
    ...input,
    name: undefined,
});

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
    project: {
        _systemSets = [],
    } = {},
    defaultElevation = null,
}) {

    console.log(arguments[0]);

    const [runSaveDefault, saveDefaultResult, savingDefault] = useMutation(saveDefaultMutation);

    const initialElevationInput = JSON.parse(defaultElevation) || defaultElevationInput;

    const [initialFinishedFloorHeight, setInitialFinishedFloorHeight] = useInitialState(initialElevationInput.finishedFloorHeight);

    const {
        currentState: elevationInput,
        currentState: {
            systemSetId,
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
        pushState,
    } = useRedoableState(initialElevationInput, [defaultElevation]);;

    const updateElevation = update => pushState(({ elevation }) => ({
        ...elevation,
        ...update,
    }));

    const mergedElevation = useMemo(() => generateElevation(elevationInput), [elevationInput]);

    const recursiveElevation = useMemo(() => new RecursiveElevation(mergedElevation), [mergedElevation]);

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
            console.log({ result });
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
            systemSetId,
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

    const doNotConfirm = areEqual(defaultElevation, elevationInput);

    return (
        <>
            <Header
                {...{
                    elevationInput,
                    doNotConfirm,
                    creating,
                    save,
                }}
            />
            <div
                id="CreateElevation"
                className="card"
            >
                <ElevationId
                    {...{
                        name,
                        _systemSets,
                        systemSetId,
                        updateElevation,
                    }}
                />
                <RoughOpening
                    {...{
                        horizontalRoughOpening,
                        horizontalMasonryOpening,
                        verticalRoughOpening,
                        recursiveElevation,
                        horizontals,
                        verticalMasonryOpening,
                        updateElevation,
                        startingBayQuantity,
                        initialElevationInput,
                    }}
                />
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
                <GroupingBox
                    title="Preview"
                >
                    <ElevationPreview
                        data-cy="preview"
                        elevation={recursiveElevation}
                    />
                </GroupingBox>
                <Footer
                    {...{
                        doNotConfirm,
                        saveDefault,
                        savingDefault,
                        elevationInput,
                        creating,
                        save,
                    }}
                />
            </div>
        </>
    );
});
