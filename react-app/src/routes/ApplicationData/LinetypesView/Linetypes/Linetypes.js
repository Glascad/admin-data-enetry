import React from 'react';

import {
    ApolloListWrapper,
    ApolloWrapper3,
    ListWrapper3,
} from '../../../../components';

import LinetypeInfo from './LinetypeInfo';

import {
    query,
    mutations,
} from './linetypes-graphql';

export default function Linetypes() {
    return (
        <ApolloWrapper3
            query={query}
            mutations={mutations}
        >
            {({
                queryStatus: {
                    linetypes,
                    lineWeights,
                },
                mutations: {
                    createLinetype,
                    updateLinetype,
                    deleteLinetype,
                },
            }) => (
                    <ListWrapper3
                        title="Linetypes"
                        items={linetypes}
                        mapPillProps={({ name }) => ({
                            title: name
                        })}
                        onCreate={({ }, { input }) => createLinetype({
                            name: input,
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updateLinetype({
                            name: input,
                            nodeId,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteLinetype({
                            nodeId
                        })}
                        deleteModal={{
                            name: "Linetype"
                        }}
                    >
                        {linetype => (
                            <span>LINETYPE INFO</span>
                            // <LinetypeInfo
                            //     {...{
                            //         linetype,
                            //         lineWeights,
                            //         updateLinetype,
                            //     }}
                            // />
                        )}
                    </ListWrapper3>
                )}
        </ApolloWrapper3>
        // <ApolloListWrapper
        //     apolloProps={apolloProps}
        //     itemClass="Linetype"
        //     extractList={({
        //         allLinetypes: {
        //             nodes = [],
        //         } = {},
        //     }) => nodes}
        //     mapPillProps={({ name }) => ({
        //         title: name,
        //     })}
        //     mapCreateVariables={({ }, { input }, { allLineWeights }) => ({
        //         name: input,
        //         lineWeight: allLineWeights.nodes[0].weight,
        //         pattern: "",
        //     })}
        //     extractCreatedNID={({
        //         createLinetype: {
        //             linetype: {
        //                 nodeId,
        //             },
        //         },
        //     }) => nodeId}
        //     mapUpdateVariables={({ input }) => ({
        //         name: input,
        //     })}
        //     extractName={({ name }) => name}
        // >
        //     {({
        //         selectedItem: linetype = {
        //             pattern: "",
        //         },
        //         data: {
        //             allLineWeights: {
        //                 nodes: lineWeights = [],
        //             } = {},
        //         } = {},
        //         apollo: {
        //             updateItem,
        //         },
        //     }) => linetype ? (
        //         <LinetypeInfo
        //             {...{
        //                 linetype,
        //                 lineWeights,
        //                 updateItem,
        //             }}
        //         />
        //     ) : null}
        // </ApolloListWrapper>
    );
}
