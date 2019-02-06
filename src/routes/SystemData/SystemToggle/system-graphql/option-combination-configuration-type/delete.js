import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteOptionCombinationConfigurationType(
            $nodeId:ID!
        ){
            deleteOptionCombinationConfigurationType(
                input:{
                    nodeId:$nodeId
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
    mapMutationArgumentsToProps: (deletedOptionCombinationConfigurationType, {
        system,
        system: {
            _optionCombinations,
        }
    }) => ({
        system: {
            ...system,
            _optionCombinations: _optionCombinations.map(combination => (
                combination.id === deletedOptionCombinationConfigurationType.optionCombinationId
            ) ?
                {
                    ...combination,
                    _optionCombinationConfigurationTypes: {
                        ...combination._optionCombinationConfigurationTypes,
                        nodes: combination._optionCombinationConfigurationTypes.nodes.filter(ocov => ocov.nodeId !== deletedOptionCombinationConfigurationType.nodeId)
                    }
                }
                : combination)
        }
    }),
};
