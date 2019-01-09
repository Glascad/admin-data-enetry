import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Link,
    NavLink,
    Route,
    Switch,
} from 'react-router-dom';

import './Wizard.scss';



class WizardChild extends Component {

    componentDidMount = () => this.props.updateCurrentRoute(this.props.index);

    componentWillUnmount = () => this.props.completeMutations();

    render = () => this.props.children || "It looks like you found an invalid route";
}



export default class Wizard extends Component {

    static propTypes = {
        title: PropTypes.string,
        path: PropTypes.string,
        url: PropTypes.string,
        buttons: PropTypes.array,
        routes: PropTypes.array.isRequired,
        batcher: PropTypes.object,
        navigation: PropTypes.oneOf([
            "tabs",
            "linear",
        ]),
    };

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
                navigation = "linear",
                title,
                path,
                url,
                buttons,
                routes,
                batcher: {
                    completeMutations,
                    resetMutations,
                },
            },
            updateCurrentRoute,
        } = this;

        const prevRoute = currentRoute - 1;
        const nextRoute = currentRoute + 1;

        const prevPath = (routes[prevRoute] || {}).path;
        const nextPath = (routes[nextRoute] || {}).path;

        return (
            <div className="Wizard" >
                <header>
                    <h1>{title}</h1>
                    <div className="title-buttons">
                        {buttons}
                        <button
                            onClick={completeMutations}
                            className="primary"
                        >
                            Save
                        </button>
                    </div>
                </header>
                <div className="card">
                    {navigation === "tabs" ? (
                        <div className="tabs">
                            {routes.map(route => (
                                <NavLink
                                    to={url + route.path}
                                    className="tab"
                                    activeClassName="current-tab"
                                >
                                    {route.name}
                                </NavLink>
                            ))}
                        </div>
                    ) : null}
                    <Switch>
                        {routes.map((route, i) => (
                            <Route
                                key={route.path}
                                {...route}
                                path={path + route.path}
                                render={routerProps => (
                                    <WizardChild
                                        completeMutations={completeMutations}
                                        index={i}
                                        updateCurrentRoute={updateCurrentRoute}
                                    >
                                        {route.render ?
                                            route.render(routerProps)
                                            :
                                            <route.component {...routerProps} />
                                        }
                                    </WizardChild>
                                )}
                            />
                        ))}
                        <WizardChild
                            completeMutations={completeMutations}
                            index={-1}
                            updateCurrentRoute={updateCurrentRoute}
                            route={{
                                render: () => "It looks like nothing was matched",
                            }}
                        />
                    </Switch>
                    {navigation === "linear" ? (
                        <div
                            className="bottom-buttons"
                        >
                            <button
                                className="empty"
                                onClick={resetMutations}
                            >
                                Reset
                        </button>
                            <div
                                className="buttons-right"
                            >
                                {prevPath ? (
                                    <Link
                                        to={url + prevPath}
                                    >
                                        <button
                                            className="empty"
                                        >
                                            Previous
                                    </button>
                                    </Link>
                                ) : null}
                                {nextPath ? (
                                    <Link
                                        to={url + nextPath}
                                    >
                                        <button
                                            className="primary"
                                        >
                                            Next
                                    </button>
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}
