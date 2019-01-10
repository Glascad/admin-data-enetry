import React from 'react';

import CreateSystem from './CreateSystem/CreateSystem';
import CopySystem from './CopySystem/CopySystem';

import {
    Batcher,
    Wizard,
} from '../../../components';

import ApolloWrapper3 from '../../../components/ApolloWrapper/ApolloWrapper3';

import query from './-graphql/query';
import mutations from './-graphql/mutations';

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
                            <Wizard
                                title={"New System"}
                                routerProps={arguments[0]}
                                batcher={batcher}
                                navigation="both"
                                routes={[
                                    {
                                        name: "Create System",
                                        path: `/create`,
                                        render: () => (
                                            <CreateSystem
                                                {...{
                                                    queryStatus,
                                                    mutations,
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        name: "Copy System",
                                        path: `/copy`,
                                        render: () => (
                                            <CopySystem
                                                {...{
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
