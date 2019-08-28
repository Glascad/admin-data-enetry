import gql from 'graphql-tag';

export default {
    mutation: gql`mutation UpdateSystemTypeDetailTypeConfigurationType (
        $nodeId: ID!,
        # $presentationLevel: PresentationLevel,
        # $overrideLevel: PresentationLevel,
        $required: Boolean,
        # $mirrorable: Boolean
    ){
        updateSystemTypeDetailTypeConfigurationType (input: {
            nodeId: $nodeId
            systemTypeDetailTypeConfigurationTypePatch: {
                required: $required
            }
        }) {
            systemTypeDetailTypeConfigurationType{
                nodeId
                required
                systemType
                detailType
                configurationType
            }
        }
    }`,
};
