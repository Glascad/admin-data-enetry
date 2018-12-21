import gql from 'graphql-tag'; 
import query from '../query';

export default {
    mutation: gql`mutation CreateInvalidSystemConfigurationType(
            $systemId:Int!,
            $invalidConfigurationTypeId:Int!
        ){
            createInvalidSystemConfigurationType(
                input:{
                    invalidSystemConfigurationType:{
                        systemId:$systemId,
                        invalidConfigurationTypeId:$invalidConfigurationTypeId
                    }
                }
            ){
                invalidSystemConfigurationType{
                    nodeId
                    systemId
                    systemBySystemId{
                        nodeId
                    }
                    invalidConfigurationTypeId
                    configurationTypeByInvalidConfigurationTypeId{
                        nodeId
                        id
                        type
                        door
                        overrideLevel
                        presentationLevel
                    }
                }
            }
        }`,
    mapResultToProps: ({
        nodeId,
        systemId,
        invalidConfigurationTypeId,
    }, {
        systemTypeDetailTypeConfigurationTypes,
        invalidSystemConfigurationTypes,
    }) => {
        const {
            configurationTypeByConfigurationTypeId
        } = systemTypeDetailTypeConfigurationTypes.find(({
            configurationTypeId
        }) => configurationTypeId === invalidConfigurationTypeId);
        const invalidSystemConfigurationType = {
            nodeId,
            systemId,
            invalidConfigurationTypeId,
            configurationTypeByInvalidConfigurationTypeId: configurationTypeByConfigurationTypeId,
        };
        return {
            invalidSystemConfigurationTypes: invalidSystemConfigurationTypes
                .concat(invalidSystemConfigurationType)
        };
    },
     refetchQueries: ({
         data: {
             createInvalidSystemConfigurationType: {
                 invalidSystemConfigurationType: {
                     systemBySystemId: {
                         nodeId
                     }
                 }
             }
         }
     }) => [{ ...query, variables: { nodeId } }]
};
