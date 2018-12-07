import React from 'react';

import {
    CRUDListWrapper,
} from '../../../components';

import * as CRUDProps from './manufacturers-graphql';

export default function Manufacturers() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
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
