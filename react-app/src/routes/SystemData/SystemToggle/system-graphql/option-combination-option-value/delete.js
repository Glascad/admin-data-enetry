import gql from 'graphql-tag';
import query from '../query';

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
            optionCombinations,
        }
    }) => ({
        system: {
            ...system,
            optionCombinations: optionCombinations.map(combination => (
                combination.id === deletedOptionCombinationOptionValue.optionCombinationId
            ) ?
                {
                    ...combination,
                    optionCombinationOptionValuesByOptionCombinationId: {
                        ...combination.optionCombinationOptionValuesByOptionCombinationId,
                        nodes: combination.optionCombinationOptionValuesByOptionCombinationId.nodes.filter(ocov => ocov.nodeId !== deletedOptionCombinationOptionValue.nodeId)
                    }
                }
                : combination)
        },
    }),
};
