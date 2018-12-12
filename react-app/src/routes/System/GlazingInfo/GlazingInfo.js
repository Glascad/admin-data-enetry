import React from 'react';

import { ApolloBatchedWrapper } from '../../../components';

import * as apolloProps from './glazing-info-graphql';
import * as infillMaterialSizeApolloProps from './infill-material-sizes-graphql';
import * as infillPocketTypeApolloProps from './infill-pocket-types-graphql';
import * as infillPocketSizeApolloProps from './infill-pocket-sizes-graphql';

export default function GlazingInfo({ match: { params: { systemNID } } }) {
    return (
        <ApolloBatchedWrapper
            apolloProps={{
                ...apolloProps,
                queryVariables: { nodeId: systemNID }
            }}
            title="Glazing Info"
            mapUpdateVariables={({
                "Glass Bite": defaultGlassBite,
                "Default Infill Material Size": {
                    value: defaultGlassSize,
                },
            }) => ({
                nodeId: systemNID,
                defaultGlassBite,
                defaultGlassSize,
            })}
            inputs={[
                {
                    label: "Glass Bite",
                    extractValue: ({
                        system: {
                            defaultGlassBite = ""
                        } = {}
                    }) => defaultGlassBite
                },
                {
                    label: "Infill Material Sizes",
                    multiSelectList: {
                        apolloProps: infillMaterialSizeApolloProps,
                        mapCreateVariables: ({ size: infillSize }, { system: { id: systemId } }) => ({
                            systemId,
                            infillSize,
                        }),
                        mapDeleteVariables: ({ systemInfillSizeNID }) => ({
                            nodeId: systemInfillSizeNID,
                        }),
                        extractItems: ({
                            system: {
                                systemInfillSizesBySystemId: {
                                    nodes = []
                                } = {}
                            } = {}
                        }) => nodes.map(({
                            nodeId: systemInfillSizeNID,
                            infillSizeByInfillSize: infillSize,
                        }) => ({
                            systemInfillSizeNID,
                            ...infillSize,
                        })),
                        extractAllItems: ({
                            allInfillSizes: {
                                nodes = []
                            } = {}
                        }) => nodes,
                        mapListPillProps: ({ size, ...obj }) => ({
                            title: size,
                        }),
                        mapModalPillProps: ({ size, ...obj }) => ({
                            title: size,
                        }),
                    },
                },
                {
                    label: "Default Infill Material Size",
                    type: "select",
                    extractValue: ({
                        system: {
                            defaultGlassSize = 0
                        } = {}
                    }) => ({
                        value: defaultGlassSize,
                        label: defaultGlassSize,
                    }),
                    extractOptions: ({
                        allInfillSizes: {
                            nodes = []
                        } = {}
                    }) => nodes.map(({ size }) => ({
                        value: size,
                        label: size,
                    })),
                },
                {
                    label: "Infill Pocket Types",
                    multiSelectList: {
                        apolloProps: infillPocketTypeApolloProps,
                        mapCreateVariables: ({ id: infillPocketTypeId }, { system: { id: systemId } }) => ({
                            systemId,
                            infillPocketTypeId,
                        }),
                        mapDeleteVariables: ({ systemInfillPocketTypeNID }) => ({
                            nodeId: systemInfillPocketTypeNID,
                        }),
                        extractItems: ({
                            system: {
                                systemInfillPocketTypesBySystemId: {
                                    nodes = []
                                } = {}
                            } = {}
                        }) => nodes.map(item => console.log(item) || item).map(({
                            nodeId: systemInfillPocketTypeNID,
                            infillPocketTypeByInfillPocketTypeId: infillPocketType,
                        }) => ({
                            systemInfillPocketTypeNID,
                            ...infillPocketType,
                        })),
                        extractAllItems: ({
                            allInfillPocketTypes: {
                                nodes = []
                            } = {}
                        }) => nodes,
                        mapListPillProps: ({ type }) => ({
                            title: type,
                        }),
                        mapModalPillProps: ({ type }) => ({
                            title: type,
                        }),
                    },
                },
                {
                    label: "Infill Pocket Sizes",
                    multiSelectList: {
                        apolloProps: infillPocketSizeApolloProps,
                        mapCreateVariables: ({ size: infillPocketSize }, { system: { id: systemId } }) => ({
                            systemId,
                            infillPocketSize,
                        }),
                        mapDeleteVariables: ({ systemInfillPocketSizeNID }) => ({
                            nodeId: systemInfillPocketSizeNID,
                        }),
                        extractItems: ({
                            system: {
                                systemInfillPocketSizesBySystemId: {
                                    nodes = []
                                } = {}
                            } = {}
                        }) => nodes.map(({
                            nodeId: systemInfillPocketSizeNID,
                            infillPocketSizeByInfillPocketSize: infillPocketSize,
                        }) => ({
                            systemInfillPocketSizeNID,
                            ...infillPocketSize,
                        })),
                        extractAllItems: ({
                            allInfillPocketSizes: {
                                nodes = []
                            } = {}
                        }) => nodes,
                        mapListPillProps: ({ size }) => ({
                            title: size,
                        }),
                        mapModalPillProps: ({ size }) => ({
                            title: size,
                        }),
                    }
                },
            ]}
        />
    );
}



// import React from 'react';

// import { ApolloBatchedWrapper } from '../../../components';

// import * as apolloProps from './glazing-info-graphql';
// import * as infillMaterialSizeApolloProps from './infill-material-sizes-graphql';
// import * as infillPocketTypeApolloProps from './infill-pocket-types-graphql';

