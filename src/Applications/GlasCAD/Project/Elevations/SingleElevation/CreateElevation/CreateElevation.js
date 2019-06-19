import React, { PureComponent } from 'react';

import gql from 'graphql-tag';

import F from '../../../../../../schema';

import { Link } from 'react-router-dom';

import {
    ApolloWrapper,
    TitleBar,
    Input,
    GroupingBox,
    CircleButton,
} from '../../../../../../components';

import ElevationPreview from './ElevationPreview';

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

export default class CreateElevation extends PureComponent {

    state = {
        elevation: defaultElevationInput,
        // elevation: {
        //     verticalRoughOpening: new ImperialValue(400),
        //     horizontalRoughOpening: new ImperialValue(200),
        // },
        system: {
            id: -1,
            name: "",
        },
    };

    reset = () => this.setState({ elevation: defaultElevationInput });

    updateElevation = update => this.setState(({ elevation }) => ({
        elevation: {
            ...elevation,
            ...update,
        },
    }));

    save = async () => {
        const {
            state: {
                elevation: elevationInput,
                elevation: {
                    name,
                },
            },
            props: {
                history,
                location: {
                    search,
                },
                match: {
                    path,
                },
                mutations: {
                    updateEntireElevation,
                },
            },
        } = this;

        const {
            _elevationContainers,
            _containerDetails,
            ...createdElevation
        } = generateElevation(elevationInput);

        const { projectId } = parseSearch(search);

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
        };

        // console.log({ elevation });

        const {
            data: {
                updateEntireElevation: {
                    elevation: [
                        {
                            id: elevationId,
                        },
                    ],
                },
            },
        } = await updateEntireElevation({ elevation });

        history.push(`${
            path.replace(/create/, 'build')
            }${
            parseSearch(search).update({ elevationId })
            }`);
    }

    render = () => {
        const {
            state: {
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
            props: {
                location: {
                    search,
                },
                match: {
                    path,
                },
            },
            reset,
            save,
            updateElevation,
        } = this;

        // console.log({ elevationInput });

        const elevation = new RecursiveElevation(generateElevation(elevationInput));

        // console.log({ elevation });

        return (
            <div className="CreateElevation card">
                <ApolloWrapper
                    query={{
                        query: gql`{ ...AllSystems } ${F.SYS_DATA.ALL_SYSTEMS}`,
                    }}
                >
                    {({
                        queryStatus: {
                            allSystems = [],
                        },
                    }) => (
                            <>
                                <TitleBar
                                    title="New Elevation"
                                    selections={[name]}
                                />
                                <Input
                                    label="Elevation Id"
                                    value={name}
                                    onChange={({ target: { value } }) => updateElevation({
                                        name: value,
                                    })}
                                />
                                <Input
                                    label="System Set"
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
                                    title="Rough Opening"
                                >
                                    <div className="input-group">
                                        <Input
                                            label="Vertical"
                                            type="inches"
                                            min={0}
                                            initialValue={verticalRoughOpening}
                                            onChange={({ value }) => updateElevation({ value })}
                                        />
                                        <Input
                                            label="Masonry Opening"
                                            type="switch"
                                            readOnly={true}
                                            checked={verticalMasonryOpening}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <Input
                                            label="Horizontal"
                                            type="inches"
                                            min={0}
                                            initialValue={verticalRoughOpening}
                                            onChange={({ value }) => updateElevation({ value })}
                                        />
                                        <Input
                                            label="Masonry Opening"
                                            type="switch"
                                            readOnly={true}
                                            checked={horizontalMasonryOpening}
                                        />
                                    </div>
                                </GroupingBox>
                                <Input
                                    label="Starting Bay Quantity"
                                    type="number"
                                    min={1}
                                    value={startingBayQuantity}
                                    onChange={({ target: { value } }) => updateElevation({
                                        startingBayQuantity: +value,
                                    })}
                                />
                                <Input
                                    label="Height Above Finished Floor"
                                    type="number"
                                    min={0}
                                    value={finishedFloorHeight}
                                    onChange={({ target: { value } }) => updateElevation({
                                        finishedFloorHeight: +value,
                                    })}
                                />
                                <GroupingBox
                                    title="Horizontals"
                                    circleButton={{
                                        actionType: "add",
                                        className: "action",
                                        onClick: () => updateElevation({
                                            horizontals: horizontals.concat(defaultHorizontal),
                                        }),
                                    }}
                                >
                                    {horizontals.length ?
                                        horizontals.map(({
                                            distance,
                                            from,
                                            to,
                                        }, i) => (
                                                <div className="input-group">
                                                    <Input
                                                        label="Measure From"
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
                                                        label="Measure To"
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
                                                        onChange={({ value }) => updateElevation({
                                                            horizontals: horizontals.replace(i, {
                                                                value,
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
                                <ElevationPreview
                                    elevation={elevation}
                                />
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
                                    <button
                                        className="action"
                                        onClick={save}
                                    >
                                        Build
                                    </button>
                                </div>
                            </>
                        )}
                </ApolloWrapper>
            </div>
        );
    }
}
