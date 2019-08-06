import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteSystemTypeDetailTypeConfigurationType(
        $nodeId:ID!
    ){
        deleteSystemTypeDetailTypeConfigurationType(input:{
            nodeId:$nodeId
        }){
            systemTypeDetailTypeConfigurationType{
                nodeId
                configurationType
                detailType
            }
        }
    }`,
};
