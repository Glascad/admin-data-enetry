import React from 'react';

import './Elevation.scss';

import {
    TitleBar,
} from '../../components';

import ElevationDisplay from './ElevationDisplay/ElevationDisplay';

export default function Elevation() {
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
