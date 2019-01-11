import React from 'react';

import {
    ApolloListWrapper
} from '../../../../components';

import * as apolloProps from './infill-types-graphql';


export default function InfillPocketTypes() {
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass={"Infill Pocket Type"}
            extractList={({
                allInfillPocketTypes: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({
                type,
            }) => ({
                title: type,
            })}
            mapCreateVariables={({ }, { input }) => ({
                type: input,
            })}
            extractCreatedNID={({
                createInfillPocketType: {
                    infillPocketType: {
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
