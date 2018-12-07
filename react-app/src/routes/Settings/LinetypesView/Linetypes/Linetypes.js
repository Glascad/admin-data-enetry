import React from 'react';

import { CRUDListWrapper } from '../../../../components';

import LinetypeInfo from './LinetypeInfo';

import * as CRUDProps from './linetypes-graphql';

export default function Linetypes() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="Linetype"
            extractList={({
                allLinetypes: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({ name }) => ({
                title: name,
            })}
            mapCreateVariables={({ }, { input }, { data }) => ({
                name: input,
                lineWeight: data.allLineWeights.nodes[0].weight,
                pattern: "",
            })}
            extractCreatedNID={({
                createLinetype: {
                    linetype: {
                        nodeId,
                    },
                },
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                name: input,
            })}
            extractName={({ name }) => name}
        >
            {({
                selectedItem: linetype,
                data: {
                    allLineWeights: {
                        nodes: lineWeights = [],
                    } = {},
                } = {},
                CRUD: {
                    updateItem,
                },
            }) => (
                    <LinetypeInfo
                        {...{
                            linetype,
                            lineWeights,
                            updateItem,
                        }}
                    />
                )}
        </CRUDListWrapper>
    )
}
