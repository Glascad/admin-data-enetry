import React from 'react';

import {
    NavLink,
    withRouter,
} from 'react-router-dom';

import Dropdown from '../Dropdown/Dropdown';

import './NavMenu.scss';
import { extractNavigationOptions } from '../../../utils';

function NavMenu({
    location: {
        pathname,
        search,
    },
    routeProps,
    routes = [arguments[0].route].filter(Boolean),
    closed,
}) {
    return (
        <div className="NavMenu">
            {routes
                .map(route => extractNavigationOptions(route, routeProps))
                .filter(({ name }) => name.trim())
                .map(({
                    exact,
                    name,
                    path,
                    subroutes = []
                }, i) => subroutes.length ? (
                    <Dropdown
                        key={i}
                        title={name}
                        open={closed === true ? false : pathname.includes(path) || undefined}
                        className={
                            pathname.includes(path) ?
                                'matched'
                                :
                                ''
                        }
                    >
                        {subroutes
                            .filter(({ name }) => name.trim())
                            .map(({ name: childName, path: childPath }, j) => (
                                <NavLink
                                    key={j}
                                    isActive={(_, { pathname }) => exact ?
                                        pathname === `${path}${childPath}`
                                        :
                                        pathname.includes(`${path}${childPath}`)
                                    }
                                    to={`${
                                        path
                                        }${
                                        childPath
                                        }${
                                        search
                                        }`}
                                    activeClassName="matched"
                                >
                                    {childName}
                                </NavLink>
                            ))}
                    </Dropdown>
                ) : (
                            <NavLink
                                key={i}
                                isActive={(_, { pathname }) => exact ?
                                    pathname === path
                                    :
                                    pathname.includes(path)
                                }
                                to={`${
                                    path
                                    }${
                                    search}`}
                                className="item"
                                activeClassName="matched"
                            >
                                {name}
                            </NavLink>
                        )
                )}
        </div>
    );
}

export default withRouter(NavMenu);
