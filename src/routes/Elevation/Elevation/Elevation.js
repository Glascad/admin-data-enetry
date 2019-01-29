import React, { Component } from 'react';

import dataModel from './data-model';

import Container from './Container';

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
                transform="scale(1, -1)"
                height={vtRO + sightline * 4}
                width={hzRO + sightline * 4}
            >
                <Container
                    offset={{
                        x: sightline + 1,
                        y: sightline + 1,
                    }}
                    dimensions={{
                        x: hzRO,
                        y: vtRO,
                    }}
                    childContainers={elevationContainers.map(({ container }) => container)}
                    sightline={sightline}
                    horizontal={true}
                />
            </svg>
        );
    }
}
