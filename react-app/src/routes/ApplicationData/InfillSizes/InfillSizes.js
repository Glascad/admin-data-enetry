import React from 'react';

import {
    // ApolloListWrapper,
    ApolloWrapper3,
    ListWrapper3,
    HeadedContainer,
} from '../../../components';

import {
    query,
    mutations,
} from './infill-sizes-graphql';

import InfillSizesGenerator from './InfillSizesGenerator';

import './InfillSizes.scss';

export default function InfillSizes() {
    return (
        // "Infill Sizes"
        <ApolloWrapper3
            query={query}
            mutations={mutations}
        >
            {({
                queryStatus: {
                    infillSizes
                },
                mutations: {
                    createInfillSize,
                    deleteInfillSize,
                },
            }) => (
                    <HeadedContainer
                        title="Infill Sizes"
                    >
                        <InfillSizesGenerator
                            createItem={createInfillSize}
                        />
                        <ListWrapper3
                            items={infillSizes}
                            defaultPillProps={{
                                inputType: "number",
                            }}
                            mapPillProps={({ size }) => ({
                                title: size
                            })}
                            onCreate={({ }, { input }) => createInfillSize({
                                size: input,
                            })}
                            onDelete={({ arguments: { nodeId } }) => deleteInfillSize({
                                nodeId,
                            })}
                            deleteModal={{
                                name: "Infill Size",
                            }}
                        />
                    </HeadedContainer>
                )}
        </ApolloWrapper3>
    );
}
