import React from 'react';

import './Elevation.scss';

import {
    TitleBar,
} from '../../components';

import ElevationDisplay from './ElevationDisplay/ElevationDisplay';


function ElevationRouter() {
    return (
        <>
            <TitleBar
                title="Elevation"
            />
            <div className="card">
                <ElevationDisplay />
            </div>
        </>
    );
}

export default {
    name: "Elevation",
    path: "/elevation",
    component: ElevationRouter,
};
