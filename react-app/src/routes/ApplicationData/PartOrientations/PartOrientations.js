import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
} from '../../../components';

import * as apolloProps from './part-orientations-graphql';


export default function PartOrientations() {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {({
                queryStatus: {
                    orientations,
                },
                mutations: {
                    createOrientation,
                    updateOrientation,
                    deleteOrientation,
                },
            }) => (
                    <ListWrapper
                        title="Part Orientations"
                        items={orientations}
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
                            name: "Part Orientation"
                        }}
                    />
                )}
        </ApolloWrapper>
    );
}
