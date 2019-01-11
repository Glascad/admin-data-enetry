import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';



class NavigatorChild extends Component {

    componentDidMount = () => this.props.updateCurrentRoute(this.props.index);

    render = () => this.props.children || "It looks like you found an invalid route";
}



class Navigator extends Component {

    state = {
        currentRoute: -1,
    };

    updateCurrentRoute = index => this.setState({
        currentRoute: index,
    });

    render = () => {
        const {
            state: {
                currentRoute,
            },
            props: {
                location: {
                    search
                },
                match: {
                    path,
                    url,
                },
                history,
                routes,
                children,
            },
            updateCurrentRoute,
        } = this;

        const previousIndex = currentRoute - 1;
        const nextIndex = currentRoute + 1;

        const previousRoute = routes[previousIndex] || {};
        const nextRoute = routes[nextIndex] || {};

        const previousLink = url + previousRoute.path;
        const nextLink = url + nextRoute.path;
        
        if (currentRoute === -1) {
            history.push(`${
                url
                }${
                routes[0].path
                }${
                search
                }`);
        }

        return (
            <Switch>
                {routes.map(({ component: RouteChild, ...route }, i) => (
                    <Route
                        key={route.path}
                        {...route}
                        path={path + route.path}
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
        )
    }
}

export default withRouter(Navigator);
