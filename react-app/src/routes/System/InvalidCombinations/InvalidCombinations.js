import React from 'react';

import {
    Wizard,
} from '../../../components';

import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';

import { query, mutations } from './invalid-combinations-graphql';

export default function ValidTypes({ match: { params: { systemNID } } }) {
    return (
        <Wizard
            mutations={mutations}
            query={{
                query,
                variables: {
                    nodeId: systemNID,
                },
                mapQueryToProps: ({
                    data: {
                        system: {
                            optionCombinationsBySystemId: {
                                nodes: optionCombinations = [],
                            } = {},
                            systemOptionsBySystemId: {
                                nodes: systemOptions = [],
                            } = {},
                            ...system
                        } = {}
                    } = {}
                }) => ({
                    system,
                    systemOptions,
                    optionCombinations,
                })
            }}
        >
            {({
                queryStatus: {
                    system: {
                        id: systemId,
                    },
                    system,
                    systemOptions,
                    optionCombinations,
                },
                // mutations: {}
            }) => (
                    <ListWrapper3
                        title="Invalid Combinations"
                        items={optionCombinations}
                        mapPillProps={({
                            optionCombinationConfigurationTypesByOptionCombinationId: {
                                nodes: configurationTypes,
                            },
                            optionCombinationOptionValuesByOptionCombinationId: {
                                nodes: optionValues,
                            },
                        }) => ({
                            title: configurationTypes.map(({
                                configurationTypeByConfigurationTypeId: {
                                    type
                                }
                            }) => (
                                    <span key={type}>{type}</span>
                                )),
                            children: optionValues.map(({
                                optionValueByOptionValueId: {
                                    systemOptionBySystemOptionId: {
                                        name: optionName
                                    },
                                    name: optionValueName,
                                }
                            }) => (
                                    <span>{optionName}: {optionValueName}</span>
                                )),
                        })}
                    >
                        {({ }) => (
                            <>
                                <ListWrapper3
                                    title="Configuration Types"
                                    items={[]}
                                >

                                </ListWrapper3>
                                <ListWrapper3
                                    title="Options"
                                    items={[]}
                                >

                                </ListWrapper3>
                            </>
                        )}
                    </ListWrapper3>
                )}
        </Wizard>
    );
}
