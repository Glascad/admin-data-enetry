import React, { Component } from 'react';

import {
    TitleBar,
} from '../../components';

import dataModel from './data-model';

import Container from './Container';

class Elevation extends Component {

    state = dataModel;

    render = () => {

        const {
            state: {
                elevation: {
                    name = "",
                    hzRo = 0,
                    vtRo = 0,
                    sightline = 16,
                    elevationContainers = [],
                },
            },
        } = this;

        return (
            <>
                <TitleBar
                    title="Elevation"
                    selections={[name]}
                />
                <div className="card">
                    <svg
                        height={vtRo * 4}
                        width={hzRo * 2}
                        fill="none"
                        transform="scale(1, -1)"
                        style={{
                            // background: "rgba(0, 127, 255, 0.25)"
                        }}
                    >
                        {/* <path
                            d={}
                        /> */}
                        {elevationContainers
                            .reduce(({ all = [], offset = 0 }, { container }) => ({
                                all: all.concat({
                                    container,
                                    offset,
                                }),
                                offset: +offset + +container.DLO + +sightline,
                            }), {})
                            .all
                            .map(({ container, offset }, i, arr) => (
                                <Container
                                    key={container.id}
                                    container={container}
                                    parentDLO={hzRo}
                                    horizontalParent={true}
                                    parentOffset={0}
                                    sightline={sightline}
                                    drawFrames={i === 0 ? [
                                        "left",
                                        "right",
                                        "top",
                                        "bottom",
                                    ] : [
                                            "right",
                                            "top",
                                            "bottom",
                                        ]}
                                    // offset={0}
                                    offset={offset}
                                />
                            ))}
                        {/* <Container
                            container={{
                                containers: [{}]
                            }}
                        /> */}
                    </svg>
                </div>
            </>
        );
    }
}

export default {
    name: "Elevation",
    path: "/elevation",
    component: Elevation,
};
