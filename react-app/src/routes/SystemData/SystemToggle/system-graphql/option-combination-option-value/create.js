import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation CreateOptionCombinationOptionValue(
        $optionCombinationId:Int!,
        $optionValueId:Int!
    ){
        createOptionCombinationOptionValue(
            input:{
                optionCombinationOptionValue:{
                    optionCombinationId:$optionCombinationId,
                    optionValueId:$optionValueId,
                }
            }
        ){
            optionCombinationOptionValue{
                nodeId
                optionValueId
                optionValueByOptionValueId{
                    nodeId
                    value
                    name
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
    mapResultToProps: (newOptionCombinationOptionValue, {
        system,
        system: {
            optionCombinations,
        }
    }) => ({
        system: {
            ...system,
            optionCombinations: optionCombinations.map(combination => (
                combination.id === newOptionCombinationOptionValue.optionCombinationId
            ) ?
                {
                    ...combination,
                    optionCombinationOptionValuesByOptionCombinationId: {
                        ...combination.optionCombinationOptionValuesByOptionCombinationId,
                        nodes: combination.optionCombinationOptionValuesByOptionCombinationId.nodes.concat(newOptionCombinationOptionValue)
                    }
                }
                : combination)
        }
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
