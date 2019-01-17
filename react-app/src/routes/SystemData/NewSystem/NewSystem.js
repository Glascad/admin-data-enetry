import React from 'react';

import CreateSystem from './CreateSystem/CreateSystem';
import CopySystem from './CopySystem/CopySystem';

import {
    Batcher,
    TabNavigator,
    ApolloWrapper,
} from '../../../components';

import query from './new-system-graphql/query';
import mutations from './new-system-graphql/mutations';

export default function Database() {
    return (
        <Batcher>
            {batcher => (
                <ApolloWrapper
                    batcher={batcher}
                    mutations={mutations}
                    query={query}
                >
                    {apollo => (
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
                                                    ...apollo,
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
                                                    ...apollo,
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                            />
                        )
                    }
                </ApolloWrapper>
            )}
        </Batcher>
    );
}
