import React from 'react';

import { ApolloBatchedWrapper } from '../../../components';

import * as apolloProps from './glazing-info-graphql';
import * as infillMaterialSizeApolloProps from './infill-material-sizes-graphql';
import * as infillPocketTypeApolloProps from './infill-pocket-types-graphql';

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
        >
            {InputComponent => (
                <>
                    <InputComponent
                        label="Glass Bite"
                        extractValue={({
                            system: {
                                defaultGlassBite = ""
                            } = {}
                        }) => defaultGlassBite}
                    />
                    <InputComponent
                        label="Infill Material Sizes"
                        multiSelectList={{
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
                                // n: console.log(obj)
                            }),
                            mapModalPillProps: ({ size, ...obj }) => ({
                                title: size,
                                // n: console.log(obj)
                            }),
                        }}
                        extractValue={({
                            system: {
                                systemInfillSizesBySystemId: {
                                    size = 0
                                } = {}
                            } = {}
                        }) => ({
                            value: size,
                            label: size,
                        })}
                        extractOptions={({
                            allGlazingTypes: {
                                nodes = []
                            } = {}
                        }) => nodes.map(({ id, type }) => ({
                            value: id,
                            label: type,
                        }))}
                    />
                    <InputComponent
                        label="Default Infill Material Size"
                        type="select"
                        extractValue={({
                            system: {
                                defaultGlassSize = ""
                            } = {}
                        }) => defaultGlassSize}
                        extractOptions={({
                            allInfillSizes: {
                                nodes = []
                            } = {}
                        }) => nodes.map(({ size }) => ({
                            value: size,
                            label: size,
                        }))}
                    />
                    <InputComponent
                        label="Infill Pocket Types"
                        multiSelectList={{
                            apolloProps: infillPocketTypeApolloProps,
                            mapCreateVariables: ({ id: glazingTagId }, { glazing: { id: glazingId } }) => ({
                                glazingId,
                                glazingTagId,
                            }),
                            mapDeleteVariables: ({ glazingGlazingTagNID, ...arg }) => ({
                                nodeId: glazingGlazingTagNID,
                            }),
                            extractItems: ({
                                glazing: {
                                    glazingGlazingTagsByGlazingId: {
                                        nodes = []
                                    } = {}
                                } = {}
                            }) => nodes.map(({
                                nodeId: glazingGlazingTagNID,
                                glazingTagByGlazingTagId: glazingTag,
                            }) => ({
                                glazingGlazingTagNID,
                                ...glazingTag,
                            })),
                            extractAllItems: ({
                                allGlazingTags: {
                                    nodes = []
                                } = {}
                            }) => nodes,
                            mapListPillProps: ({ type }) => ({
                                title: type,
                            }),
                            mapModalPillProps: ({ type }) => ({
                                title: type,
                            }),
                        }}
                    />
                    <InputComponent
                        label="Infill Pocket Types"
                        type="number"
                        extractValue={({
                            glazing: {
                                depth = 0
                            } = {}
                        }) => depth}
                    />
                    <InputComponent
                        label="Infill Pocket Sizes"
                        type="number"
                        extractValue={({
                            glazing: {
                                defaultSightline = 0
                            } = {}
                        }) => defaultSightline}
                    />
                    <InputComponent
                        label="Caulk Joint Size"
                        type="number"
                        extractValue={({
                            glazing: {
                                shimSize = 0,
                            } = {}
                        }) => shimSize}
                    />
                </>
            )}
        </ApolloBatchedWrapper>
    );
}
