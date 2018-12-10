import React from 'react';

import {
    ApolloListWrapper,
} from '../../../components';

import * as apolloProps from './manufacturers-graphql';

export default function Manufacturers() {
    return (
        <ApolloListWrapper
            apolloProps={apolloProps}
            itemClass="Manufacturer"
            extractList={({
                allManufacturers: {
                    nodes = [],
                } = {},
            }) => nodes}
            defaultPillProps={{
                type: "tile",
                align: "left",
                footer: "Last Updated: ...",
                selectable: false,
            }}
            mapPillProps={({ name }) => ({
                title: name,
            })}
            mapCreateVariables={({ }, { input }) => ({
                name: input,
            })}
            extractCreatedNID={({
                createManufacturer: {
                    manufacturer: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                name: input,
            })}
            addButtonProps={{
                type: "large",
            }}
            extractName={({ name }) => name}
        />
    );
}
