import React from 'react';

import { CRUDListWrapper } from '../../../../../components';

import * as CRUDProps from './part-types-graphql';

export default function PartTypes({
    configurationType: {
        nodeId,
        type,
    },
}) {
    console.log(arguments);
    return (
        <CRUDListWrapper
            CRUDProps={{
                ...CRUDProps,
                queryVariables: {
                    nodeId
                }
            }}
            itemClass="Part Type"
            parentItem={type}
            extractList={({
                configurationType: {
                    configurationTypePartTypesByConfigurationTypeId: {
                        nodes = []
                    } = {}
                } = {}
            }) => nodes}
            mapPillProps={({
                partTypeByPartTypeId: {
                    type
                }
            }) => ({
                title: type
            })}
            multiSelect={{
                extractPreviousItems: ({
                    configurationType: {
                        configurationTypePartTypesByConfigurationTypeId: {
                            nodes = []
                        } = {}
                    } = {}
                }) => nodes.map(({
                    partTypeByPartTypeId: partType
                }) => partType),
                extractAllItems: ({
                    allPartTypes: {
                        nodes = []
                    } = {}
                }) => nodes,
                mapPillProps: ({ type }) => ({
                    title: type,
                }),
            }}
        />
    );
}
