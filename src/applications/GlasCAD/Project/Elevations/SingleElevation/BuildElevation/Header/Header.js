import React from 'react';

import { Link } from 'react-router-dom';

import {
    TitleBar,
    Input,
} from '../../../../../../../components';

import {
    Hamburger,
} from '../../../../../../../assets/icons';

import { SelectionContext } from '../SelectionContext';

import sidebarStates from '../RightSidebar/states';

export default function Header({
    path,
    search,
    name,
    save,
    history,
}) {
    return (
        <TitleBar
            title="Elevation"
            selections={[name]}
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
                            sidebar: {
                                state,
                                open,
                                toggle,
                                setState,
                            },
                        }) => (
                                <Input
                                    Icon={Hamburger}
                                    checked={open && state === sidebarStates.VisibilitySettings}
                                    onChange={open && state === sidebarStates.VisibilitySettings ?
                                        toggle
                                        :
                                        () => setState(sidebarStates.VisibilitySettings, true)}
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
                            search
                            }`}
                    >
                        <button>
                            Cancel
                        </button>
                    </Link>
                    <button
                        onClick={async () => {
                            const result = await save();
                            history.push(`${
                                path.replace(/elevation\/build-elevation/, 'all-elevations')
                                }${
                                search
                                }`)
                        }}
                    >
                        Save and Exit
                    </button>
                    <button
                        className="action"
                        onClick={save}
                    >
                        Save
                    </button>
                </>
            )}
        />
    )
}
