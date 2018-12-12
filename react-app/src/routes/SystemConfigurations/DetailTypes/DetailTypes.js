import React from 'react';
import { ApolloListWrapper } from '../../../components';

import * as apolloProps from './detail-types-graphql';

import DetailTypeInfo from './DetailTypeInfo';

export default function DetailTypes() {
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Detail Type"
            extractList={({
                allDetailTypes: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({ type }) => ({
                title: type,
            })}
            mapCreateVariables={({ }, { input }) => ({
                type: input,
                vertical: false,
                entrance: false,
            })}
            extractCreatedNID={({
                createDetailType: {
                    detailType: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                type: input,
            })}
            extractName={({ type }) => type}
        >
            {({
                apollo: {
                    updateItem,
                },
                selectedItem,
            }) => (
                    <DetailTypeInfo
                        detailType={selectedItem}
                        updateDetailType={updateItem}
                    />
                )}
        </ApolloListWrapper>
    );
}
