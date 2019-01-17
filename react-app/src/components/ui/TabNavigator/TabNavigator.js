import React from 'react';
import PropTypes from 'prop-types';
import {
    NavLink,
    withRouter,
} from 'react-router-dom';

import Navigator from '../../state/Navigator/Navigator';

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
}) {

    return (
        <Navigator
            routes={routes}
        >
            {(_, currentRoute) => (
                <div className="TabNavigator">
                    <div className="tab-container">
                        {routes.map(({
                            path,
                            name,
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
                                    className="tab"
                                    activeClassName="current-tab"
                                >
                                    {name}
                                </NavLink>
                            ))}
                    </div>
                    <div className="card">
                        {currentRoute}
                        {children}
                    </div>
                </div >
            )}
        </Navigator>
    );
}

export default withRouter(TabNavigator);
