import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
} from '../../../../components';

import * as apolloProps from './orientations-graphql';


export default function Orientations() {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {({
                queryStatus: {
                    allOrientations = [],
                },
                mutations: {
                    createOrientation,
                    updateOrientation,
                    deleteOrientation,
                },
            }) => (
                    <ListWrapper
                        title="Part Orientations"
                        items={allOrientations}
                        mapPillProps={({ orientation }) => ({
                            title: orientation
                        })}
                        onCreate={({ }, { input }) => createOrientation({
                            orientation: input
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updateOrientation({
                            nodeId,
                            orientation: input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteOrientation({
                            nodeId
                        })}
                        deleteModal={{
                            name: " Orientation"
                        }}
                    />
                )}
        </ApolloWrapper>
    );
}
