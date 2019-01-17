import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateSystemTypeDetailType(
        $systemTypeId:Int!,
        $detailTypeId:Int!
    ){
        createSystemTypeDetailType(input:{
            systemTypeDetailType:{
                systemTypeId:$systemTypeId,
                detailTypeId:$detailTypeId
            }
        }){
            systemTypeDetailType{
                nodeId
                detailTypeId
                systemTypeId
                systemTypeBySystemTypeId{
                    nodeId
                }
            }
        }
    }`,
};
