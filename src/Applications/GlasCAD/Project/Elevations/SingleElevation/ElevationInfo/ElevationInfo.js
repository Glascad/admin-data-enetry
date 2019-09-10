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
        state: {
            previousPath = '/glascad/project/elevation/elevations/elevation-search',
            previousSearch = arguments[0].location.search,
        } = {},
    },
    queryResult: {
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

        history.push(`${path.replace(/elevation-info/, 'build-elevation')}${search}`);
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
                    path.replace(/elevation\/elevation-info/, 'elevation-search')
                    }${
                    parseSearch(search).remove("bugId")
                    }`}
            />
        );
    }

    const CHANGE_ELEVATION = (
        <ConfirmButton
            data-cy="cancel"
            modalProps={{
                titleBar: {
                    title: "Cancel",
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
                previousPath
                // path.replace(/elevation\/elevation-info/, 'elevation-search')
                }${
                previousSearch
                // parseSearch(search).remove("elevationId", "sampleElevation", "bugId")
                }`)}
            doNotConfirmWhen={doNotConfirm}
        >
            Cancel
        </ConfirmButton>
    );

    const BUILD = (
        <AsyncButton
            data-cy="save"
            className={`action ${doNotConfirm ? 'disabled' : ''}`}
            loading={updating}
            text="Build"
            loadingText="Saving"
            onClick={save}
        />
    );

    return (
        <>
            <TitleBar
                title="Elevation Info"
                right={(
                    <>
                        {CHANGE_ELEVATION}
                        {BUILD}
                    </>
                )}
            />
            <div className="card">
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
                    data-cy="system-set"
                    label="System set"
                    disabled={true}
                    select={{
                        options: [{ label: "Trifab451" }],
                        value: { label: "Trifab451" },
                    }}
                />
                <GroupingBox
                    title="Rough opening"
                    className="disabled"
                >
                    <Input
                        data-cy="ro-lock"
                        label="Locked"
                        type="switch"
                        checked={true}
                    />
                    <div className="input-group">
                        <Input
                            data-cy="ro-width"
                            label="Width"
                            type="inches"
                            initialValue={new ImperialValue(rox)}
                            onChange={() => { }}
                        />
                        <Input
                            data-cy="mo-horizontal"
                            label="Masonry opening"
                            type="switch"
                            checked={true}
                        />
                    </div>
                    <div className="input-group">
                        <Input
                            data-cy="ro-height"
                            label="Height"
                            type="inches"
                            initialValue={new ImperialValue(roy)}
                            onChange={() => { }}
                        />
                        <Input
                            data-cy="mo-vertical"
                            label="Masonry opening"
                            type="switch"
                            checked={true}
                        />
                    </div>
                </GroupingBox>
                <Input
                    data-cy="curb-height"
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
                        data-cy="elevation-preview"
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
