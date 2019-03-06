import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import {
    TitleBar,
    Input,
    GroupingBox,
} from '../../../../../components';

import ElevationPreview from './ElevationPreview';

import RecursiveElevation from '../recursive-elevation/recursive-elevation';
import createElevation from '../ducks/create';

import { parseSearch } from '../../../../../utils';

const defaultElevationInput = {
    verticalLock: true,
    horizontalLock: true,
    verticalRoughOpening: 300,
    horizontalRoughOpening: 500,
    startingBayQuantity: 2,
    finishedFloorHeight: 50,
    sightline: 10,
    horizontalFrames: [],
};

const defaultHorizontalFrame = {
    height: 100,
    from: "finishedFloor",
    to: "top",
};

export default class NewElevation extends Component {

    state = {
        elevation: defaultElevationInput,
    };

    reset = () => this.setState({ elevation: defaultElevationInput });

    updateElevation = update => console.log({ update, state: this.state }) || this.setState(({ elevation }) => ({
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
        } = createElevation(elevationInput);

        const elevation = {
            name,
            containers: _elevationContainers,
            details: _containerDetails.map(({ fakeId, ...detail }) => detail),
            ...createdElevation,
        };

        console.log({ elevation });

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
            path.replace(/new/, 'build')
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
                    startingBayQuantity,
                    finishedFloorHeight,
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

        console.log({ elevationInput });

        const elevation = new RecursiveElevation(createElevation(elevationInput));

        console.log({ elevation });

        return (
            <div className="card">
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
                <div className="unfinished">
                    <Input
                        label="System Set"
                    />
                </div>
                <GroupingBox
                    title="Rough Opening"
                >
                    <div className="input-group">
                        <Input
                            label="Vertical"
                            type="number"
                            min={0}
                            value={verticalRoughOpening}
                            onChange={({ target: { value } }) => updateElevation({
                                verticalRoughOpening: +value,
                            })}
                        />
                        <Input
                            label="Lock"
                            type="checkbox"
                            readOnly={true}
                            checked={verticalLock}
                        />
                    </div>
                    <div className="input-group">
                        <Input
                            label="Horizontal"
                            type="number"
                            min={0}
                            value={horizontalRoughOpening}
                            onChange={({ target: { value } }) => updateElevation({
                                horizontalRoughOpening: +value,
                            })}
                        />
                        <Input
                            label="Lock"
                            type="checkbox"
                            readOnly={true}
                            checked={horizontalLock}
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
                <ElevationPreview
                    elevation={elevation}
                />
                <div className="bottom-buttons">
                    <Link
                        to={`${
                            path.replace(/\/elevation\/new-elevation/, '')
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
                        Save
                    </button>
                </div>
            </div>
        );
    }
}
