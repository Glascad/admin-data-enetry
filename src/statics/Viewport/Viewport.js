import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './Viewport.scss';
import routes from './routes';

const createRoute = ({}) => (
    <Route com />
);

function Viewport() {
    return (
        <div id="Viewport">
            <Switch>
                {routes.map(route => (
                    route.subroutes ?
                        route.subroutes.map(createRoute)
                        :
                        createRoute(route)
                ))}
            </Switch>
        </div>
    );
}

export default withRouter(Viewport);