import React from 'react';

import {
    Link,
} from 'react-router-dom';

import {
    Batcher,
    ToggleNavigator,
    ApolloWrapper,
} from '../../../components';

import query from './system-graphql/query';
import mutations from './system-graphql/mutations';

import { parseSearch } from '../../../utils';

import SystemDatabase from './SystemDatabase/SystemDatabase';
import SystemDetails from './SystemDetails/SystemDetails';

export default function SystemToggle({
    location: {
        search,
    },
}) {

    const { systemNID } = parseSearch(search);

    return (
        <Batcher>
            {batcher => (
                <ApolloWrapper
                    batcher={batcher}
                    mutations={mutations}
                    query={{
                        ...query,
                        variables: {
                            nodeId: systemNID
                        },
                    }}
                >
                    {apollo => {
                        const {
                            queryStatus: {
                                system: {
                                    name: systemName = "",
                                    manufacturer: {
                                        name: mnfgName = ""
                                    } = {},
                                } = {},
                            }
                        } = apollo;

                        return (
                            <ToggleNavigator
                                title={(
                                    <>
                                        <span>
                                            {`${
                                                mnfgName
                                                } ${
                                                systemName
                                                }`.trim()
                                                ||
                                                'Loading...'}
                                        </span>
                                        <Link
                                            to="/system-data"
                                        >
                                            <button className="empty">
                                                Change System
                                            </button>
                                        </Link>
                                    </>
                                )}
                                routes={[
                                    {
                                        name: "Database",
                                        path: "/database",
                                        render: () => (
                                            <SystemDatabase
                                                {...apollo}
                                                batcher={batcher}
                                            />
                                        ),
                                    },
                                    {
                                        name: "Details",
                                        path: "/details",
                                        render: () => (
                                            <SystemDetails
                                                {...apollo}
                                            />
                                        ),
                                    }
                                ]}
                            />
                        );
                    }}
                </ApolloWrapper>
            )}
        </Batcher>
    );
}