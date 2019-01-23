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
    mapResultToProps({
        nodeId,
        systemId,
        invalidConfigurationTypeId,
    }, {
        system,
        system: {
            systemType: {
                systemTypeDetailTypeConfigurationTypes,
            },
            invalidSystemConfigurationTypes,
        }
    }) {
        console.log(arguments);

        const {
            configurationType
        } = systemTypeDetailTypeConfigurationTypes.find(({
            configurationTypeId
        }) => configurationTypeId === invalidConfigurationTypeId);

        const invalidSystemConfigurationType = {
            nodeId,
            systemId,
            invalidConfigurationTypeId,
            configurationType
        };

        console.log({
            configurationType,
            invalidSystemConfigurationType,
        });

        return {
            system: {
                ...system,
                invalidSystemConfigurationTypes: invalidSystemConfigurationTypes
                    .concat(invalidSystemConfigurationType)
            }
        };
    },
};
