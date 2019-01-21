import React from 'react';

import CreateSystem from './CreateSystem/CreateSystem';
import CopySystem from './CopySystem/CopySystem';

import {
    ApolloBatcher,
    TabNavigator,
    ApolloWrapper,
} from '../../../components';

import query from './new-system-graphql/query';
import mutations from './new-system-graphql/mutations';

export default function Database() {
    return (
        <ApolloBatcher
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
                                        ...apollo,
                                    }}
                                />
                            ),
                        },
                    ]}
                />
            )}
        </ApolloBatcher>
    );
}
