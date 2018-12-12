import React from 'react';

import {
    ApolloListWrapper,
    SelectionWrapper,
    HeadedListContainer,
} from '../../../components';

import * as apolloProps from './detail-types-graphql';
import * as configurationApolloProps from './configuration-types-graphql';

export default function ValidTypes({ match: { params: { systemNID } } }) {
    return (
        <ApolloListWrapper
            apolloProps={{
                ...apolloProps,
                queryVariables: { nodeId: systemNID },
            }}
            itemClass="Valid Detail Types"
            plural={false}
            extractList={({
                system: {
                    systemTypeBySystemTypeId: {
                        systemTypeDetailTypesBySystemTypeId: {
                            nodes = []
                        } = {}
                    } = {}
                } = {},
            }) => nodes}
            mapPillProps={({ detailTypeByDetailTypeId: { type } }) => ({
                title: type,
            })}
        >
            {({
                apollo: {
                    queryStatus: {
                        data,
                        data: {
                            system: {
                                systemTypeBySystemTypeId: {
                                    systemTypeDetailTypeConfigurationTypesBySystemTypeId: {
                                        nodes: systemTypeDetailTypeConfigurationTypes = []
                                    } = {}
                                } = {}
                            } = {}
                        }
                    }
                },
                selectedItem,
            }) => (
                    <ApolloListWrapper
                        n={console.log({
                            systemTypeDetailTypeConfigurationTypes,
                            selectedItem,
                        })}
                        apolloProps={{
                            ...configurationApolloProps,
                            batchMutations: true
                        }}
                        itemClass="Valid Configuration Types"
                        plural={false}
                        extractList={() => systemTypeDetailTypeConfigurationTypes
                            .filter(({
                                detailTypeByDetailTypeId: {
                                    nodeId
                                }
                            }) => nodeId === selectedItem.detailTypeByDetailTypeId.nodeId)
                        }
                        mapPillProps={({ configurationTypeByConfigurationTypeId: { type } }) => ({
                            title: type
                        })}
                    >

                    </ApolloListWrapper>
                )}
        </ApolloListWrapper>
    );
}
