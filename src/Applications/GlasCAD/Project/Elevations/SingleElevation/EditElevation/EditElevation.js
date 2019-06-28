import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import {
    TitleBar,
    Input,
    GroupingBox,
    AsyncButton,
} from '../../../../../../components';

import {
    parseSearch,
    ImperialValue,
} from '../../../../../../utils';

import renderPreview from '../../ElevationPreview/render-preview';

import ElevationPreview from '../../ElevationPreview/ElevationPreview';

import RecursiveElevation from '../utils/recursive-elevation/elevation';

export default function EditElevation({
    history,
    match: {
        path,
    },
    location: {
        search,
    },
    queryStatus: {
        _elevation,
    },
    updateEntireElevation,
    updating,
}) {

    const [elevationInput, setState] = useState({});

    const updateElevation = update => setState({ ...elevationInput, ...update });

    const recursiveElevation = new RecursiveElevation({ ..._elevation, ...elevationInput });

    const {
        rawElevation: {
            name,
            roughOpening: {
                x: rox,
                y: roy,
            } = {},
            finishedFloorHeight,
        } = {},
    } = recursiveElevation;

    const save = async () => {
        const elevation = {
            ...elevationInput,
            id: +parseSearch(search).elevationId,
        };

        const result = await updateEntireElevation({
            elevation: {
                ...elevation,
                preview: renderPreview(recursiveElevation)
            },
        });

        history.push(`${path.replace(/edit/, 'build')}${search}`);
    }

    console.log("this is the EDIT elevation page");

    return (
        <>
            <TitleBar
                title="Edit Elevation"
                right={(
                    <>
                        <Link
                            to={`${path.replace(/elevation\/edit-elevation/, 'elevation-search')}${search}`}
                        >
                            <button>
                                Change Elevation
                            </button>
                        </Link>
                        <AsyncButton
                            className="action"
                            loading={updating}
                            text="Save and Build"
                            loadingText="Saving"
                            onClick={save}
                        />
                    </>
                )}
            />
            <div className="card">
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
                    select={{}}
                />
                <GroupingBox
                    title="Rough opening"
                    className="disabled"
                >
                    <Input
                        label="Locked"
                        type="switch"
                        checked={true}
                    />
                    <div className="input-group">
                        <Input
                            label="Width"
                            // type="inches"
                            value={`${new ImperialValue(rox)}`}
                            onChange={() => { }}
                        />
                        <Input
                            label="Masonry opening"
                            type="switch"
                            checked={true}
                        />
                    </div>
                    <div className="input-group">
                        <Input
                            label="Height"
                            // type="inches"
                            value={`${new ImperialValue(roy)}`}
                            onChange={() => { }}
                        />
                        <Input
                            label="Masonry opening"
                            type="switch"
                            checked={true}
                        />
                    </div>
                </GroupingBox>
                <Input
                    label="Curb Height"
                    type="inches"
                    initialValue={new ImperialValue(finishedFloorHeight)}
                    onChange={({ value }) => updateElevation({
                        finishedFloorHeight: +value,
                    })}
                />
                <GroupingBox
                    title="Preview"
                >
                    <ElevationPreview
                        preview={renderPreview(recursiveElevation)}
                    />
                </GroupingBox>
                <div className="bottom-buttons">
                    <Link
                        to={`${path.replace(/elevation\/edit-elevation/, 'elevation-search')}${search}`}
                    >
                        <button>
                            Change Elevation
                        </button>
                    </Link>
                    <AsyncButton
                        className="action"
                        loading={updating}
                        text="Save and Build"
                        loadingText="Saving"
                        onClick={save}
                    />
                </div>
            </div>
        </>
    );
}
