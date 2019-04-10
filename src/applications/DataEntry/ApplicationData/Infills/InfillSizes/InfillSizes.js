import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
    TitleBar,
} from '../../../../../components';

import {
    query,
    mutations,
} from './infill-sizes-graphql';

import InfillSizesGenerator from './InfillSizesGenerator';

import './InfillSizes.scss';

export default function InfillSizes() {
    return (
        <ApolloWrapper
            query={query}
            mutations={mutations}
        >
            {({
                queryStatus: {
                    allInfillSizes = [],
                },
                mutations: {
                    createInfillSize,
                    deleteInfillSize,
                },
            }) => (
                    <>
                        <TitleBar
                            title="Infill Sizes"
                        />
                        <InfillSizesGenerator
                            createItem={createInfillSize}
                        />
                        <ListWrapper
                            items={allInfillSizes}
                            defaultPillProps={{
                                inputType: "number",
                            }}
                            mapPillProps={({ size }) => ({
                                title: size
                            })}
                            onCreate={(_, { input }) => createInfillSize({
                                size: +input,
                            })}
                            onDelete={({ arguments: { nodeId } }) => deleteInfillSize({
                                nodeId,
                            })}
                            deleteModal={{
                                name: "Infill Size",
                            }}
                        />
                    </>
                )}
        </ApolloWrapper>
    );
}
