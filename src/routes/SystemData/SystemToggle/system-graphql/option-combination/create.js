import gql from 'graphql-tag';

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
    mapMutationArgumentsToProps: (newOptionCombination, {
        system,
        system: {
            _optionCombinations,
        }
    }) => ({
        system: {
            ...system,
            _optionCombinations: _optionCombinations.concat(newOptionCombination)
        }
    }),
};
