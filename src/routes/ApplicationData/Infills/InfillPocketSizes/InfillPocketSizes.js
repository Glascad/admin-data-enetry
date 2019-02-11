import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
} from '../../../../components';

import {
    query,
    mutations,
} from './infill-pocket-sizes-graphql';

export default function InfillPocketSizes() {
    return (
        <ApolloWrapper
            query={query}
            mutations={mutations}
        >
            {({
                queryStatus: {
                    allInfillPocketSizes = [],
                },
                mutations: {
                    createInfillPocketSize,
                    deleteInfillPocketSize,
                },
            }) => (
                    <ListWrapper
                        titleBar={{
                            title: "Infill Pocket Sizes"
                        }}
                        items={allInfillPocketSizes}
                        defaultPillProps={{
                            inputType: "number"
                        }}
                        mapPillProps={({ size }) => ({
                            title: size
                        })}
                        onCreate={(_, { input }) => createInfillPocketSize({
                            size: +input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteInfillPocketSize({
                            nodeId
                        })}
                        deleteModal={{
                            name: "Infill Pocket Size",
                        }}
                    />
                )}
        </ApolloWrapper>
    );
}
