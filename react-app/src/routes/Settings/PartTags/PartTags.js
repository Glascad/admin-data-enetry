import React from 'react';
import { ApolloListWrapper } from '../../../components';

import * as apolloProps from './part-tags-graphql';

export default function PartTags() {
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Part Tag"
            extractList={({
                allPartTags: {
                    nodes = [],
                } = {},
            }) => nodes}
            canSelect={false}
            mapPillProps={({ tag }) => ({
                title: tag,
            })}
            mapCreateVariables={({ }, { input }) => ({
                tag: input,
            })}
            extractCreatedNID={({
                createPartTag: {
                    partTag: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                tag: input,
            })}
            extractName={({ tag }) => tag}
        />
    );
}
