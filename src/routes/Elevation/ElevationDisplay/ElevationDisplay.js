import React from 'react';

import Container from './Container';

import ElevationInterface from '../ElevationInterface/ElevationInterface';

export default function ElevationDisplay() {
    return (
        <ElevationInterface>
            {({
                elevation: {
                    nodeId,
                    vtRO,
                    hzRO,
                    elevationContainers,
                    sightline,
                },
            }) => (
                    <svg
                        className="ElevationDisplay"
                        transform="scale(1, -1)"
                        height={vtRO}
                        width={hzRO}
                    >
                        <circle
                            cx="0"
                            cy="0"
                            r="5"
                            fill="rgba(0, 0, 0, 0.25)"
                            stroke="black"
                        />
                        <Container
                            x={0}
                            y={0}
                            height={vtRO}
                            width={hzRO}
                            childContainers={elevationContainers.map(({ container }) => container)}
                            sightline={sightline}
                            horizontal={true}
                            nodeId={nodeId}
                        />
                    </svg>
                )}
        </ElevationInterface>
    );
}
