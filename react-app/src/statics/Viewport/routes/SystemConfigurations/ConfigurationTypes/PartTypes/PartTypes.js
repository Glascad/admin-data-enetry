import React from 'react';

import { CRUDListWrapper } from '../../../../../../components';

import * as CRUDProps from './part-types-graphql';

export default function PartTypes({
    configurationType: {
        nodeId,
        id: configurationTypeId,
        type,
        configurationTypePartTypesByConfigurationTypeId: {
            nodes: configurationTypePartTypes,
        },
    },
}) {
    console.log(arguments[0]);

    const previousItems = configurationTypePartTypes
        .map(({
            nodeId: configurationTypePartTypeNID,
            partTypeByPartTypeId: partType
        }) => ({
            configurationTypePartTypeNID,
            ...partType
        }));

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
            extractList={() => previousItems}
            mapPillProps={({ type }) => ({
                title: type
            })}
            multiSelect={{
                extractAllItems: ({
                    allPartTypes: {
                        nodes = []
                    } = {}
                }) => nodes,
                mapPillProps: ({ type }) => ({
                    title: type,
                }),
            }}
            mapCreateVariables={({ id: partTypeId }) => ({
                partTypeId,
                configurationTypeId, // from props on line 10
            })}
            mapDeleteVariables={({ configurationTypePartTypeNID: nodeId }) => ({
                nodeId,
            })}
        />
    );
}
