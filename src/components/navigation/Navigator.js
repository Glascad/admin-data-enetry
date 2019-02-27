import React, { Component } from 'react';

// import PropTypes from 'prop-types';

import {
    Redirect,
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';

import {
    validatePath,
} from '../../utils';
import extractNavigationOptions from '../../utils/extract-navigation-options';


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

    static defaultProps = {
        children: "It looks like you found an invalid route",
    };

    componentDidMount = () => {
        // console.log('child updating route' + this.props.index);
        this.props.updateCurrentRoute(this.props.index);
    }

    render = () => this.props.children;
}



class Navigator extends Component {

    static defaultProps = {
        children: (_, Children) => Children,
    };

    state = {
        currentRoute: 0,
    };

    updateCurrentRoute = index => {
        if (this.props.trackCurrentRoute !== false) {
            this.setState({
                currentRoute: index,
            });
        }
    }

    render = () => {
        const {
            state: {
                currentRoute,
            },
            props,
            props: {
                location: {
                    search,
                },
                match: {
                    path,
                    url,
                },
                routeProps,
                routes,
                children,
            },
            updateCurrentRoute,
        } = this;

        const mappedRoutes = Object.entries(routes)
            .map(([name, route]) => extractNavigationOptions(name, route, {
                ...props,
                ...routeProps,
            }, false));

        const previousIndex = currentRoute - 1;
        const nextIndex = currentRoute + 1;

        const previousRoute = mappedRoutes[previousIndex] || {};
        const nextRoute = mappedRoutes[nextIndex] || {};

        const previousLink = url + previousRoute.path;
        const nextLink = url + nextRoute.path;

        return (
            <Switch>
                {mappedRoutes
                    .map(({ exact, component: RouteChild, disabled, ...route }, i) => !disabled && (
                        <Route
                            key={route.path}
                            {...route}
                            exact={exact}
                            path={validatePath(`${
                                path
                                }${
                                route.path
                                }`)}
                            render={reactRouterProps => children({
                                ...reactRouterProps,
                                previousLink,
                                nextLink,
                                mappedRoutes,
                            }, (
                                    <NavigatorChild
                                        index={i}
                                        updateCurrentRoute={updateCurrentRoute}
                                    >
                                        {RouteChild ?
                                            <RouteChild {...reactRouterProps} {...routeProps} />
                                            :
                                            route.render(reactRouterProps)
                                        }
                                    </NavigatorChild>
                                )
                            )}
                        />
                    ))}
                <Route
                    render={() => (
                        <Redirect
                            to={validatePath(`${
                                url
                                }${
                                mappedRoutes[0].path
                                }${
                                search
                                }`)}
                        />
                    )}
                />
            </Switch>
        );
    }
}

export default withRouter(Navigator);
