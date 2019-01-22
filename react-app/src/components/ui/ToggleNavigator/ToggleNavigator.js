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
    ...props
}) {

    return (
        <>
            <TitleBar
                {...titleBar}
                right={(
                    <>
                        {rightButtons}
                        <Toggle
                            buttons={
                                routes.map(({
                                    path,
                                    name,
                                }) => ({
                                    selected: pathname.match(`${url}${path}`),
                                    text: name,
                                    onClick: () => history.push(`${
                                        url
                                        }${
                                        path
                                        }${
                                        search
                                        }`),
                                }))
                            }
                        />
                    </>
                )
                }
            />
            <Navigator
                routes={routes}
                {...props}
            />
        </>
    );
}

export default withRouter(ToggleNavigator);
