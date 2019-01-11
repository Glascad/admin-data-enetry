import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import Navigator from '../Navigator/Navigator';

import './TabNavigator.scss';

function TabNavigator({
    location: {
        search,
    },
    match: {
        url,
    },
    routes,
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
                    </div>
                </div >
            )}
        </Navigator>
    );
}

export default withRouter(TabNavigator);
