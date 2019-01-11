import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation DeleteOptionCombinationConfigurationType(
            $nodeId:ID!
        ){
            deleteOptionCombinationConfigurationType(
                input:{
                    nodeId:$nodeId
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
    mapResultToProps: (deletedOptionCombinationConfigurationType, { optionCombinations }) => ({
        optionCombinations: optionCombinations.map(combination => (
            combination.id === deletedOptionCombinationConfigurationType.optionCombinationId
        ) ?
            {
                ...combination,
                optionCombinationConfigurationTypesByOptionCombinationId: {
                    ...combination.optionCombinationConfigurationTypesByOptionCombinationId,
                    nodes: combination.optionCombinationConfigurationTypesByOptionCombinationId.nodes.filter(ocov => ocov.nodeId !== deletedOptionCombinationConfigurationType.nodeId)
                }
            }
            : combination)
    }),
};
