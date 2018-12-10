import React, { Component } from 'react';

// import {
//     ApolloWrapper,
//     HeadedContainer,
//     Input,
// } from '../../../components';

import { ApolloBatchedWrapper } from '../../../components';

import * as apolloProps from './system-info-graphql';

import SystemTags from './SystemTags';

export default function SystemInfo({ match: { params: { systemNID } } }) {
    return (
        <ApolloBatchedWrapper
            apolloProps={{
                ...apolloProps,
                queryVariables: { systemNID }
            }}
            inputs={[
                {
                    label: "Name",
                    extractValue: ({
                        system: {
                            name = ""
                        } = {}
                    }) => name,
                },
                {
                    label: "System Type",
                    type: "select",
                    extractValue: ({
                        system: {
                            systemTypeBySystemTypeId: {
                                id = 0,
                                type = ""
                            } = {}
                        } = {}
                    }) => ({
                        value: id,
                        label: type,
                    }),
                    extractOptions: ({
                        allSystemTypes: {
                            nodes = []
                        } = {}
                    }) => nodes.map(({ id, type }) => ({
                        value: id,
                        label: type,
                    }))
                },
                {
                    label: "System Tags",
                    multiSelect: {
                        extractItems: () => []
                    }
                },
                {
                    label: "System Depth",
                    type: "number",
                    extractValue: ({
                        system: {
                            depth = 0
                        } = {}
                    }) => depth,
                },
                {
                    label: "System Sightline",
                    type: "number",
                    extractValue: ({
                        system: {
                            defaultSightline = 0
                        } = {}
                    }) => defaultSightline,
                },
                {
                    label: "Caulk Joint Size",
                    type: "number",
                    extractValue: ({
                        system: {
                            shimSize = 0,
                        } = {}
                    }) => shimSize,
                }
            ]}
        />
    );
}

// class SystemInfo extends Component {

//     state = {};

//     componentDidUpdate = () => {

//     }

//     render = () => {
//         console.log(this);
//         const {
//             state: {

//             },
//             props: {
//                 apollo,
//                 apollo: {
//                     queryStatus: {
//                         data: {
//                             system,
//                             system: {
//                                 nodeId,
//                                 id,
//                                 name = "",
//                                 depth = 0,
//                                 defaultSightline,
//                                 shimSize,
//                                 systemTypeBySystemTypeId: systemType = {},
//                                 systemTagsBySystemId: systemTags = [],
//                             } = {},
//                         } = {}
//                     }
//                 },
//             }
//         } = this;

//         console.log(apollo);
//         console.log({
//             system,
//             systemType,
//             systemTags,
//         });

//         return (
//             <HeadedContainer
//                 title="System Info"
//             >
//                 <Input
//                     label="Name"
//                     value={name}
//                     onChange={() => { }}
//                 />
//                 <Input
//                     label="System Type"
//                     value={systemType.type}
//                     onChange={() => { }}
//                 />
//                 <SystemTags
//                     systemTags={systemTags}
//                 />
//                 <div style={{ display: 'flex' }}>
//                     <Input
//                         label="System Depth"
//                         value={depth}
//                         onChange={() => { }}
//                     />
//                     <Input
//                         label="System Sightline"
//                         value={defaultSightline}
//                         onChange={() => { }}
//                     />
//                 </div>
//                 <Input
//                     label="Caulk Joint Size"
//                     value={shimSize}
//                     onChange={() => { }}
//                 />
//             </HeadedContainer>
//         );
//     }
// }

// export default ({ match: { params: { systemNID } } }) => (
//     <ApolloWrapper
//         {...apolloProps}
//         queryVariables={{
//             systemNID
//         }}
//     >
//         {apollo => (
//             <SystemInfo
//                 apollo={apollo}
//             />
//         )}
//     </ApolloWrapper>
// )
