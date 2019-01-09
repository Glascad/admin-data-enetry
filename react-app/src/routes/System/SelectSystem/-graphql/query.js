import gql from 'graphql-tag';

export default {
    query: gql`{
        allSystems{
            nodes{
                nodeId
                id
                name
                depth
                defaultSightline
                shimSize
                defaultGlassSize
                defaultGlassBite
                manufacturerId
                systemTypeId
                manufacturerByManufacturerId{
                    nodeId
                    id
                    name
                }
                systemTypeBySystemTypeId{
                    nodeId
                    id
                    type
                }
                systemSystemTagsBySystemId{
                    nodes{
                        nodeId
                        systemTagBySystemTagId{
                            nodeId
                            id
                            tag
                        }
                    }
                }
            }
        }
    }`,
    mapQueryToProps: ({
        data: {
            allSystems: {
                nodes: allSystems = [],
            } = {},
        } = {},
    }) => ({
        allSystems,
    }),
};
