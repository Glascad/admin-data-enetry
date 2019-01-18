import React from 'react';

import {
    withRouter,
    NavLink,
} from 'react-router-dom';

import Toggle from '../Toggle/Toggle';
import Navigator from '../../state/Navigator';
import TitleBar from '../TitleBar/TitleBar';

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
    titleBar,
    rightButtons,
}) {

    return (
        <>
            <TitleBar
                {...titleBar}
                right={(
                    <>
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
                    </>
                )
                }
            />
            <Navigator
                routes={routes}
            />
        </>
    );
}

export default withRouter(ToggleNavigator);
