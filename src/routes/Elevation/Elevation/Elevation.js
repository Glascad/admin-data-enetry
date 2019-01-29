import React, { Component } from 'react';

import dataModel from './data-model';

import Container from './Container';

import Frame from './Frame';

export default class Elevation extends Component {

    state = dataModel;

    render = () => {
        const {
            state: {
                elevation: {
                    hzRO,
                    vtRO,
                    elevationContainers,
                    sightline,
                },
            },
        } = this;

        return (
            <svg
                className="Elevation"
                transform="scale(1, -1)"
                height={vtRO + sightline * 6}
                width={hzRO + sightline * 6}
            >
                <Container
                    origin={[0, 0]}
                    corner={[hzRO, vtRO]}
                    // offset={{
                    //     x: sightline + 1,
                    //     y: sightline + 1,
                    // }}
                    // dimensions={{
                    //     x: hzRO,
                    //     y: vtRO,
                    // }}
                    childContainers={elevationContainers.map(({ container }) => container)}
                    sightline={sightline}
                    horizontal={true}
                />
            </svg>
        );
    }
}
