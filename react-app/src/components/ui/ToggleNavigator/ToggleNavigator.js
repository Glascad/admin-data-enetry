import React from 'react';

import {
    withRouter,
    NavLink,
} from 'react-router-dom';

import Toggle from '../Toggle/Toggle';
import Navigator from '../../state/Navigator/Navigator';

function ToggleNavigator({
    history,
    location: {
        search,
        pathname,
    },
    match: {
        url,
    },
    routes,
    title,
    titleButtons,
    rightButtons,
}) {

    return (
        <>
            <header>
                <div>
                    <h1>
                        {title}
                    </h1>
                    <div>
                        {titleButtons}
                    </div>
                </div>
                <div className="right-buttons">
                    {rightButtons}
                    <Toggle
                        component={NavLink}
                        buttons={
                            routes.map(({
                                path,
                                name,
                            }) => ({
                                key: path,
                                to: `${
                                    url
                                    }${
                                    path
                                    }${
                                    search
                                    }`,
                                isActive: (_, { pathname }) => pathname.match(`${url}${path}`),
                                className: "empty",
                                activeClassName: "selected",
                                children: name,
                            }))
                        }
                    />
                </div>
            </header>
            <Navigator
                routes={routes}
            />
        </>
    );
}

export default withRouter(ToggleNavigator);
