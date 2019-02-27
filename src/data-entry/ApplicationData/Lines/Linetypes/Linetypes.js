import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
} from '../../../../components';

import LinetypeInfo from './LinetypeInfo';

import './Linetypes.scss';

import {
    query,
    mutations,
} from './linetypes-graphql';

export default function Linetypes() {
    return (
        <ApolloWrapper
            query={query}
            mutations={mutations}
        >
            {({
                queryStatus: {
                    allLinetypes = [],
                    allLineWeights = [],
                },
                mutations: {
                    createLinetype,
                    updateLinetype,
                    deleteLinetype,
                },
            }) => (
                    <ListWrapper
                        titleBar={{
                            title: "Linetypes"
                        }}
                        items={allLinetypes}
                        mapPillProps={({ name }) => ({
                            title: name
                        })}
                        onCreate={(_, { input }) => createLinetype({
                            name: input,
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updateLinetype({
                            name: input,
                            nodeId,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteLinetype({
                            nodeId
                        })}
                        deleteModal={{
                            name: "Linetype"
                        }}
                    >
                        {linetype => (
                            <div className="unfinished">
                                LINETYPE INFO
                            </div>
                        )}
                    </ListWrapper>
                )}
        </ApolloWrapper>
    );
}