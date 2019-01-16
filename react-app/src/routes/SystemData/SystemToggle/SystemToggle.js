import React from 'react';
import {
    Route,
    Link,
} from 'react-router-dom';

import {
    Batcher,
    Toggle,
    Navigator,
} from '../../../components';

import ApolloWrapper3 from '../../../components/ApolloWrapper/ApolloWrapper3';

import query from './system-graphql/query';
import mutations from './system-graphql/mutations';

import { parseSearch } from '../../../utils';

import SystemDatabase from './SystemDatabase/SystemDatabase';
import SystemDetails from './SystemDetails/SystemDetails';

export default function SystemInfo({
    history,
    location: {
        search,
        pathname,
    },
}) {

    const { systemNID } = parseSearch(search);

    return (
        <Batcher>
            {batcher => (
                <ApolloWrapper3
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
                        console.log({ apollo });
                        const {
                            queryStatus: {
                                system: {
                                    name: systemName = "",
                                },
                                manufacturer: {
                                    name: mnfgName = ""
                                },
                            }
                        } = apollo;

                        return (
                            <>
                                <header>
                                    <div>
                                        <h1>
                                            {`${mnfgName} ${systemName}`.trim()
                                                ||
                                                'Loading...'}
                                        </h1>
                                        <Link
                                            to="/system-data"
                                        >
                                            <button className="empty">
                                                Change System
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="right-buttons">
                                        <Toggle
                                            buttons={[
                                                {
                                                    text: "Database Editor",
                                                    selected: pathname.includes('database'),
                                                    onClick: () => history.push(`/system-data/info/database${search}`)
                                                },
                                                {
                                                    text: "Details Editor",
                                                    selected: pathname.includes('details'),
                                                    onClick: () => history.push(`/system-data/info/details${search}`)
                                                }
                                            ]}
                                        />
                                    </div>
                                </header>
                                <Navigator
                                    routes={[
                                        {
                                            path: "/database",
                                            render: () => (
                                                <SystemDatabase
                                                    {...apollo}
                                                    batcher={batcher}
                                                />
                                            ),
                                        },
                                        {
                                            path: "/details",
                                            render: () => (
                                                <SystemDetails
                                                    {...apollo}
                                                />
                                            ),
                                        }
                                    ]}
                                />
                            </>
                        );
                    }}
                </ApolloWrapper3>
            )}
        </Batcher>
    );
}