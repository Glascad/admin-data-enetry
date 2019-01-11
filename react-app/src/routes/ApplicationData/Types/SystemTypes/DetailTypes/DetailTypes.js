import React from 'react';

import { ApolloListWrapper } from '../../../../../components';

import * as apolloProps from './detail-types-graphql';

import ConfigurationTypes from './ConfigurationTypes/ConfigurationTypes';

export default function DetailTypes({
    systemType,
    systemType: {
        id: systemTypeId,
        type,
        systemTypeDetailTypesBySystemTypeId: {
            nodes: systemTypeDetailTypes
        }
    }
}) {

    const previousItems = systemTypeDetailTypes
        .map(({
            nodeId: systemTypeDetailTypeNID,
            detailTypeByDetailTypeId: detailType,
        }) => ({
            systemTypeDetailTypeNID,
            ...detailType,
        }));

    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Detail Type"
            parentItem={type}
            extractList={() => previousItems}
            mapPillProps={({ type }) => ({
                title: type,
            })}
            extractName={({ type }) => type}
            canSelect={true}
            multiSelect={{
                extractAllItems: ({
                    allDetailTypes: {
                        nodes = []
                    } = {}
                }) => nodes,
                mapPillProps: ({ type }) => ({
                    title: type,
                }),
            }}
            mapCreateVariables={({ id: detailTypeId }) => ({
                systemTypeId,
                detailTypeId,
            })}
            mapDeleteVariables={({ systemTypeDetailTypeNID: nodeId }) => ({
                nodeId
            })}
        >
            {({ selectedItem }) => (
                selectedItem.nodeId ? (
                    <ConfigurationTypes
                        systemType={systemType}
                        detailType={selectedItem}
                    />
                ) : null
            )}
        </ApolloListWrapper>
    );
}