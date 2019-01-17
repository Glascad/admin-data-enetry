import React from 'react';

import {
    ApolloListWrapper,
    ApolloWrapper3,
    ListWrapper3,
} from '../../../components';

import * as apolloProps from './manufacturers-graphql';

export default function Manufacturers() {
    return (
        <ApolloWrapper3
            {...apolloProps}
        >
            {({
                queryStatus: {
                    manufacturers,
                },
                mutations: {
                    createManufacturer,
                    updateManufacturer,
                    deleteManufacturer,
                },
            }) => (
                    <ListWrapper3
                        title="Manufacturers"
                        items={manufacturers}
                        defaultPillProps={{
                            type: "tile",
                            footer: "Last Updated: ...",
                            align: "left"
                        }}
                        mapPillProps={({ name }) => ({
                            title: name
                        })}
                        onCreate={({ }, { input }) => createManufacturer({
                            name: input
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updateManufacturer({
                            nodeId,
                            name: input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteManufacturer({
                            nodeId,
                        })}
                        deleteModal={{
                            name: "Manufacturer"
                        }}
                        addButton={{
                            type: "large"
                        }}
                    />
                )}
        </ApolloWrapper3>
    );
}
