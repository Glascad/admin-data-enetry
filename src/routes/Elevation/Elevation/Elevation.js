import React from 'react';

import Container from './Container';

import {
    SelectionWrapper, ApolloBatcher,
} from '../../../components';

import query from '../elevation-graphql/query';

export default function Elevation() {
    return (
        <SelectionWrapper>
            {({
                selectedNID,
                handleSelect,
            }) => (
                    <ApolloBatcher
                        query={{query}}
                    >
                        {({
                            queryStatus,
                            queryStatus: {
                                elevation,
                                elevation: {
                                    nodeId,
                                    hzRO,
                                    vtRO,
                                    elevationContainers = [],
                                    sightline,
                                } = {},
                            } = {},
                            mutations: {

                            } = {},
                        }) => (
                                <svg
                                    className="Elevation"
                                    transform="scale(1, -1)"
                                    height={vtRO + sightline * 6}
                                    width={hzRO + sightline * 6}
                                >
                                    {console.log(queryStatus)}
                                    <Container
                                        origin={[0, 0]}
                                        corner={[hzRO, vtRO]}
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
