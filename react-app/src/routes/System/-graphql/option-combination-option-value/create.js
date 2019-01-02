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
    mapResultToProps: (newOptionCombination, { optionCombinations }) => ({
        optionCombinations: optionCombinations.concat(newOptionCombination)
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
