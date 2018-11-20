import gql from 'graphql-tag';

export const query = gql`{
    allConfigurationTypes{
        nodes{
            nodeId
            id
            type
            door
            overrideLevel
            presentationLevel
            configurationTypePartTypesByConfigurationTypeId{
                nodes{
                    nodeId
                    partTypeByPartTypeId{
                        nodeId
                        id
                        type
                    }
                }
            }
            configurationNameOverridesByConfigurationTypeId{
                nodes{
                    nodeId
                    nameOverride
                    manufacturerByManufacturerId{
                        nodeId
                        id
                        name
                    }
                }
            }
        }
    }
    allPartTypes{
        nodes{
            nodeId
            id
            type
        }
    }
}`;

export const create_configuration_type = {
    mutation: gql`mutation CreateConfigurationType(
        $type:String!,
        $door:Boolean!,
        $overrideLevel:Int!,
        $presentationLevel:Int!
    ){
        createConfigurationType(input:{
            configurationType:{
                type:$type
                door:$door
                overrideLevel:$overrideLevel
                presentationLevel:$presentationLevel
            }
        }){
            configurationType{
                nodeId
                id
                type
                door
                overrideLevel
                presentationLevel
                configurationTypePartTypesByConfigurationTypeId{
                    nodes{
                        nodeId
                        partTypeByPartTypeId{
                            nodeId
                            id
                            type
                        }
                    }
                }
                configurationNameOverridesByConfigurationTypeId{
                    nodes{
                        nodeId
                        nameOverride
                        manufacturerByManufacturerId{
                            nodeId
                            id
                            name
                        }
                    }
                }
            }
        }
    }`,
    update(cache, {
        data,
        data: {
            createConfigurationType: {
                configurationType,
            }
        }
    }) {
        console.log(data);
        const { allConfigurationTypes } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                allConfigurationTypes: {
                    ...allConfigurationTypes,
                    nodes: allConfigurationTypes.nodes.concat(configurationType)
                }
            }
        });
    }
};

export const update_configuration_type = {
    mutation: gql`mutation UpdateConfigurationType(
        $nodeId:ID!,
        $type:String!,
        $door:Boolean!,
        $overrideLevel:Int!,
        $presentationLevel:Int!
    ){
        updateConfigurationType(input:{
            nodeId:$nodeId
            configurationTypePatch:{
                type:$type
                door:$door
                overrideLevel:$overrideLevel
                presentationLevel:$presentationLevel
            }
        }){
            configurationType{
                nodeId
                id
                type
                door
                overrideLevel
                presentationLevel
                configurationTypePartTypesByConfigurationTypeId{
                    nodes{
                        nodeId
                        partTypeByPartTypeId{
                            nodeId
                            id
                            type
                        }
                    }
                }
                configurationNameOverridesByConfigurationTypeId{
                    nodes{
                        nodeId
                        nameOverride
                        manufacturerByManufacturerId{
                            nodeId
                            id
                            name
                        }
                    }
                }
            }
        }
    }`,
    update: console.log
};

export const delete_configuration_type = {
    mutation: gql`mutation UpdateConfigurationType(
        $nodeId:ID!
    ){
        deleteConfigurationType(input:{
            nodeId:$nodeId
        }){
            configurationType{
                nodeId
                id
                type
                door
                overrideLevel
                presentationLevel
                configurationTypePartTypesByConfigurationTypeId{
                    nodes{
                        nodeId
                        partTypeByPartTypeId{
                            nodeId
                            id
                            type
                        }
                    }
                }
                configurationNameOverridesByConfigurationTypeId{
                    nodes{
                        nodeId
                        nameOverride
                        manufacturerByManufacturerId{
                            nodeId
                            id
                            name
                        }
                    }
                }
            }
        }
    }`,
    update(cache, {
        data: {
            deleteConfigurationType: {
                configurationType: {
                    nodeId: deletedNID,
                },
            },
        }
    }) {
        const { allConfigurationTypes } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                allConfigurationTypes: {
                    ...allConfigurationTypes,
                    nodes: allConfigurationTypes.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
                }
            }
        });
    }
};
