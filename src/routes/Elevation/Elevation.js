import React, { Component } from 'react';

import {
    TitleBar,
} from '../../components';

import Elevation from './Elevation/Elevation';


function ElevationRouter() {
    return (
        <>
            <TitleBar
                title="Elevation"
            />
            <div className="card">
                <Elevation />
            </div>
        </>
    );
}

export default {
    name: "Elevation",
    path: "/elevation",
    component: ElevationRouter,
};
