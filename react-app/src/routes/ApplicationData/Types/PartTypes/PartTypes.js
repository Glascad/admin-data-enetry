import React from 'react';
import { ApolloListWrapper } from '../../../../components';

import * as apolloProps from './part-types-graphql';

export default function PartTypes() {
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Part Type"
            extractList={({
                allPartTypes: {
                    nodes = [],
                } = {},
            }) => nodes}
            canSelect={false}
            mapPillProps={({ type }) => ({
                title: type,
            })}
            mapCreateVariables={({ }, { input }) => ({
                type: input,
            })}
            extractCreatedNID={({
                createPartType: {
                    partType: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                type: input,
            })}
            extractName={({ type }) => type}
        />
    );
}
