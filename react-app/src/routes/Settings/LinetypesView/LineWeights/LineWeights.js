import React from 'react';

import {
    ApolloListWrapper
} from '../../../../components';

import LineWeightInfo from './LineWeightInfo';

import * as apolloProps from './line-weights-graphql';

export default function LineWeights() {
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Line Weight"
            extractList={({
                allLineWeights: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({ name }) => ({
                title: name,
            })}
            mapCreateVariables={({ }, { input }) => ({
                name: input,
                weight: 0,
            })}
            extractCreatedNID={({
                createLineWeight: {
                    lineWeight: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                name: input,
            })}
            extractName={({ name }) => name}
        >
            {({
                selectedItem: lineWeight,
                apollo: {
                    updateItem,
                },
            }) => (
                    <LineWeightInfo
                        {...{
                            lineWeight,
                            updateItem,
                        }}
                    />
                )}
        </ApolloListWrapper>
    );
}
