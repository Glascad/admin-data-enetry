import gql from 'graphql-tag';
import query from '../query';

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
    mapResultToProps: (newOptionCombinationConfigurationType, {
        system,
        system: {
            optionCombinations,
        }
    }) => ({
        system: {
            ...system,
            optionCombinations: optionCombinations.map(combination => (
                combination.id === newOptionCombinationConfigurationType.optionCombinationId
            ) ?
                {
                    ...combination,
                    optionCombinationConfigurationTypesByOptionCombinationId: {
                        ...combination.optionCombinationConfigurationTypesByOptionCombinationId,
                        nodes: combination.optionCombinationConfigurationTypesByOptionCombinationId.nodes.concat(newOptionCombinationConfigurationType)
                    }
                }
                : combination)
        }
    }),
};
