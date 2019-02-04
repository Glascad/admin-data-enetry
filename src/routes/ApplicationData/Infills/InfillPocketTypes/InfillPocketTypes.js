import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
} from '../../../../components';

import {
    query,
    mutations,
} from './infill-types-graphql';


export default function InfillPocketTypes() {
    return (
        <ApolloWrapper
            query={query}
            mutations={mutations}
        >
            {({
                queryStatus: {
                    allInfillPocketTypes = [],
                },
                mutations: {
                    createInfillPocketType,
                    updateInfillPocketType,
                    deleteInfillPocketType,
                },
            }) => (
                    <ListWrapper
                        titleBar={{
                            title: "Infill Pocket Types"
                        }}
                        items={allInfillPocketTypes}
                        mapPillProps={({ type }) => ({
                            title: type
                        })}
                        onCreate={(_, { input }) => createInfillPocketType({
                            type: input,
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updateInfillPocketType({
                            nodeId,
                            type: input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteInfillPocketType({
                            nodeId,
                        })}
                        deleteModal={{
                            name: "Infill Pocket Type"
                        }}
                    />
                )}
        </ApolloWrapper>
    );
}
