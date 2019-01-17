import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
    HeadedContainer,
    Input,
} from '../../../../components';

import * as apolloProps from './line-weights-graphql';

export default function LineWeights() {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {({
                queryStatus: {
                    allLineWeights = [],
                },
                mutations: {
                    createLineWeight,
                    updateLineWeight,
                    deleteLineWeight,
                },
            }) => (
                    <ListWrapper
                        title="Line Weights"
                        items={allLineWeights}
                        mapPillProps={({ name }) => ({
                            title: name,
                        })}
                        onCreate={({ }, { input }) => createLineWeight({
                            name: input,
                            weight: 1 + +allLineWeights.reduce((max, { weight }) => Math.max(max, weight), 0)
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updateLineWeight({
                            name: input,
                            nodeId,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteLineWeight({
                            nodeId,
                        })}
                        deleteModal={{
                            name: "Line Weight"
                        }}
                    >
                        {({
                            nodeId,
                            name,
                            weight = 0,
                        }) => (
                                <HeadedContainer
                                    title={`Line Weight - ${name || ''}`}
                                >
                                    <Input
                                        label="Weight (mm)"
                                        type="number"
                                        initialValue={weight}
                                        onBlur={({ target: { value } }) => updateLineWeight({
                                            weight: value,
                                            nodeId,
                                        })}
                                    />
                                </HeadedContainer>
                            )}
                    </ListWrapper>
                )}
        </ApolloWrapper>
    );
}
