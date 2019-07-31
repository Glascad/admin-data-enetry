import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
} from '../../../../components';

import * as apolloProps from './manufacturers-graphql';

export default function Manufacturers() {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {({
                queryStatus: {
                    allManufacturers = [],
                },
                mutations: {
                    createManufacturer,
                    updateManufacturer,
                    deleteManufacturer,
                },
                queryStatus,
                mutations,
                ...apollo
            }) => console.log({ ...apollo, queryStatus, mutations }) || (
                <div className="card">
                    <ListWrapper
                        title="Manufacturers"
                        items={allManufacturers}
                        defaultPillProps={{
                            type: "tile",
                            footer: "Last Updated: ...",
                            align: "left"
                        }}
                        mapPillProps={({ name }) => ({
                            title: name
                        })}
                        onCreate={(_, { input }) => createManufacturer({
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
                        circleButton={{
                            type: "tile"
                        }}
                    />
                </div>
            )}
        </ApolloWrapper>
    );
}
