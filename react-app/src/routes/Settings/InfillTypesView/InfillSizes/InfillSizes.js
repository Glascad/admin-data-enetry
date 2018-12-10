import React from 'react';

import {
    ApolloListWrapper
} from '../../../../components';

import * as apolloProps from './infill-sizes-graphql';

export default function InfillSizes() {
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Infill Size"
            extractList={({
                allInfillPocketSizes: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({
                size,
            }) => ({
                title: `${size}"`,
            })}
            mapCreateVariables={({ }, { input }) => ({
                size: input,
            })}
            extractCreatedNID={({
                createInfillPocketSize: {
                    infillPocketSize: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                size: input,
            })}
            extractName={({ size }) => size}
        />
    );
}
