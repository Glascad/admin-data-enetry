import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
    Redirect,
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';

import {
    validatePath,
} from '../../utils';


/**
 * PURPOSE
 * 
 * The Navigator takes an array of routes and wraps them in a Switch. It also tracks which route is currently selected, as well as which routes are previous and next - for the sake of previous and next buttons.
 * 
 * If no routes are matched, it will redirect to the first route in the array.
 * 
 * 
 * USAGE
 * 
 * This component is used inside the TabNavigator, and the Wizard component will be refactored to use a Navigator once (if) we need to use a Wizard in the future.
 * 
 */




class NavigatorChild extends Component {

    componentDidMount = () => {
        // console.log('child updating route' + this.props.index);
        this.props.updateCurrentRoute(this.props.index);
    }

    render = () => this.props.children || "It looks like you found an invalid route";
}



class Navigator extends Component {

    state = {
        currentRoute: 0,
    };

    updateCurrentRoute = index => {
        // console.log('navigator updating route');
        if (this.props.trackCurrentRoute !== false) {
            // console.log('navigator updating route');
            this.setState({
                currentRoute: index,
            });
        } else {
            // console.log('navigator not updating route');
        }
    }

    render = () => {
        const {
            state: {
                currentRoute,
            },
            props: {
                location: {
                    pathname,
                    search,
                },
                match: {
                    path,
                    url,
                },
                routes,
                children = (_, Children) => Children,
            },
            updateCurrentRoute,
        } = this;

        const mappedRoutes = routes.map(route => typeof route === 'function' ?
            route(this.props)
            :
            route
        );

        const previousIndex = currentRoute - 1;
        const nextIndex = currentRoute + 1;

        const previousRoute = mappedRoutes[previousIndex] || {};
        const nextRoute = mappedRoutes[nextIndex] || {};

        const previousLink = url + previousRoute.path;
        const nextLink = url + nextRoute.path;

        const redirectTo = validatePath(`${
            url
            }${
            mappedRoutes[0].path
            }${
            search
            }`);

        // console.log(pathname + search);

        if (
            currentRoute === -1
            &&
            pathname + search !== redirectTo
        ) {
            return (
                <Redirect
                    to={redirectTo}
                />
            )
        } else {
            return (
                <Switch>
                    {mappedRoutes
                        .map(route => typeof route === 'function' ? route(this.props) : route)
                        // .filter(Boolean)
                        .map(({ exact, component: RouteChild, ...route }, i) => (
                            <Route
                                key={route.path}
                                {...route}
                                exact={exact}
                                path={validatePath(`${
                                    path
                                    }${
                                    route.path
                                    }`)}
                                render={routerProps => children({
                                    ...routerProps,
                                    previousLink,
                                    nextLink,
                                },
                                    <NavigatorChild
                                        index={i}
                                        updateCurrentRoute={updateCurrentRoute}
                                    >
                                        {RouteChild ?
                                            <RouteChild {...routerProps} />
                                            :
                                            route.render(routerProps)
                                        }
                                    </NavigatorChild>
                                )}
                            />
                        ))}
                    <NavigatorChild
                        index={-1}
                        updateCurrentRoute={updateCurrentRoute}
                    />
                </Switch>
            );
        }
    }
}

export default withRouter(Navigator);
