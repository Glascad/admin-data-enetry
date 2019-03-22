import React from 'react';

import { Link } from 'react-router-dom';

import {
    TitleBar,
    Input,
} from '../../../../../../components';

import {
    Hamburger,
} from '../../../../../../assets/icons';
import { SelectionContext } from '../SelectionContext';

export default function Header({
    path,
    search,
    name,
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
                                open,
                                toggle,
                            },
                        }) => (
                                <Input
                                    Icon={Hamburger}
                                    checked={open}
                                    onChange={toggle}
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
                            Save and Exit
                        </button>
                    </Link>
                    <Link
                        to={`${
                            path.replace(/elevation\/build-elevation/, 'all-elevations')
                            }${
                            search
                            }`}
                    >
                        <button
                            className="action"
                        >
                            Save
                        </button>
                    </Link>
                </>
            )}
        />
    )
}
