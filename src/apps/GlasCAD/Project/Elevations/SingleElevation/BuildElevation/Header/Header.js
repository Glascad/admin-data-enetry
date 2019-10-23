import React, { useState } from 'react';

import _ from 'lodash';

import {
    TitleBar,
    Input,
    Ellipsis,
    AsyncButton,
    ConfirmButton,
} from '../../../../../../../components';

import {
    Hamburger,
} from '../../../../../../../assets/icons';

import { SelectionContext } from '../contexts/SelectionContext';
import { parseSearch } from '../../../../../../../utils';
import { defaultElevationInput } from '../BuildElevation';

const VISIBILITY_SETTINGS = "VISIBILITY_SETTINGS";

export default function Header({
    path,
    search,
    name,
    cancel,
    save,
    history,
    updating,
    elevationInput,
}) {
    const [saving, setSaving] = useState(false);
    const [savingAndExiting, setSavingAndExiting] = useState(false);

    const leaveModalProps = {
        titleBar: {
            title: "Change Elevation",
        },
        children: (
            <>
                <div>
                    You have unsaved changes.
                </div>
                <div>
                    Are you sure you want to cancel your changes and leave this page?
                </div>
            </>
        ),
        cancel: {
            text: "Stay"
        },
        finish: {
            className: "danger",
            text: "Leave",
        },
    };

    const cancelModalProps = {
        titleBar: {
            title: "Cancel Changes",
        },
        children: "Are you sure you want to discard your changes?",
        cancel: {
            text: "Cancel",
        },
        finish: {
            className: "danger",
            text: "Discard"
        },
    };

    const doNotConfirm = _.isEqual(elevationInput, defaultElevationInput);

    return (
        <TitleBar
            id="Header"
            title="Elevation"
            selections={[name || <Ellipsis />]}
            className="blue-border"
            left={(
                <>
                    {parseSearch(search).sampleElevation ? null : (
                        <ConfirmButton
                            modalProps={leaveModalProps}
                            onClick={() => history.push(`${
                                path.replace(/build-elevation/, 'elevation-info')
                                }${
                                search
                                }`, {
                                previousPath: path,
                                previousSearch: search,
                            })}
                            doNotConfirmWhen={doNotConfirm}
                            data-cy="elevation-info"
                        >
                            Elevation Info
                        </ConfirmButton>
                    )}
                    <SelectionContext.Consumer>
                        {({
                            items: [
                                selectedItem,
                            ],
                            selectItem,
                            cancelSelection
                        }) => (
                                <Input
                                    Icon={Hamburger}
                                    checked={selectedItem === VISIBILITY_SETTINGS}
                                    onMouseDown={e => e.stopPropagation()}
                                    onChange={selectedItem === VISIBILITY_SETTINGS ?
                                        cancelSelection
                                        :
                                        () => selectItem(VISIBILITY_SETTINGS)
                                    }
                                    data-cy="settings-icon"
                                />
                            )}
                    </SelectionContext.Consumer>
                </>
            )}
            right={(
                <>
                    <ConfirmButton
                        modalProps={leaveModalProps}
                        onClick={() => history.push(`${
                            path.replace(/elevation\/build-elevation/, 'elevation-search')
                            }${
                            parseSearch(search).remove('sampleElevation', 'elevationId', 'bugId')
                            }`)}
                        doNotConfirmWhen={doNotConfirm}
                        data-cy="close"
                    >
                        Close
                    </ConfirmButton>
                    <ConfirmButton
                        modalProps={cancelModalProps}
                        onClick={cancel}
                        doNotConfirmWhen={doNotConfirm}
                        data-cy="discard-changes"
                    >
                        Discard Changes
                    </ConfirmButton>
                    <AsyncButton
                        className="action"
                        onClick={async () => {
                            setSavingAndExiting(true);
                            const result = await save();
                            history.push(`${
                                path.replace(/elevation\/build-elevation/, 'elevation-search')
                                }${
                                parseSearch(search).remove('sampleElevation', 'elevationId', 'bugId')
                                }`);
                            setSavingAndExiting(false);
                        }}
                        loading={savingAndExiting && updating}
                        loadingText="Saving"
                        data-cy="save-and-close"
                    >
                        Save and Close
                    </AsyncButton>
                    <AsyncButton
                        className="action"
                        onClick={async () => {
                            setSaving(true);
                            await save();
                            setSaving(false);
                        }}
                        loading={saving && updating}
                        loadingText="Saving"
                        data-cy="save"
                    >
                        Save
                    </AsyncButton>
                </>
            )}
        />
    );
}
