import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteSystemOptionConfigurationType(
        $nodeId:ID!
    ){
        deleteSystemOptionConfigurationType(
            input:{
                nodeId:$nodeId
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
    mapMutationArgumentsToProps: ({ systemOptionId, nodeId }, {
        system,
        system: {
            _systemOptions,
        }
    }) => ({
        system: {
            ...system,
            _systemOptions: _systemOptions
                .map(option => option.id === systemOptionId ?
                    {
                        ...option,
                        _systemOptionConfigurationTypes: {
                            ...option._systemOptionConfigurationTypes,
                            nodes: option._systemOptionConfigurationTypes.nodes.filter(soct => soct.nodeId !== nodeId)
                        }
                    }
                    :
                    option)
        }
    }),
};
