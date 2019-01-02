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
    mapResultToProps: ({ nodeId }, { optionCombinations }) => {
        return {
            optionCombinations: optionCombinations
                .filter(combination => combination.nodeId !== nodeId)
        };
    },
    refetchQueries: ({
        data: {
            deleteOptionCombination: {
                optionCombination: {
                    systemBySystemId: {
                        nodeId
                    }
                }
            }
        }
    }) => [{ ...query, variables: { nodeId } }]
};
