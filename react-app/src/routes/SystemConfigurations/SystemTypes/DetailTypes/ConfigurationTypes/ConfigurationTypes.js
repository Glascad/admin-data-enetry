import React from 'react';

import { ApolloListWrapper } from '../../../../../components';

import * as apolloProps from './configuration-types-graphql';

import ConfigurationTypeInfo from './ConfigurationTypeInfo/ConfigurationTypeInfo';

export default function ConfigurationTypes({
    systemType,
    systemType: {
        type: systemTypeName,
        id: systemTypeId,
        systemTypeDetailTypeConfigurationTypesBySystemTypeId: {
            nodes: systemTypeDetailTypeConfigurationTypes
        }
    },
    detailType,
    detailType: {
        id: detailTypeId,
        type: detailTypeName,
    }
}) {

    const previousItems = systemTypeDetailTypeConfigurationTypes
        .map(({
            nodeId: systemTypeDetailTypeConfigurationTypeNID,
            detailTypeId,
            configurationTypeByConfigurationTypeId: configurationType,
        }) => ({
            systemTypeDetailTypeConfigurationTypeNID,
            detailTypeId,
            ...configurationType,
        }))
        .filter(item => item.detailTypeId === detailTypeId);
    
    console.log(arguments);

    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Configuration Type"
            parentItems={[systemTypeName, detailTypeName]}
            extractList={() => previousItems}
            mapPillProps={({ type }) => ({
                title: type,
            })}
            extractName={({ type }) => type}
            multiSelect={{
                extractAllItems: ({
                    allConfigurationTypes: {
                        nodes = []
                    } = {}
                }) => nodes,
                mapPillProps: ({ type }) => ({
                    title: type,
                }),
            }}
            mapCreateVariables={({ id: configurationTypeId }) => ({
                systemTypeId,
                detailTypeId,
                configurationTypeId,
            })}
            mapDeleteVariables={({ systemTypeDetailTypeConfigurationTypeNID: nodeId }) => ({
                nodeId
            })}
        >
            {({ selectedItem }) => (
                <ConfigurationTypeInfo
                    systemType={systemType}
                    detailType={detailType}
                    configurationType={selectedItem}
                />
            )}
        </ApolloListWrapper>
    );
}