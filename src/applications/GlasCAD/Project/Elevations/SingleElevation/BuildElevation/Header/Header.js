import React from 'react';

import { Link } from 'react-router-dom';

import {
    TitleBar,
    Input,
} from '../../../../../../../components';

import {
    Hamburger,
} from '../../../../../../../assets/icons';

import { SelectionContext } from '../contexts/SelectionContext';

const VISIBILITY_SETTINGS = "VISIBILITY_SETTINGS";

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
                            selection: {
                                items: [
                                    selectedItem,
                                ],
                                selectItem,
                                cancelSelection
                            },
                        }) => (
                                <Input
                                    Icon={Hamburger}
                                    checked={selectedItem === VISIBILITY_SETTINGS}
                                    onChange={selectedItem === VISIBILITY_SETTINGS ?
                                        cancelSelection
                                        :
                                        () => selectItem(VISIBILITY_SETTINGS)}
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
