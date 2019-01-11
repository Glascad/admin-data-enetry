import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation DeleteInvalidSystemConfigurationType(
            $nodeId:ID!
        ){
            deleteInvalidSystemConfigurationType(
                input:{
                    nodeId:$nodeId
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
        invalidSystemConfigurationTypes,
    }) => {
        return {
            invalidSystemConfigurationTypes: invalidSystemConfigurationTypes
                .filter(invalid => invalid.nodeId !== nodeId && (
                    invalid.systemId !== systemId
                    ||
                    invalid.invalidConfigurationTypeId !== invalidConfigurationTypeId
                ))
        };
    },
    refetchQueries: ({
        data: {
            deleteInvalidSystemConfigurationType: {
                invalidSystemConfigurationType: {
                    systemBySystemId: {
                        nodeId
                    }
                }
            }
        }
    }) => [{ ...query, variables: { nodeId } }]
};
