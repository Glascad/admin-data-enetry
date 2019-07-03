import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';

import _ from 'lodash';

import {
    TitleBar,
    Input,
    GroupingBox,
    AsyncButton,
    ConfirmButton,
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

    const doNotConfirm = _.isEqual(elevationInput, {});

    const save = async () => {

        if (!doNotConfirm) {
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
        }

        history.push(`${path.replace(/edit/, 'build')}${search}`);
    }

    console.log("this is the EDIT elevation page");

    if (parseSearch(search).sampleElevation) {
        return (
            <Redirect
                to={`${path}${parseSearch(search).remove("sampleElevation")}`}
            />
        );
    }

    if (!parseSearch(search).elevationId) {
        return (
            <Redirect
                to={`${
                    path.replace(/elevation\/edit-elevation/, 'elevation-search')
                    }${
                    search
                    }`}
            />
        );
    }

    return (
        <>
            <TitleBar
                title="Edit Elevation"
                right={(
                    <>
                        <ConfirmButton
                            modalProps={{
                                titleBar: {
                                    title: "Change Elevation",
                                },
                                children: "Are you sure you want to cancel your changes and leave this page?",
                                cancel: {
                                    text: "Stay"
                                },
                                finish: {
                                    className: "danger",
                                    text: "Leave",
                                },
                            }}
                            onClick={() => history.push(`${
                                path.replace(/elevation\/edit-elevation/, 'elevation-search')
                                }${
                                parseSearch(search).remove("elevationId")
                                }`)}
                            doNotConfirmWhen={doNotConfirm}
                        >
                            Change Elevation
                        </ConfirmButton>
                        <AsyncButton
                            className="action"
                            loading={updating}
                            text={`${doNotConfirm ? "" : "Save and "}Build`}
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
                    <ConfirmButton
                        modalProps={{
                            titleBar: {
                                title: "Change Elevation",
                            },
                            children: "Are you sure you want to cancel your changes and leave this page?",
                            cancel: {
                                text: "Stay"
                            },
                            finish: {
                                className: "danger",
                                text: "Leave",
                            },
                        }}
                        onClick={() => history.push(`${
                            path.replace(/elevation\/edit-elevation/, 'elevation-search')
                            }${
                            parseSearch(search).remove("elevationId")
                            }`)}
                        doNotConfirmWhen={doNotConfirm}
                    >
                        Change Elevation
                    </ConfirmButton>
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
