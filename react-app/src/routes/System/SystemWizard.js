import React from 'react';

import SystemInfo from './SystemInfo/SystemInfo';
import GlazingInfo from './GlazingInfo/GlazingInfo';
import ValidTypes from './ValidTypes/ValidTypes';
// import SystemCompatibility from './SystemCompatibility/SystemCompatibility';
import SystemOptions from './SystemOptions/SystemOptions';
// import InvalidCombinations from './InvalidCombinations/InvalidCombinations';

import {
    Batcher,
    Wizard,
} from '../../components';

import ApolloWrapper3 from '../../components/ApolloWrapper/ApolloWrapper3';

import query from './-graphql/query';
import mutations from './-graphql/mutations';

export default function ({ history, match: { url, path, params: { systemNID } } }) {
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
                                path={path}
                                url={url}
                                history={history}
                                batcher={batcher}
                                routes={[
                                    {
                                        path: `/system-info`,
                                        render: () => (
                                            <SystemInfo
                                                {...apollo}
                                            />
                                        ),
                                    },
                                    {
                                        path: `/glazing-info`,
                                        render: () => (
                                            <GlazingInfo
                                                {...apollo}
                                            />
                                        ),
                                    },
                                    {
                                        path: `/valid-types`,
                                        render: () => (
                                            <ValidTypes
                                                {...apollo}
                                            />
                                        ),
                                    },
                                    // {
                                    //     path: `/system-compatibility`,
                                    //     render: () => (
                                    //         "SYSTEMCOMPATIBILITY"
                                    //         // <SystemCompatibility
                                    //         //     {...apollo}
                                    //         // />
                                    //     ),
                                    // },
                                    {
                                        path: `/system-options`,
                                        render: () => (
                                            <SystemOptions
                                                {...apollo}
                                            />
                                        ),
                                    },
                                    {
                                        path: `/invalid-combinations`,
                                        render: () => (
                                            "INVALIDCOMBINATIONS"
                                            // <InvalidCombinations
                                            //     {...apollo}
                                            // />
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
