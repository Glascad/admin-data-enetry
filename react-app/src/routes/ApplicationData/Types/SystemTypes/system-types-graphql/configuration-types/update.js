import gql from 'graphql-tag';

export default {
    mutation: gql`mutation UpdateSystemTypeDetailTypeConfigurationType(
        $nodeId:ID!,
        $presentationLevel:Int,
        $overrideLevel:Int,
        $required:Boolean,
        $mirrorable:Boolean
    ){
        updateSystemTypeDetailTypeConfigurationType(input:{
            nodeId:$nodeId
            systemTypeDetailTypeConfigurationTypePatch:{
                presentationLevel:$presentationLevel
                overrideLevel:$overrideLevel
                required:$required
                mirrorable:$mirrorable
            }
        }){
            systemTypeDetailTypeConfigurationType{
                nodeId
                presentationLevel
                overrideLevel
                required
                mirrorable
                systemTypeId
                detailTypeId
                configurationTypeId
            }
        }
    }`,
};
