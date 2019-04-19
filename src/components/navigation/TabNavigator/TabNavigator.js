import React from 'react';
// import PropTypes from 'prop-types';
import {
    NavLink,
    withRouter,
} from 'react-router-dom';

import Navigator from '../Navigator';

import './TabNavigator.scss';

function TabNavigator({
    location: {
        search,
    },
    match: {
        url,
    },
    routes,
    children,
    ...props
}) {

    return (
        <Navigator
            routes={routes}
            {...props}
        >
            {({ mappedRoutes, route: { id } }, navigatorChildren) => (
                <div className="TabNavigator">
                    <div className="tab-container">
                        {mappedRoutes.map(({
                            path,
                            name,
                            disabled,
                        }) => (
                                <NavLink
                                    key={path}
                                    isActive={(_, { pathname }) => pathname.match(`${url}${path}`)}
                                    to={`${
                                        url
                                        }${
                                        path
                                        }${
                                        search
                                        }`}
                                    replace={true}
                                    className={`tab ${disabled ? "disabled" : ""}`}
                                    activeClassName="current-tab"
                                >
                                    {name}
                                </NavLink>
                            ))}
                    </div>
                    <div
                        id={id}
                        className="card"
                    >
                        {navigatorChildren}
                        {children}
                    </div>
                </div >
            )}
        </Navigator>
    );
}

export default withRouter(TabNavigator);
