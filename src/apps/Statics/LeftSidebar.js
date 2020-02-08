import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { DoubleArrow, NavMenu } from '../../components';
import { extractNavigationOptions, normalCase } from '../../utils';

export default function LeftSidebar({
    open,
    path,
    toggle,
    routes,
    routeProps,
    allowedApplications,
    username,
    logout,
}) {
    return (
        <div
            id="Sidebar"
            className={open ? "" : "closed"}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            onWheel={e => e.stopPropagation()}
        >
            <Link
                id="sidebar-header"
                to={path}
            >
                <Logo className="logo" />
                <span>glascad</span>
            </Link>
            <NavMenu
                routeProps={routeProps}
                routes={routes}
                closed={!open}
            />
            <DoubleArrow
                onClick={toggle}
            />
            <div className="bottom-buttons">
                {Object.entries(allowedApplications)
                    .filter((_, __, { length }) => length > 1)
                    .map(([name, route]) => extractNavigationOptions(name, route))
                    .map(({ name, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            activeClassName="disabled"
                        >
                            <button className="light">
                                {normalCase(name)}
                            </button>
                        </NavLink>
                    ))}
                <div id="current-user">
                    <div>
                        {username}
                    </div>
                    {username ? (
                        <button
                            className="empty light"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
