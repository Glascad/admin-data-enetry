import React from 'react';

import {
    Link,
} from 'react-router-dom';

import {
    ApolloBatcher,
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
        <ApolloBatcher
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
                        titleBar={{
                            title: `${
                                mnfgName
                                } ${
                                systemName
                                }`.trim()
                                ||
                                'Loading...',
                            left: (
                                <Link
                                    to="/system-data"
                                >
                                    <button className="empty">
                                        Change System
                                            </button>
                                </Link>
                            )
                        }}
                        routes={[
                            {
                                name: "Database",
                                path: "/database",
                                render: () => (
                                    <SystemDatabase
                                        {...apollo}
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
        </ApolloBatcher>
    );
}