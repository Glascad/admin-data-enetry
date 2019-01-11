import React from 'react';

import {
    ApolloListWrapper
} from '../../../components';

import * as apolloProps from './part-orientations-graphql';


export default function PartOrientations() {
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Part Orientation"
            extractList={({
                allOrientations: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({ orientation }) => ({
                title: orientation,
            })}
            mapCreateVariables={({ }, { input }) => ({
                orientation: input,
            })}
            extractCreatedNID={({
                createOrientation: {
                    orientation: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                orientation: input,
            })}
            extractName={({ orientation }) => orientation}
        />
    );
}
