import React from 'react';
import {
    ApolloWrapper,
    ListWrapper
} from '../../../../../components';

import * as apolloProps from './part-types-graphql';

export default function PartTypes() {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {({
                queryResult: {
                    allPartTypes = [],
                },
                mutations: {
                    createPartType,
                    updatePartType,
                    deletePartType,
                },
            }) => (
                    <ListWrapper
                        title="Part Types"
                        items={allPartTypes}
                        mapPillProps={({ type }) => ({
                            title: type
                        })}
                        onCreate={(_, { input }) => createPartType({
                            type: input
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updatePartType({
                            nodeId,
                            type: input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deletePartType({
                            nodeId
                        })}
                        deleteModal={{
                            name: "Part Type"
                        }}
                    />
                )}
        </ApolloWrapper>
    );
}
