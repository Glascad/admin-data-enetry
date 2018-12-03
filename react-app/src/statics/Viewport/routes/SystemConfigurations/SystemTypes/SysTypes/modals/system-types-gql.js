import gql from 'graphql-tag';

import query from '../../query';

export const create_system_type = {
    mutation: gql`mutation CreateSystemType($type:String!){
        createSystemType(input:{
            systemType:{
                type:$type
            }
        }){
            systemType{
                nodeId
                id
                type
                systemTypeDetailTypesBySystemTypeId{
                    nodes{
                        nodeId
                        detailTypeByDetailTypeId{
                            nodeId
                            id
                            type
                            vertical
                            entrance
                        }
                    }
                }
                systemTypeDetailTypeConfigurationTypesBySystemTypeId{
                    nodes{
                        nodeId
                        required
                        mirrorable
                        detailTypeByDetailTypeId{
                            nodeId
                            id
                        }
                        configurationTypeByConfigurationTypeId{
                            nodeId
                            id
                            type
                            door
                            overrideLevel
                            presentationLevel
                        }
                    }
                }
            }
        }
    }`,
    update: (cache, {
        data: {
            createSystemType: {
                systemType
            }
        }
    }) => {
        const { allSystemTypes, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allSystemTypes: {
                    ...allSystemTypes,
                    nodes: allSystemTypes.nodes.concat(systemType)
                }
            }
        });
    }
};

export const update_system_type = {
    // mutation: gql``
}

export const delete_system_type = {
    // mutation: gql``
}
