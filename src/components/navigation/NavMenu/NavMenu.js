import PropTypes from 'prop-types';
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { extractNavigationOptions, normalCase } from '../../../utils';
import Dropdown from '../../ui/Dropdown/Dropdown';
import Navigator from '../Navigator';
import './NavMenu.scss';

NavMenu.propTypes = {
    ...Navigator.propTypes,
    closed: PropTypes.bool,
};

function NavMenu({
    location: {
        pathname,
        search,
    },
    match: {
        path: matchedPath,
    },
    routeProps,
    routes,
    closed,
}) {
    // console.log(arguments[0]);
    return (
        <div className="NavMenu">
            {Object.entries(routes)
                .map(([name, route]) => extractNavigationOptions(name, route, {
                    ...arguments[0],
                    ...routeProps,
                }))
                .filter(({ shouldRenderInNavMenu }) => shouldRenderInNavMenu !== false)
                .map(({
                    exact,
                    name,
                    path,
                    subroutes,
                    removeDropdown,
                }, i) => subroutes ? (
                    <Dropdown
                        key={i}
                        label={normalCase(name)}
                        open={(closed === true) ? false : !!pathname.includes(path)}
                        removeDropdown={removeDropdown}
                        className={
                            pathname.includes(path) ?
                                'matched'
                                :
                                ''
                        }
                    >
                        {Object.entries(subroutes)
                            .map(([name, route]) => extractNavigationOptions(name, route, routeProps))
                            .filter(({ shouldRenderInNavMenu }) => shouldRenderInNavMenu !== false)
                            .map(({ name: childName, path: childPath, removeDropdown }, j) => (
                                <NavLink
                                    key={j}
                                    isActive={(_, { pathname }) => exact ?
                                        pathname.startsWith(`${matchedPath}${path}${childPath}`)
                                        :
                                        pathname.includes(`${path}${childPath}`)
                                    }
                                    to={`${
                                        matchedPath
                                        }${
                                        path
                                        }${
                                        childPath
                                        }${
                                        search
                                        }`}
                                    activeClassName="matched"
                                >
                                    {normalCase(childName)}
                                    {removeDropdown ? (
                                        <div
                                            className="remove-navlink"
                                            onClick={e => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                removeDropdown();
                                            }}
                                        >
                                            <div className="block-one" />
                                            <div className="block-two" />
                                        </div>
                                    ) : null}
                                </NavLink>
                            ))}
                    </Dropdown>
                ) : (
                            <NavLink
                                key={i}
                                isActive={(_, { pathname }) => exact ?
                                    pathname.startsWith(`${matchedPath}${path}`)
                                    :
                                    pathname.includes(path)
                                }
                                to={`${
                                    matchedPath
                                    }${
                                    path
                                    }${
                                    search}`}
                                className="item"
                                activeClassName="matched"
                            >
                                {normalCase(name)}
                            </NavLink>
                        )
                )}
        </div>
    );
}

export default withRouter(NavMenu);
