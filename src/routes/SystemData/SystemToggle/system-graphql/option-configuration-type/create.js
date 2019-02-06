import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateSystemOptionConfigurationType(
            $systemOptionId:Int!,
            $configurationTypeId:Int!
        ){
            createSystemOptionConfigurationType(
                input:{
                    systemOptionConfigurationType:{
                        systemOptionId:$systemOptionId,
                        configurationTypeId:$configurationTypeId
                    }
                }
            ){
                systemOptionConfigurationType{
                    nodeId
                    systemOptionId
                    systemOptionBySystemOptionId{
                        nodeId
                        systemBySystemId{
                            nodeId
                        }
                    }
                    configurationTypeId
                    configurationTypeByConfigurationTypeId{
                        nodeId
                    }
                }
            }
        }`,
    mapMutationArgumentsToProps: (newSystemOptionConfigurationType, {
        system,
        system: {
            _systemOptions,
        }
    }) => ({
        system: {
            ...system,
            _systemOptions: _systemOptions
                .map(option => option.id === newSystemOptionConfigurationType.systemOptionId ?
                    {
                        ...option,
                        _systemOptionConfigurationTypes: {
                            ...option._systemOptionConfigurationTypes,
                            nodes: option._systemOptionConfigurationTypes.nodes.concat(newSystemOptionConfigurationType)
                        }
                    }
                    :
                    option)
        }
    }),
};
