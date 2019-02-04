import gql from 'graphql-tag';

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
            _systemType: {
                _systemTypeDetailTypeConfigurationTypes,
            },
            _invalidSystemConfigurationTypes,
        }
    }) {
        console.log(arguments);

        const {
            _configurationType
        } = _systemTypeDetailTypeConfigurationTypes.find(({
            configurationTypeId
        }) => configurationTypeId === invalidConfigurationTypeId);

        const invalidSystemConfigurationType = {
            nodeId,
            systemId,
            invalidConfigurationTypeId,
            _configurationType,
        };

        console.log({
            _configurationType,
            invalidSystemConfigurationType,
        });

        return {
            system: {
                ...system,
                _invalidSystemConfigurationTypes: _invalidSystemConfigurationTypes
                    .concat(invalidSystemConfigurationType)
            }
        };
    },
};
