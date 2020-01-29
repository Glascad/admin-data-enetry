import _ from 'lodash';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AsyncButton, ConfirmButton, GroupingBox, Input, Select, SVG, TitleBar, useInitialState } from '../../../../../../components';
import { ImperialValue, parseSearch } from '../../../../../../utils';
import generatePreview from '../../ElevationPreview/generate-preview';
import RecursiveElevation from '../utils/recursive-elevation/elevation';
import ElevationPreview from '../../ElevationPreview/ElevationPreview';

export default function ElevationInfo({
    history,
    match: {
        path,
    },
    location: {
        search,
        state: {
            previousPath = '/glascad/project/elevations/elevation-search',
            previousSearch,
        } = {},
    },
    queryResult: {
        _elevation,
        _elevation: {
            finishedFloorHeight: initialFFH,
        } = {},
    },
    project: {
        _systemSets = [],
    } = {},
    updateEntireElevation,
    updating,
}) {

    console.log(arguments[0]);

    const [initialFinishedFloorHeight, setInitialFinishedFloorHeight] = useInitialState(new ImperialValue(initialFFH), [initialFFH]);

    const [elevationInput, setState] = useState({});

    const updateElevation = update => setState({ ...elevationInput, ...update });

    const recursiveElevation = new RecursiveElevation({ ..._elevation, ...elevationInput });

    const {
        rawElevation: {
            name,
            roughOpening: {
                width,
                height,
            } = {},
            finishedFloorHeight,
            _systemSet: {
                name: systemSetName,
            } = {},
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
                    preview: generatePreview(recursiveElevation)
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
                previousSearch || search
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
                <Select
                    data-cy="system-set"
                    label="System set"
                    options={_systemSets.map(({ name }) => name)}
                    value={systemSetName}
                    onChange={name => updateElevation({
                        systemSetId: (_systemSets.find(ss => ss.name === name) || {}).id,
                        _systemSet: _systemSets.find(ss => ss.name === name),
                    })}
                />
                <GroupingBox
                    title="Rough opening"
                >
                    <Input
                        data-cy="ro-lock"
                        label="Locked"
                        type="switch"
                        readOnly={true}
                        checked={true}
                    />
                    <div className="input-group">
                        <Input
                            data-cy="ro-width"
                            label="Width"
                            type="inches"
                            readOnly={true}
                            value={new ImperialValue(width)}
                        />
                        <Input
                            data-cy="mo-horizontal"
                            label="Masonry opening"
                            type="switch"
                            readOnly={true}
                            checked={true}
                        />
                    </div>
                    <div className="input-group">
                        <Input
                            data-cy="ro-height"
                            label="Height"
                            type="inches"
                            readOnly={true}
                            value={new ImperialValue(height)}
                        />
                        <Input
                            data-cy="mo-vertical"
                            label="Masonry opening"
                            type="switch"
                            readOnly={true}
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
                        recursiveElevation={recursiveElevation}
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
