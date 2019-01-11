import React from 'react';

import SystemInfo from './SystemInfo/SystemInfo';
import GlazingInfo from './GlazingInfo/GlazingInfo';
import ValidTypes from './ValidTypes/ValidTypes';
// import SystemCompatibility from './SystemCompatibility/SystemCompatibility';
import SystemOptions from './SystemOptions/SystemOptions';
import InvalidCombinations from './InvalidCombinations/InvalidCombinations';

import {
    Batcher,
    Wizard,
    TabNavigator,
    Toggle,
} from '../../../components';

import ApolloWrapper3 from '../../../components/ApolloWrapper/ApolloWrapper3';

import query from './database-graphql/query';
import mutations from './database-graphql/mutations';

import { parseSearch } from '../../../utils';

export default function SystemDatabase({
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
                                    <h1>
                                        {`${mnfgName} ${systemName}`.trim()
                                            ||
                                            'Loading...'}
                                    </h1>
                                    <Toggle
                                        buttons={[
                                            {
                                                text: "Database Editor",
                                                selected: true,
                                            },
                                            {
                                                text: "Details Editor",
                                                onClick: () => history.push(`/system-data/details${search}`)
                                            }
                                        ]}
                                    />
                                </header>
                                <TabNavigator
                                    routes={[
                                        {
                                            name: "System Info",
                                            path: `/system-info`,
                                            render: () => (
                                                <SystemInfo
                                                    {...apollo}
                                                />
                                            ),
                                        },
                                        {
                                            name: "Glazing Info",
                                            path: `/glazing-info`,
                                            render: () => (
                                                <GlazingInfo
                                                    {...apollo}
                                                />
                                            ),
                                        },
                                        {
                                            name: "Valid Types",
                                            path: `/valid-types`,
                                            render: () => (
                                                <ValidTypes
                                                    {...apollo}
                                                />
                                            ),
                                        },
                                        // {
                                        // name: "System Compatibility",
                                        //     path: `/system-compatibility`,
                                        //     render: () => (
                                        //         "SYSTEMCOMPATIBILITY"
                                        //         // <SystemCompatibility
                                        //         //     {...apollo}
                                        //         // />
                                        //     ),
                                        // },
                                        {
                                            name: "System Options",
                                            path: `/system-options`,
                                            render: () => (
                                                <SystemOptions
                                                    {...apollo}
                                                />
                                            ),
                                        },
                                        {
                                            name: "Invalid Combinations",
                                            path: `/invalid-combinations`,
                                            render: () => (
                                                <InvalidCombinations
                                                    {...apollo}
                                                />
                                            ),
                                        },
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