// const log = arg => console.log(arg) || arg;

// export default function GlazingInfo({ match: { params: { systemNID } } }) {
//     return (
//         <ApolloBatchedWrapper
//             apolloProps={{
//                 ...apolloProps,
//                 queryVariables: { nodeId: systemNID }
//             }}
//             title="Glazing Info"
//             mapUpdateVariables={({
//                 "Glass Bite": defaultGlassBite,
//                 "Default Infill Material Size": {
//                     value: defaultGlassSize,
//                 },
//             }) => ({
//                 nodeId: systemNID,
//                 defaultGlassBite,
//                 defaultGlassSize,
//             })}
//         >
//             {InputComponent => (
//                 <>
//                     {/* <InputComponent
//                         label="Glass Bite"
//                         extractValue={({
//                             system: {
//                                 defaultGlassBite = ""
//                             } = {}
//                         }) => log(defaultGlassBite)}
//                     /> */}
//                     <InputComponent
//                         label="Infill Material Sizes"
//                         multiSelectList={{
//                             apolloProps: infillMaterialSizeApolloProps,
//                             mapCreateVariables: ({ size: infillSize }, { system: { id: systemId } }) => ({
//                                 systemId,
//                                 infillSize,
//                             }),
//                             mapDeleteVariables: ({ systemInfillSizeNID }) => ({
//                                 nodeId: systemInfillSizeNID,
//                             }),
//                             extractItems: ({
//                                 system: {
//                                     systemInfillSizesBySystemId: {
//                                         nodes = []
//                                     } = {}
//                                 } = {}
//                             }) => log(nodes.map(({
//                                 nodeId: systemInfillSizeNID,
//                                 infillSizeByInfillSize: infillSize,
//                                 }) => ({
//                                 systemInfillSizeNID,
//                                 ...infillSize,
//                             }))),
//                             extractAllItems: ({
//                                 allInfillSizes: {
//                                     nodes = []
//                                 } = {}
//                             }) => nodes,
//                             mapListPillProps: ({ size, ...obj }) => ({
//                                 title: size,
//                                 // n: console.log("GOT DEFAULT GLASS BITE", obj)
//                             }),
//                             mapModalPillProps: ({ size, ...obj }) => ({
//                                 title: size,
//                                 // n: console.log("GOT DEFAULT GLASS BITE", obj)
//                             }),
//                         }}
//                         extractValue={({
//                             system: {
//                                 systemInfillSizesBySystemId: {
//                                     size = 0
//                                 } = {}
//                             } = {}
//                         }) => log({
//                             value: size,
//                             label: size,
//                         })}
//                         extractOptions={({
//                             allGlazingTypes: {
//                                 nodes = []
//                             } = {}
//                         }) => nodes.map(({ id, type }) => ({
//                             value: id,
//                             label: type,
//                         }))}
//                     />
//                     {/* <InputComponent
//                         label="Default Infill Material Size"
//                         type="select"
//                         extractValue={({
//                             system: {
//                                 defaultGlassSize = ""
//                             } = {}
//                         }) => defaultGlassSize}
//                         extractOptions={({
//                             allInfillSizes: {
//                                 nodes = []
//                             } = {}
//                         }) => nodes.map(({ size }) => ({
//                             value: size,
//                             label: size,
//                         }))}
//                     /> */}
//                     {/* <InputComponent
//                         label="Infill Pocket Types"
//                         multiSelectList={{
//                             apolloProps: infillPocketTypeApolloProps,
//                             mapCreateVariables: ({ id: glazingTagId }, { glazing: { id: glazingId } }) => ({
//                                 glazingId,
//                                 glazingTagId,
//                             }),
//                             mapDeleteVariables: ({ glazingGlazingTagNID, ...arg }) => ({
//                                 nodeId: glazingGlazingTagNID,
//                             }),
//                             extractItems: ({
//                                 glazing: {
//                                     glazingGlazingTagsByGlazingId: {
//                                         nodes = []
//                                     } = {}
//                                 } = {}
//                             }) => console.log("GOT INFILL POCKET TYPES", nodes) || nodes.map(({
//                                 nodeId: glazingGlazingTagNID,
//                                 glazingTagByGlazingTagId: glazingTag,
//                             }) =>  ({
//                                 glazingGlazingTagNID,
//                                 ...glazingTag,
//                             })),
//                             extractAllItems: ({
//                                 allGlazingTags: {
//                                     nodes = []
//                                 } = {}
//                             }) => nodes,
//                             mapListPillProps: ({ type }) => ({
//                                 title: type,
//                             }),
//                             mapModalPillProps: ({ type }) => ({
//                                 title: type,
//                             }),
//                         }}
//                     /> */}
//                     {/* <InputComponent
//                         label="Infill Pocket Types"
//                         type="number"
//                         extractValue={({
//                             glazing: {
//                                 depth = 0
//                             } = {}
//                         }) => depth}
//                     /> */}
//                     {/* <InputComponent
//                         label="Infill Pocket Sizes"
//                         type="number"
//                         extractValue={({
//                             glazing: {
//                                 defaultSightline = 0
//                             } = {}
//                         }) => defaultSightline}
//                     /> */}
//                     {/* <InputComponent
//                         label="Caulk Joint Size"
//                         type="number"
//                         extractValue={({
//                             glazing: {
//                                 shimSize = 0,
//                             } = {}
//                         }) => shimSize}
//                     /> */}
//                 </>
//             )}
//         </ApolloBatchedWrapper>
//     );
// }
