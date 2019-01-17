import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateConfigurationType(
        $type:String!,
        $door:Boolean,
        $overrideLevel:Int,
        $presentationLevel:Int
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
    // update(cache, {
    //     data,
    //     data: {
    //         createConfigurationType: {
    //             configurationType,
    //         }
    //     }
    // }) {
    //     const { allConfigurationTypes } = cache.readQuery({ query });
    //     cache.writeQuery({
    //         query,
    //         data: {
    //             allConfigurationTypes: {
    //                 ...allConfigurationTypes,
    //                 nodes: allConfigurationTypes.nodes.concat(configurationType)
    //             }
    //         }
    //     });
    // }
};
