import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateConfigurationType(
        $type:String!,
        $door:Boolean,
    ){
        createConfigurationType(input:{
            configurationType:{
                type:$type
                door:$door
            }
        }){
            configurationType{
                nodeId
                id
                type
                door
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
};
