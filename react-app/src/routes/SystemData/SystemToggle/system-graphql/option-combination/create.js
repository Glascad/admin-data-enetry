import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation CreateOptionCombination(
        $systemId:Int!
    ){
        createOptionCombination(
            input:{
                optionCombination:{
                    systemId:$systemId,
                    invalid:true
                }
            }
        ){
            optionCombination{
                nodeId
                id
                invalid
                optionCombinationConfigurationTypesByOptionCombinationId{
                    nodes{
                        nodeId
                        configurationTypeByConfigurationTypeId{
                            nodeId
                            id
                            type
                            door
                        }
                    }
                }
                optionCombinationOptionValuesByOptionCombinationId{
                    nodes{
                        nodeId
                        optionValueByOptionValueId{
                            nodeId
                            id
                            name
                            value
                            systemOptionBySystemOptionId{
                                nodeId
                                id
                                name
                            }
                        }
                    }
                }
                systemBySystemId{
                    nodeId
                }
            }
        }
    }`,
    mapResultToProps: (newOptionCombination, {
        system,
        system: {
            optionCombinations,
        }
    }) => ({
        system: {
            ...system,
            optionCombinations: optionCombinations.concat(newOptionCombination)
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
