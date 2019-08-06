import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateSystemTypeDetailType(
        $systemType:_SystemType!,
        $detailType:DetailType!
    ){
        createSystemTypeDetailType(input:{
            systemTypeDetailType:{
                systemType:$systemType,
                detailType:$detailType
            }
        }){
            systemTypeDetailType{
                nodeId
                detailType
                systemType
                systemTypeBySystemType{
                    nodeId
                }
            }
        }
    }`,
};
