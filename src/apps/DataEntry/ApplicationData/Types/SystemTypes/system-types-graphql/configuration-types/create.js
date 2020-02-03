import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateSystemTypeDetailTypeConfigurationType(
        $systemType:_SystemType!,
        $detailType:DetailType!,
        $configurationType:ConfigurationType!
    ){
        createSystemTypeDetailTypeConfigurationType(input:{
            systemTypeDetailTypeConfigurationType:{
                systemType:$systemType,
                detailType:$detailType,
                configurationType:$configurationType
            }
        }){
            systemTypeDetailTypeConfigurationType{
                nodeId
                systemType
                detailType
                configurationType
            }
        }
    }`,
};
