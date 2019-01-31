import gql from 'graphql-tag';

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
                    }
                }
            }
        }`,
    mapResultToProps: ({
        nodeId,
        systemId,
        invalidConfigurationTypeId,
    }, {
        system,
        system: {
            invalidSystemConfigurationTypes,
        }
    }) => {
        return {
            system: {
                ...system,
                invalidSystemConfigurationTypes: invalidSystemConfigurationTypes
                    .filter(invalid => invalid.nodeId !== nodeId && (
                        invalid.systemId !== systemId
                        ||
                        invalid.invalidConfigurationTypeId !== invalidConfigurationTypeId
                    )),
            }
        };
    },
};
