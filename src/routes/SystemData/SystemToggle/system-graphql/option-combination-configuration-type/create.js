import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateOptionCombinationConfigurationType(
        $optionCombinationId:Int!,
        $configurationTypeId:Int!
    ){
        createOptionCombinationConfigurationType(
            input:{
                optionCombinationConfigurationType:{
                    optionCombinationId:$optionCombinationId,
                    configurationTypeId:$configurationTypeId,
                }
            }
        ){
            optionCombinationConfigurationType{
                nodeId
                configurationTypeId
                configurationTypeByConfigurationTypeId{
                    nodeId
                    type
                }
                optionCombinationId
                optionCombinationByOptionCombinationId{
                    nodeId
                    systemBySystemId{
                        nodeId
                    }
                }
            }
        }
    }`,
    mapMutationArgumentsToProps: (newOptionCombinationConfigurationType, {
        system,
        system: {
            _optionCombinations,
        }
    }) => ({
        system: {
            ...system,
            _optionCombinations: _optionCombinations.map(combination => (
                combination.id === newOptionCombinationConfigurationType.optionCombinationId
            ) ?
                {
                    ...combination,
                    _optionCombinationConfigurationTypes: {
                        ...combination._optionCombinationConfigurationTypes,
                        nodes: combination._optionCombinationConfigurationTypes.nodes.concat(newOptionCombinationConfigurationType)
                    }
                }
                : combination)
        }
    }),
};
