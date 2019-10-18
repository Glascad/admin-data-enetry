import React from 'react';
import { Link } from 'react-router-dom';
import {
    ApolloWrapper,
    ListWrapper,
} from '../../../../components';
import * as apolloProps from './manufacturers-graphql';
import { parseSearch } from '../../../../utils';

export default function Manufacturers({
    location: {
        search,
    },
    match: {
        path,
    },
}) {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {({
                queryResult: {
                    allManufacturers = [],
                },
                mutations: {
                    createManufacturer,
                    updateManufacturer,
                    deleteManufacturer,
                },
            }) => (
                    <div className="card">
                        <ListWrapper
                            title="Manufacturers"
                            items={allManufacturers}
                            defaultPillProps={{
                                type: "tile",
                                footer: "Last Updated: ...",
                                align: "left"
                            }}
                            mapPillProps={({ name, id }) => ({
                                title: name,
                                hoverButtons: [
                                    {
                                        children: (
                                            <Link
                                                to={`${
                                                    path.replace(/main.menu.*/, `manufacturer/systems`)
                                                    }${
                                                    parseSearch(search).update({ manufacturerId: id })
                                                    }`}
                                            >
                                                Systems
                                            </Link>
                                        ),
                                    },
                                    {
                                        children: (
                                            <Link
                                                to={`${
                                                    path.replace(/main.menu.*/, `manufacturer/parts`)
                                                    }${
                                                    parseSearch(search).update({ manufacturerId: id })
                                                    }`}
                                            >
                                                Parts
                                            </Link>
                                        ),
                                    },
                                ]
                            })}
                            onCreate={(_, { input }) => createManufacturer({
                                name: input,
                            })}
                            // onUpdate={({ arguments: { nodeId } }, { input }) => updateManufacturer({
                            //     nodeId,
                            //     name: input,
                            // })}
                            onDelete={({ arguments: { nodeId } }) => deleteManufacturer({
                                nodeId,
                            })}
                            deleteModal={{
                                name: "Manufacturer",
                            }}
                            circleButton={{
                                type: "tile",
                            }}
                        />
                    </div>
                )}
        </ApolloWrapper>
    );
}
