import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './Viewport.scss';
import routes from './routes/routes';
import ViewportHeader from './ViewportHeader';

const createRoute = ({ path, component, exact }, parentPath) => (
    <Route
        exact={exact}
        path={typeof parentPath === 'string' ? parentPath + path.slice(1) : path}
        component={component}
    />
);

function Viewport() {
    return (
        <div id="Viewport">
            <ViewportHeader />
            <Switch>
                {routes.map(({ subroutes = [], ...route }) => [
                    createRoute(route),
                    ...subroutes.map(subroute => createRoute(subroute, route.path))
                ])}
            </Switch>
        </div>
    );
}

export default withRouter(Viewport);