import gql from 'graphql-tag';

export const query = gql`query SystemInvalidCombinations($nodeId:ID!){
    system(nodeId:$nodeId){
        nodeId
        id
        name
        optionCombinationsBySystemId{
            nodes{
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
                            overrideLevel
                            presentationLevel
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
            }
        }
    }
}`;

export const mutations = {};
