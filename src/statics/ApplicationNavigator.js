import React from 'react';

import {
    Navigator,
} from '../components';

import dataEntryRoutes from '../data-entry/routes';
import glascadRoutes from '../glascad/routes';

import Sidebar from './Sidebar/Sidebar';
import Viewport from './Viewport/Viewport';

const Statics = ({ routes }) => (
    <>
        <Sidebar
            routes={routes}
        />
        <div id="Viewport">
            <Navigator
                routes={routes}
            />
        </div>
    </>
);

const DataEntry = () => <Statics routes={dataEntryRoutes} />;

const GlasCAD = () => <Statics routes={glascadRoutes} />;

GlasCAD.navigationOptions = {
    name: "GlasCAD",
    path: "/glascad",
};

export default function ApplicationNavigator() {
    return (
        <Navigator
            routes={[
                DataEntry,
                GlasCAD,
            ]}
        />
    );
}
