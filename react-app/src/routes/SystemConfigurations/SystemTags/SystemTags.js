import React from 'react';
import { ApolloListWrapper } from '../../../components';

import * as apolloProps from './system-tags-graphql';

export default function SystemTags() {
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="System Tag"
            extractList={({
                allSystemTags: {
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
                createSystemTag: {
                    systemTag: {
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
