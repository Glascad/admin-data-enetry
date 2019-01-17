import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteConfigurationType(
        $nodeId:ID!
    ){
        deleteConfigurationType(
            input:{
                nodeId:$nodeId
            }
        ){
            configurationNameOverride{
                nodeId
                id
                nameOverride
                manufacturerId
                configurationTypeId
            }
        }
    }`,
};
