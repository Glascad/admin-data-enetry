import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import {
    TitleBar,
    Input,
    Ellipsis,
    AsyncButton,
    useMountTracker,
} from '../../../../../../../components';

import {
    Hamburger,
} from '../../../../../../../assets/icons';

import { SelectionContext } from '../contexts/SelectionContext';
import { parseSearch } from '../../../../../../../utils';

const VISIBILITY_SETTINGS = "VISIBILITY_SETTINGS";

export default function Header({
    path,
    search,
    name,
    cancel,
    save,
    history,
    updating,
}) {
    const [saving, setSaving] = useState(false);
    const [savingAndExiting, setSavingAndExiting] = useState(false);

    const mountTracker = useMountTracker();

    return (
        <TitleBar
            title="Elevation"
            selections={[name || <Ellipsis />]}
            className="blue-border"
            left={(
                <>
                    <Link
                        to={`${
                            path.replace(/build/, 'edit')
                            }${
                            search
                            }`}
                    >
                        <button>
                            Elevation Info
                        </button>
                    </Link>
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
                                />
                            )}
                    </SelectionContext.Consumer>
                </>
            )}
            right={(
                <>
                    <Link
                        to={`${
                            path.replace(/elevation\/build-elevation/, 'all-elevations')
                            }${
                            parseSearch(search).remove('sampleElevation')
                            }`}
                    >
                        <button>
                            Close
                        </button>
                    </Link>
                    <button
                        onClick={cancel}
                    >
                        Cancel Changes
                    </button>
                    <AsyncButton
                        onClick={async () => {
                            setSavingAndExiting(true);
                            const result = await save();
                            history.push(`${
                                path.replace(/elevation\/build-elevation/, 'all-elevations')
                                }${
                                parseSearch(search).remove('sampleElevation')
                                }`);
                            setSavingAndExiting(false);
                        }}
                        loading={savingAndExiting && updating}
                        loadingText="Saving"
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
                    >
                        Save
                    </AsyncButton>
                </>
            )}
        />
    )
}
