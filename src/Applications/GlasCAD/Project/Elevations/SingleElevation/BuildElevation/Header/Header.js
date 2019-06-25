import React from 'react';

import { Link } from 'react-router-dom';

import {
    TitleBar,
    Input,
    Ellipsis,
    AsyncButton,
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
}) {
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
                                    onChange={selectedItem === VISIBILITY_SETTINGS ?
                                        cancelSelection
                                        :
                                        () => selectItem(VISIBILITY_SETTINGS)}
                                    onMouseDown={e => e.stopPropagation()}
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
                            const result = await save();
                            history.push(`${
                                path.replace(/elevation\/build-elevation/, 'all-elevations')
                                }${
                                parseSearch(search).remove('sampleElevation')
                                }`)
                        }}
                    >
                        Save and Close
                    </AsyncButton>
                    <AsyncButton
                        className="action"
                        onClick={save}
                    >
                        Save
                    </AsyncButton>
                </>
            )}
        />
    )
}
