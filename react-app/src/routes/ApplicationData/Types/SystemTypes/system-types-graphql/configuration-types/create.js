import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateSystemTypeDetailTypeConfigurationType(
        $systemTypeId:Int!,
        $detailTypeId:Int!,
        $configurationTypeId:Int
    ){
        createSystemTypeDetailTypeConfigurationType(input:{
            systemTypeDetailTypeConfigurationType:{
                systemTypeId:$systemTypeId,
                detailTypeId:$detailTypeId,
                configurationTypeId:$configurationTypeId
            }
        }){
            systemTypeDetailTypeConfigurationType{
                nodeId
                systemTypeId
                detailTypeId
                configurationTypeId
            }
        }
    }`,
};
