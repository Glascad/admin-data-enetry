import gql from 'graphql-tag';

export default {
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
    // update(cache, {
    //     data: {
    //         deleteConfigurationType: {
    //             configurationType: {
    //                 nodeId: deletedNID,
    //             },
    //         },
    //     }
    // }) {
    //     const { allConfigurationTypes } = cache.readQuery({ query });
    //     cache.writeQuery({
    //         query,
    //         data: {
    //             allConfigurationTypes: {
    //                 ...allConfigurationTypes,
    //                 nodes: allConfigurationTypes.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
    //             }
    //         }
    //     });
    // }
};
