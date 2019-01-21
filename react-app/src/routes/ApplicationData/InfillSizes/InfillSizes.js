import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
    HeadedContainer,
} from '../../../components';

import {
    query,
    mutations,
} from './infill-sizes-graphql';

import InfillSizesGenerator from './InfillSizesGenerator';

import './InfillSizes.scss';
import TitleBar from '../../../components/ui/TitleBar/TitleBar';

export default function InfillSizes() {
    return (
        // "Infill Sizes"
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
                    </>
                )}
        </ApolloWrapper>
    );
}
