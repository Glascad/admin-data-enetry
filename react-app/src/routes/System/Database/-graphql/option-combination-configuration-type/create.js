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
    mapResultToProps: (newOptionCombinationConfigurationType, { optionCombinations }) => ({
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
    }),
    // refetchQueries: ({
    //     data: {
    //         createOptionCombination: {
    //             optionCombination: {
    //                 systemBySystemId: {
    //                     nodeId
    //                 }
    //             }
    //         }
    //     }
    // }) => [{ ...query, variables: { nodeId } }]
};
