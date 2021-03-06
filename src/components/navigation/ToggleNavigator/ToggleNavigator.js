import React from 'react';
import PropTypes from 'prop-types';
import {
    withRouter,
    // NavLink,
} from 'react-router-dom';

import Toggle from '../../ui/Toggle/Toggle';
import Navigator from '../Navigator';
import TitleBar from '../../ui/TitleBar/TitleBar';

ToggleNavigator.propTypes = {
    ...Navigator.propTypes,
    titleBar: PropTypes.shape(TitleBar.propTypes),
};

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
        <Navigator
            routes={routes}
            {...props}
        >
            {({ mappedRoutes }, currentRoute) => (
                <>
                    <TitleBar
                        {...titleBar}
                        right={(
                            <>
                                {rightButtons}
                                <Toggle
                                    buttons={
                                        mappedRoutes.map(({
                                            path,
                                            name,
                                            disabled,
                                        }) => ({
                                            className: disabled && "disabled",
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
                        )}
                    />
                    {currentRoute}
                </>
            )}
        </Navigator>
    );
}

export default withRouter(ToggleNavigator);
