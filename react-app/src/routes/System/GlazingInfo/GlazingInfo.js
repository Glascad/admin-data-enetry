import React from 'react';

import {
    Input,
    HeadedContainer,
} from '../../../components';

import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';


// import * as apolloProps from './glazing-info-graphql';
// import * as infillMaterialSizeApolloProps from './infill-material-sizes-graphql';
// import * as infillPocketTypeApolloProps from './infill-pocket-types-graphql';
// import * as infillPocketSizeApolloProps from './infill-pocket-sizes-graphql';

export default function GlazingInfo({
    queryStatus: {
        system: {
            nodeId: systemNID,
            id: systemId,
            defaultGlassBite,
            defaultGlassSize,
        },
        systemInfillSizes,
        allInfillSizes,
        systemInfillPocketTypes,
        allInfillPocketTypes,
    },
    mutations: {
        updateSystem,
        createSystemInfillSize,
        deleteSystemInfillSize,
        createSystemInfillPocketType,
        deleteSystemInfillPocketType,
    },
}) {
    console.log(arguments);
    return (
        <HeadedContainer
            title="Glazing Info"
        >
            <Input
                label="Glass Bite"
                value={defaultGlassBite}
                onChange={({ target: { value } }) => updateSystem({
                    nodeId: systemNID,
                    defaultGlassBite: value,
                })}
            />
            <ListWrapper3
                label="Infill Material Sizes"
                items={systemInfillSizes.map(({
                    nodeId: systemInfillSizeNID,
                    infillSizeByInfillSize,
                }) => ({
                    systemInfillSizeNID,
                    ...infillSizeByInfillSize,
                }))}
                multiSelect={{
                    allItems: allInfillSizes
                }}
                mapPillProps={({ size }) => ({
                    title: `${size}"`
                })}
                onCreate={infillSize => createSystemInfillSize({
                    systemId,
                    infillSize: infillSize.size,
                    infillSizeByInfillSize: infillSize,
                })}
                onDelete={({ systemInfillSizeNID, ...infillSize }) => deleteSystemInfillSize({
                    nodeId: systemInfillSizeNID,
                    systemId,
                    infillSize: infillSize.size,
                    infillSizeByInfillSize: infillSize,
                })}
            />
            <Input
                label="Default Infill Material Size"
                type="select"
                select={{
                    options: systemInfillSizes
                        .map(({ infillSizeByInfillSize: { size } }) => ({
                            value: size,
                            label: size,
                        })),
                    value: {
                        label: defaultGlassSize,
                        value: defaultGlassSize,
                    },
                    onChange: ({ value }) => updateSystem({
                        nodeId: systemNID,
                        defaultGlassSize: value,
                    }),
                }}
            />
            <ListWrapper3
                label="Infill Pocket Types"
                items={systemInfillPocketTypes
                    .map(({
                        nodeId,
                        infillPocketTypeByInfillPocketTypeId
                    }) => ({
                        systemInfillPocketTypeNID: nodeId,
                        ...infillPocketTypeByInfillPocketTypeId,
                    }))}
                multiSelect={{
                    allItems: allInfillPocketTypes
                }}
                mapPillProps={({ type }) => ({
                    title: type,
                })}
                onCreate={infillPocketType => createSystemInfillPocketType({
                    systemId,
                    infillPocketTypeId: infillPocketType.id,
                    infillPocketTypeByInfillPocketTypeId: infillPocketType,
                })}
                onDelete={({ systemInfillPocketTypeNID, ...infillPocketType }) => deleteSystemInfillPocketType({
                    nodeId: systemInfillPocketTypeNID,
                    systemId,
                    infillPocketTypeId: infillPocketType.id,
                    infillPocketTypeByInfillPocketTypeId: infillPocketType,
                })}
            />
            <ListWrapper3
                label="Infill Pocket Sizes"
                items={[]}
                mapPillProps={({ }) => ({

                })}
            />
            {[
                // {
                //     label: "Infill Material Sizes",
                //     multiSelectList: {
                //         apolloProps: infillMaterialSizeApolloProps,
                //         mapCreateVariables: ({ size: infillSize }, { system: { id: systemId } }) => ({
                //             systemId,
                //             infillSize,
                //         }),
                //         mapDeleteVariables: ({ systemInfillSizeNID }) => ({
                //             nodeId: systemInfillSizeNID,
                //         }),
                //         extractItems: ({
                //             system: {
                //                 systemInfillSizesBySystemId: {
                //                     nodes = []
                //                 } = {}
                //             } = {}
                //         }) => nodes.map(({
                //             nodeId: systemInfillSizeNID,
                //             infillSizeByInfillSize: infillSize,
                //         }) => ({
                //             systemInfillSizeNID,
                //             ...infillSize,
                //         })),
                //         extractAllItems: ({
                //             allInfillSizes: {
                //                 nodes = []
                //             } = {}
                //         }) => nodes,
                //         mapListPillProps: ({ size, ...obj }) => ({
                //             title: size,
                //         }),
                //         mapModalPillProps: ({ size, ...obj }) => ({
                //             title: size,
                //         }),
                //     },
                // },
                // {
                //     label: "Default Infill Material Size",
                //     type: "select",
                //     extractValue: ({
                //         system: {
                //             defaultGlassSize = 0
                //         } = {}
                //     }) => ({
                //         value: defaultGlassSize,
                //         label: defaultGlassSize,
                //     }),
                //     extractOptions: ({
                //         allInfillSizes: {
                //             nodes = []
                //         } = {}
                //     }) => nodes.map(({ size }) => ({
                //         value: size,
                //         label: size,
                //     })),
                // },
                // {
                //     label: "Infill Pocket Types",
                //     multiSelectList: {
                //         apolloProps: infillPocketTypeApolloProps,
                //         mapCreateVariables: ({ id: infillPocketTypeId }, { system: { id: systemId } }) => ({
                //             systemId,
                //             infillPocketTypeId,
                //         }),
                //         mapDeleteVariables: ({ systemInfillPocketTypeNID }) => ({
                //             nodeId: systemInfillPocketTypeNID,
                //         }),
                //         extractItems: ({
                //             system: {
                //                 systemInfillPocketTypesBySystemId: {
                //                     nodes = []
                //                 } = {}
                //             } = {}
                //         }) => nodes.map(item => console.log(item) || item).map(({
                //             nodeId: systemInfillPocketTypeNID,
                //             infillPocketTypeByInfillPocketTypeId: infillPocketType,
                //         }) => ({
                //             systemInfillPocketTypeNID,
                //             ...infillPocketType,
                //         })),
                //         extractAllItems: ({
                //             allInfillPocketTypes: {
                //                 nodes = []
                //             } = {}
                //         }) => nodes,
                //         mapListPillProps: ({ type }) => ({
                //             title: type,
                //         }),
                //         mapModalPillProps: ({ type }) => ({
                //             title: type,
                //         }),
                //     },
                // },
                // {
                //     label: "Infill Pocket Sizes",
                //     multiSelectList: {
                //         apolloProps: infillPocketSizeApolloProps,
                //         mapCreateVariables: ({ size: infillPocketSize }, { system: { id: systemId } }) => ({
                //             systemId,
                //             infillPocketSize,
                //         }),
                //         mapDeleteVariables: ({ systemInfillPocketSizeNID }) => ({
                //             nodeId: systemInfillPocketSizeNID,
                //         }),
                //         extractItems: ({
                //             system: {
                //                 systemInfillPocketSizesBySystemId: {
                //                     nodes = []
                //                 } = {}
                //             } = {}
                //         }) => nodes.map(({
                //             nodeId: systemInfillPocketSizeNID,
                //             infillPocketSizeByInfillPocketSize: infillPocketSize,
                //         }) => ({
                //             systemInfillPocketSizeNID,
                //             ...infillPocketSize,
                //         })),
                //         extractAllItems: ({
                //             allInfillPocketSizes: {
                //                 nodes = []
                //             } = {}
                //         }) => nodes,
                //         mapListPillProps: ({ size }) => ({
                //             title: size,
                //         }),
                //         mapModalPillProps: ({ size }) => ({
                //             title: size,
                //         }),
                //     }
                // },
            ].map(() => null)}
        </HeadedContainer>
        // <div className="card">
        //     <ApolloInputWrapper
        //         apolloProps={{
        //             ...apolloProps,
        //             queryVariables: { nodeId: systemNID }
        //         }}
        //         title="Glazing Info"
        //         mapUpdateVariables={({
        //             "Glass Bite": defaultGlassBite,
        //             "Default Infill Material Size": {
        //                 value: defaultGlassSize,
        //             },
        //         }) => ({
        //             nodeId: systemNID,
        //             defaultGlassBite,
        //             defaultGlassSize,
        //         })}
        //         inputs={}
        //     />
        // </div>
    );
}
