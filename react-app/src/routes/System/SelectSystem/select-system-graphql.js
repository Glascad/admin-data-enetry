import gql from 'graphql-tag';

export const query = gql`{
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
                        type
                    }
                }
            }
        }
    }
}`;
