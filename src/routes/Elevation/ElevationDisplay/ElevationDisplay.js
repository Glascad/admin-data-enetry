import React from 'react';

import Container from './Container';

import {
    SelectionWrapper, ApolloBatcher,
} from '../../../components';

import query from '../elevation-graphql/query';

import data from './data-model';

export default function ElevationDisplay() {
    return (
        <SelectionWrapper>
            {({
                selectedNID,
                handleSelect,
            }) => (
                    <ApolloBatcher
                        query={{ query }}
                    >
                        {({
                            queryStatus,
                            queryStatus: {
                                elevation = data.elevation,
                                elevation: {
                                    nodeId,
                                    hzRO,
                                    vtRO,
                                    elevationContainers = [],
                                    sightline,
                                } = data.elevation,
                            } = data,
                            mutations: {

                            } = {},
                        }) => (
                                <svg
                                    className="ElevationDisplay"
                                    transform="scale(1, -1)"
                                    height={vtRO + sightline * 6}
                                    width={hzRO + sightline * 6}
                                >
                                    {console.log(queryStatus)}
                                    <Container
                                        x={0}
                                        y={0}
                                        height={vtRO}
                                        width={hzRO}
                                        childContainers={elevationContainers.map(({ container }) => container)}
                                        sightline={sightline}
                                        horizontal={true}
                                        nodeId={nodeId}
                                        selectedNID={selectedNID}
                                        handleSelect={handleSelect}
                                    />
                                </svg>
                            )}
                    </ApolloBatcher>
                )}
        </SelectionWrapper>
    );
}
