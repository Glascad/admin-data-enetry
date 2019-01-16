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
            {({ nextLink, previousLink }, currentRoute) => (
                <div className="TabNavigator">
                    <div className="tab-container">
                        {routes.map(route => (
                            <NavLink
                                key={route.path}
                                isActive={(_, { pathname }) => pathname == `${url}${route.path}`}
                                to={`${
                                    url
                                    }${
                                    route.path
                                    }${
                                    search
                                    }`}
                                className="tab"
                                activeClassName="current-tab"
                            >
                                {route.name}
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
