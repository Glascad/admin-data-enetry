import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';

import _ from 'lodash';

import {
    TitleBar,
    Input,
    GroupingBox,
    AsyncButton,
    ConfirmButton,
    useInitialState,
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
        _elevation: {
            finishedFloorHeight: initialFFH,
        } = {}
    },
    updateEntireElevation,
    updating,
}) {

    const [initialFinishedFloorHeight, setInitialFinishedFloorHeight] = useInitialState(new ImperialValue(initialFFH), [initialFFH]);

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
                to={`${path}${parseSearch(search).remove("sampleElevation", "bugId")}`}
            />
        );
    }

    if (!parseSearch(search).elevationId) {
        return (
            <Redirect
                to={`${
                    path.replace(/elevation\/edit-elevation/, 'elevation-search')
                    }${
                    parseSearch(search).remove("bugId")
                    }`}
            />
        );
    }

    const CHANGE_ELEVATION = (
        <ConfirmButton
            modalProps={{
                titleBar: {
                    title: "Change Elevation",
                },
                children: "Are you sure you want to cancel your changes and leave this page?",
                cancel: {
                    text: "Stay",
                },
                finish: {
                    className: "danger",
                    text: "Leave",
                },
            }}
            onClick={() => history.push(`${
                path.replace(/elevation\/edit-elevation/, 'elevation-search')
                }${
                parseSearch(search).remove("elevationId", "sampleElevation", "bugId")
                }`)}
            doNotConfirmWhen={doNotConfirm}
        >
            Change Elevation
        </ConfirmButton>
    );

    const BUILD = (
        <AsyncButton
            className="action"
            loading={updating}
            text={`${doNotConfirm ? "" : "Save and "}Build`}
            loadingText="Saving"
            onClick={save}
        />
    );

    return (
        <>
            <TitleBar
                title="Edit Elevation"
                right={(
                    <>
                        {CHANGE_ELEVATION}
                        {BUILD}
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
                            type="inches"
                            initialValue={new ImperialValue(rox)}
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
                            type="inches"
                            initialValue={new ImperialValue(roy)}
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
                    initialValue={initialFinishedFloorHeight}
                    onChange={({ value }) => updateElevation({
                        finishedFloorHeight: +value,
                    })}
                    onBlur={setInitialFinishedFloorHeight}
                />
                <GroupingBox
                    title="Preview"
                >
                    <ElevationPreview
                        preview={renderPreview(recursiveElevation)}
                    />
                </GroupingBox>
                <div className="bottom-buttons">
                    {CHANGE_ELEVATION}
                    {BUILD}
                </div>
            </div>
        </>
    );
}
