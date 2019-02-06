import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateSystemOption(
        $systemId:Int!,
        $name:String!,
        $optionOrder:Int,
        $overrideLevel:Int,
        $presentationLevel:Int
    ){
        createSystemOption(
            input:{
                systemOption:{
                    systemId:$systemId,
                    name:$name,
                    optionOrder:$optionOrder,
                    overrideLevel:$overrideLevel,
                    presentationLevel:$presentationLevel
                }
            }
        ) {
            systemOption{
                nodeId
                id
                name
                systemId
                systemBySystemId{
                    nodeId
                }
                optionOrder
                overrideLevel
                presentationLevel
                optionValuesBySystemOptionId {
                    nodes {
                        nodeId
                        id
                        name
                        value
                    }
                }
                systemOptionConfigurationTypesBySystemOptionId{
                    nodes{
                        nodeId
                        configurationTypeId
                        configurationTypeByConfigurationTypeId{
                            nodeId
                            type
                            door
                        }
                    }
                }
            }
        }
    }`,
    mapMutationArgumentsToProps: (newOption, {
        system,
        system: {
            _systemOptions,
        }
    }) => ({
        system: {
            ...system,
            _systemOptions: _systemOptions.concat(newOption)
        }
    }),
};
