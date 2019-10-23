import gql from 'graphql-tag';

export default {
    mutation: gql`mutation UpdateConfigurationType(
        $nodeId:ID!,
        $type:String,
        $door:Boolean
    ){
        updateConfigurationType(input:{
            nodeId:$nodeId
            configurationTypePatch:{
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
