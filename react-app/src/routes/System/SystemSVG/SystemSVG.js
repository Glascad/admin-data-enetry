import React from 'react';

import ApolloWrapper3 from '../../../components/ApolloWrapper/ApolloWrapper3';

import query from '../-graphql/query';
import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';
import HeadedContainer from '../../../components/HeadedContainer/HeadedContainer';

export default function SystemSVG({
    match: {
        params: {
            systemNID
        }
    }
}) {
    return (
        <div className="card">
            <ApolloWrapper3
                query={{
                    ...query,
                    variables: {
                        nodeId: systemNID,
                    },
                }}
            >
                {({
                    queryStatus: {
                        system,
                        systemOptions,
                        systemTypeDetailTypes,
                        systemTypeDetailTypeConfigurationTypes,
                        ...data
                    }
                }) => {
                    console.log({
                        system,
                        systemOptions,
                        systemTypeDetailTypes,
                        systemTypeDetailTypeConfigurationTypes,
                        data,
                    })

                    return (
                        <HeadedContainer
                            title="System Level Options"
                        >
                            {systemOptions
                                .filter(({ presentationLevel }) => presentationLevel === 1)
                                .map(({
                                    name,
                                    optionValuesBySystemOptionId: {
                                        nodes: values,
                                    }
                                }) => (
                                        <ListWrapper3
                                            label={name}
                                            items={values}
                                            mapPillProps={({ name }) => ({
                                                title: name
                                            })}
                                        />
                                    ))}
                            <ListWrapper3
                                title="Detail Types"
                                items={systemTypeDetailTypes}
                                mapPillProps={({
                                    detailTypeByDetailTypeId: {
                                        type
                                    }
                                }) => ({
                                    title: type,
                                })}
                            >
                                {({
                                    detailTypeByDetailTypeId: {
                                        nodeId: selectedDetailTypeNID = "",
                                        type = "",
                                        ...detailType
                                    } = {},
                                    ...data
                                }) => (
                                        <ListWrapper3
                                            n={console.log({
                                                selectedDetailTypeNID,
                                                type,
                                                detailType,
                                                data
                                            })}
                                            title={`Detail Level Options - ${type}`}
                                            items={systemOptions.filter(({
                                                presentationLevel,
                                                systemOptionConfigurationTypesBySystemOptionId: {
                                                    nodes: configurationTypes,
                                                }
                                            }) => (
                                                    presentationLevel >= 2
                                                    &&
                                                    configurationTypes.some(({
                                                        configurationTypeByConfigurationTypeId: {
                                                            nodeId
                                                        }
                                                    }) => systemTypeDetailTypeConfigurationTypes.some(({
                                                        detailTypeByDetailTypeId: {
                                                            nodeId: detailTypeNID,
                                                        },
                                                        configurationTypeByConfigurationTypeId: {
                                                            nodeId: configurationTypeNID,
                                                        }
                                                    }) => (
                                                            detailTypeNID === selectedDetailTypeNID
                                                            &&
                                                            configurationTypeNID === nodeId
                                                        )
                                                    ))
                                                )
                                            )}
                                            mapPillProps={({ name }) => ({
                                                title: name
                                            })}
                                        >
                                            {({ }) => (
                                                ""
                                            )}
                                        </ListWrapper3>
                                    )}
                            </ListWrapper3>
                        </HeadedContainer>
                    );
                }}
            </ApolloWrapper3>
        </div >
    );
}
