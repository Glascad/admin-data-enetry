import gql from 'graphql-tag';

export const query = gql`query SystemInfo($systemNID:ID!){
    system(nodeId:$systemNID){
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
}`;
