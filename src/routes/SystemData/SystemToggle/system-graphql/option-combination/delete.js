import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteOptionCombination(
            $nodeId:ID!
        ){
            deleteOptionCombination(
                input:{
                    nodeId:$nodeId
                }
            ){
                optionCombination{
                    nodeId
                    systemId
                    systemBySystemId{
                        nodeId
                    }
                }
            }
        }`,
    mapResultToProps: ({ nodeId }, {
        system,
        system: {
            _optionCombinations,
        }
    }) => ({
        system: {
            ...system,
            _optionCombinations: _optionCombinations
                .filter(combination => combination.nodeId !== nodeId)
        }
    }),
};
