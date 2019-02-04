import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteOptionCombinationOptionValue(
            $nodeId:ID!
        ){
            deleteOptionCombinationOptionValue(
                input:{
                    nodeId:$nodeId
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
    mapResultToProps: (deletedOptionCombinationOptionValue, {
        system,
        system: {
            _optionCombinations,
        }
    }) => ({
        system: {
            ...system,
            _optionCombinations: _optionCombinations.map(combination => (
                combination.id === deletedOptionCombinationOptionValue.optionCombinationId
            ) ?
                {
                    ...combination,
                    _optionCombinationOptionValues: {
                        ...combination._optionCombinationOptionValues,
                        nodes: combination._optionCombinationOptionValues.nodes.filter(ocov => ocov.nodeId !== deletedOptionCombinationOptionValue.nodeId)
                    }
                }
                : combination)
        },
    }),
};
