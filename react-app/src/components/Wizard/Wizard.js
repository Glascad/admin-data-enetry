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
            "both",
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
                buttons,
                routes,
                routerProps: {
                    history,
                    location: {
                        search,
                    },
                    match: {
                        path,
                        url,
                    }
                },
                batcher: {
                    completeMutations,
                    resetMutations,
                },
            },
            updateCurrentRoute,
        } = this;

        if (currentRoute === -1) {
            history.push(`${
                url
                }${
                routes[0].path
                }${
                search
                }`);
        }

        const prevIndex = currentRoute - 1;
        const nextIndex = currentRoute + 1;

        const prevRoute = routes[prevIndex];
        const nextRoute = routes[nextIndex];

        return (
            <div className={`Wizard ${
                navigation === "tabs" || navigation === "both"
                    ?
                    "with-tabs"
                    :
                    ""
                }`} >
                <header>
                    <h1>{title}</h1>
                    <div className="title-buttons">
                        {buttons}
                        <button
                            onClick={resetMutations}
                            className="empty"
                        >
                            Reset
                        </button>
                        <button
                            onClick={completeMutations}
                            className="primary"
                        >
                            Save
                        </button>
                    </div>
                </header>
                {navigation === "tabs" || navigation === "both" ? (
                    <div className="tab-container">
                        {routes.map(route => (
                            <NavLink
                                isActive={(_, { pathname }) => pathname == `${url}${route.path}`}
                                to={`${
                                    url
                                    }${
                                    route.path
                                    }${
                                    search
                                    }`}
                                className="tab"
                                activeClassName="current-tab"
                            >
                                {route.name}
                            </NavLink>
                        ))}
                    </div>
                ) : null}
                <div
                    className="card"
                // className={`card ${
                //     navigation === "tabs" || navigation === "both" ?
                //         "with-tabs"
                //         :
                //         ""
                //     }`}
                >
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
                                        history={history}
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
                    {navigation === "linear" || navigation === "both" ? (
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
                                {prevRoute ? (
                                    <Link
                                        to={url + prevRoute.path}
                                    >
                                        <button
                                            className="empty"
                                        >
                                            {
                                                // prevRoute.name
                                                // ||
                                                "Previous"
                                            }
                                        </button>
                                    </Link>
                                ) : null}
                                {nextRoute ? (
                                    <Link
                                        to={url + nextRoute.path}
                                    >
                                        <button
                                            className="primary"
                                        >
                                            {
                                                // nextRoute.name
                                                // ||
                                                "Next"
                                            }
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
