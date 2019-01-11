import React from 'react';

import {
    ApolloListWrapper
} from '../../../../components';

import * as apolloProps from './infill-sizes-graphql';

export default function InfillPocketSizes() {
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Infill Pocket Size"
            extractList={({
                allInfillPocketSizes: {
                    nodes = [],
                } = {},
            }) => nodes}
            defaultPillProps={{
                inputType: "number"
            }}
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
