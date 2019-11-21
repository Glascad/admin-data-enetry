import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import {
    Redirect,
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';

import {
    validatePath,
    extractNavigationOptions,
    parseSearch,
    removeNullValues,
} from '../../utils';
import customPropTypes from '../utils/custom-prop-types';


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


class NavigatorChild extends PureComponent {

    static defaultProps = {
        children: "It looks like you found an invalid route",
    };

    componentDidMount = () => {
        this.props.updateCurrentRoute(this.props.index);
    }

    render = () => this.props.children;
}



class Navigator extends PureComponent {

    static propTypes = {
        children: PropTypes.func,
        initialRoute: PropTypes.string,
        routeProps: PropTypes.object,
        routes: PropTypes.objectOf(PropTypes.func),
    };

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

    componentDidMount = () => {
        const {
            props: {
                initialRoute,
                match: {
                    path,
                },
                history,
            },
        } = this;
        if (initialRoute) {
            history.push(`${path}${initialRoute}`);
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

        const parsedSearch = parseSearch(search);
        const searchKeys = Object.keys(removeNullValues(parsedSearch));

        const previousIndex = currentRoute - 1;
        const nextIndex = currentRoute + 1;

        const previousRoute = mappedRoutes[previousIndex] || {};
        const nextRoute = mappedRoutes[nextIndex] || {};

        const previousLink = url + previousRoute.path;
        const nextLink = url + nextRoute.path;

        return (
            <Switch>
                {mappedRoutes
                    .filter(({
                        disabled,
                        requiredURLParams = [],
                    }) => (
                            !disabled
                            &&
                            requiredURLParams.every(param => searchKeys.includes(param))
                        ))
                    .map(({
                        exact,
                        component: RouteChild,
                        ...route
                    }, i) => (
                            <Route
                                key={route.path}
                                // {...console.log(Object.keys(route))}
                                // {...route}
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
                                    route,
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
                                (mappedRoutes[0] || {}).path || ''
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
