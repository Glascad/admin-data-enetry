import React from 'react';

import {
    ApolloWrapper3,
    ListWrapper3,
} from '../../../../components';

import {
    query,
    mutations,
} from './infill-sizes-graphql';

export default function InfillPocketSizes() {
    return (
        <ApolloWrapper3
            query={query}
            mutations={mutations}
        >
            {({
                queryStatus: {
                    infillPocketSizes,
                },
                mutations: {
                    createInfillPocketSize,
                    deleteInfillPocketSize,
                },
            }) => (
                    <ListWrapper3
                        title="Infill Pocket Sizes"
                        items={infillPocketSizes}
                        defaultPillProps={{
                            inputType: "number"
                        }}
                        mapPillProps={({ size }) => ({
                            title: size
                        })}
                        onCreate={({ }, { input }) => createInfillPocketSize({
                            size: input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteInfillPocketSize({
                            nodeId
                        })}
                        deleteModal={{
                            name: "Infill Pocket Size",
                        }}
                    />
                )}
        </ApolloWrapper3>
    );
}
