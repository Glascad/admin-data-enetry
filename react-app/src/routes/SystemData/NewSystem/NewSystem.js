import React from 'react';

import CreateSystem from './CreateSystem/CreateSystem';
import CopySystem from './CopySystem/CopySystem';

import {
    Batcher,
    TabNavigator,
    ApolloWrapper3,
} from '../../../components';

import query from './new-system-graphql/query';
import mutations from './new-system-graphql/mutations';

import { parseSearch } from '../../../utils';

export default function Database({
    history,
    location: {
        search
    },
    match: {
        url,
        path,
    }
}) {
    const { systemNID } = parseSearch(search);

    console.log(arguments);

    return (
        <Batcher>
            {batcher => (
                <ApolloWrapper3
                    batcher={batcher}
                    mutations={mutations}
                    query={query}
                >
                    {({
                        queryStatus,
                        queryStatus: {
                            allSystems,
                        },
                        mutations,
                        mutations: {

                        }
                    }) => (
                            <TabNavigator
                                routes={[
                                    {
                                        name: "Create System",
                                        path: `/create`,
                                        render: routerProps => (
                                            <CreateSystem
                                                {...{
                                                    routerProps,
                                                    batcher,
                                                    queryStatus,
                                                    mutations,
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        name: "Copy System",
                                        path: `/copy`,
                                        render: routerProps => (
                                            <CopySystem
                                                {...{
                                                    routerProps,
                                                    batcher,
                                                    queryStatus,
                                                    mutations,
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                            />
                        )
                    }
                </ApolloWrapper3>
            )}
        </Batcher>
    );
}
