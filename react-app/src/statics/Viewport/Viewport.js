import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import './Viewport.scss';
import routes from '../../routes/routes';
// import ViewportHeader from './ViewportHeader';
import { Card } from '../../components';

const createRoute = ({ path, component, exact }, parentPath) => (
    <Route
        exact={exact}
        path={typeof parentPath === 'string' ? parentPath + path : path}
        component={component}
    />
);

function Viewport({
    location: {
        pathname
    }
}) {
    const matchedRoute = routes.reduce((match, route) => {
        const {
            exact,
            path: parentPath,
            subroutes = []
        } = route;
        return match || (
            (exact ?
                pathname === parentPath
                :
                pathname.includes(parentPath))
            &&
            route
            ||
            subroutes.find(({
                exact,
                path: childPath,
            }) => (exact ?
                pathname === parentPath + childPath
                :
                pathname.includes(parentPath + childPath)
                ))
        )
    }, null);

    const {
        component: {
            headerProps = {}
        } = {}
    } = matchedRoute || {};
    return (
        <div id="Viewport">
            {/* <ViewportHeader
                {...headerProps}
            /> */}
            <Card>
                <Switch>
                    {routes.map(({ subroutes = [], ...route }) => [
                        createRoute(route),
                        ...subroutes.map(subroute => createRoute(subroute, route.path))
                    ])}
                </Switch>
            </Card>
        </div>
    );
}

export default withRouter(Viewport);