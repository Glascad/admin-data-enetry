import gql from 'graphql-tag';
import F from '../../../../schemas';

export const query = {
    query: gql`{
        allManufacturers {
            nodes {
                ...ManufacturerFields
            }
        }
    } ${F.MNFG.MANUFACTURER_FIELDS}`,
};

export const mutations = {
    createManufacturer: {
        mutation: gql`mutation CreateManufacturer($name: String!) {
            createManufacturer(input: {
                manufacturer: {
                    name: $name
                }
            }) {
                manufacturer {
                    ...ManufacturerFields
                }
            }
        } ${F.MNFG.MANUFACTURER_FIELDS}`,
        update(cache, {
            data: {
                createManufacturer: {
                    manufacturer
                }
            }
        }) {
            const { allManufacturers } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    allManufacturers: {
                        ...allManufacturers,
                        nodes: allManufacturers.nodes.concat(manufacturer)
                    }
                }
            });
        }
    },
    updateManufacturer: {
        mutation: gql`mutation UpdateManufacturer(
            $nodeId: ID!,
            $name: String!
        ) {
            updateManufacturer(input: {
                nodeId: $nodeId
                manufacturerPatch: {
                    name: $name
                }
            }) {
                manufacturer {
                    nodeId
                    id
                    name
                }
            }
        }`,
    },
    deleteManufacturer: {
        mutation: gql`mutation DeleteManufacturer($nodeId: ID!) {
            deleteManufacturer(input: {
                nodeId: $nodeId
            }) {
                manufacturer {
                    nodeId
                    id
                    name
                }
            }
        }`,
        update(cache, {
            data: {
                deleteManufacturer: {
                    manufacturer: {
                        nodeId: deletedNID
                    }
                }
            }
        }) {
            const { allManufacturers } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    allManufacturers: {
                        ...allManufacturers,
                        nodes: allManufacturers.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
                    }
                }
            })
        }
    }
};
