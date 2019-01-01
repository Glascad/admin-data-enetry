import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import './Wizard.scss';



class WizardChild extends Component {

    componentDidMount = () => this.props.updateCurrentRoute(this.props.index);

    componentWillUnmount = () => this.props.completeMutations();

    render = () => this.props.children;
}



export default class Wizard extends Component {

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
                    <Switch>
                        {routes.map((route, i) => (
                            <Route
                                {...route}
                                path={path + route.path}
                                render={routerProps => (
                                    <WizardChild
                                        key={route.path}
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
                </div>
            </div>
        );
    }
}
