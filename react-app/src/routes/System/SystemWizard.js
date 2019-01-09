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
} from '../../components';

import ApolloWrapper3 from '../../components/ApolloWrapper/ApolloWrapper3';

import query from './-graphql/query';
import mutations from './-graphql/mutations';

import { parseSearch } from '../../utils';

export default function ({
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
                                    name: systemName,
                                },
                                manufacturer: {
                                    name: mnfgName
                                },
                            }
                        } = apollo;

                        return (
                            <Wizard
                                title={`${
                                    mnfgName || 'Loading...'
                                    } ${
                                    systemName || ''
                                    }`}
                                routerProps={arguments[0]}
                                batcher={batcher}
                                navigation="both"
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
                        );
                    }}
                </ApolloWrapper3>
            )}
        </Batcher>
    );
}
