import gql from 'graphql-tag';
import query from '../query';

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
            optionCombinations,
        }
    }) => ({
        system: {
            ...system,
            optionCombinations: optionCombinations
                .filter(combination => combination.nodeId !== nodeId)
        }
    }),
};
