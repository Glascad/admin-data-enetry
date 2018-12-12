import React from 'react';

import { ApolloListWrapper } from '../../../components';

import * as apolloProps from './infill-sizes-graphql';

import InfillSizesGenerator from './InfillSizesGenerator';

import './InfillSizes.scss';

export default function InfillSizes() {
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Infill Size"
            renderBeforeList={({
                apollo: {
                    createItem,
                },
            }) => (
                    <InfillSizesGenerator
                        createItem={createItem}
                    />
                )}
            sortItems={({ size: a }, { size: b }) => (+a - +b)}
            extractList={({
                allInfillSizes: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({
                size,
            }) => ({
                title: size,
            })}
            mapCreateVariables={({ }, { input }) => ({
                size: input,
            })}
            extractCreatedNID={({
                createInfillSize: {
                    infillSize: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                size: input,
            })}
            extractName={({ size }) => size}
        />
    )
}
