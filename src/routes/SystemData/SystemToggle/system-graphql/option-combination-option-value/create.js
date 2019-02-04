import gql from 'graphql-tag';

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
            _optionCombinations,
        }
    }) => ({
        system: {
            ...system,
            _optionCombinations: _optionCombinations.map(combination => (
                combination.id === newOptionCombinationOptionValue.optionCombinationId
            ) ?
                {
                    ...combination,
                    _optionCombinationOptionValues: {
                        ...combination._optionCombinationOptionValues,
                        nodes: combination._optionCombinationOptionValues.nodes.concat(newOptionCombinationOptionValue)
                    }
                }
                : combination)
        }
    }),
};
