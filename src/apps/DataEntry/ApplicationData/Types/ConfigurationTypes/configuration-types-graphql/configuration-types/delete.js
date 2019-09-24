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
