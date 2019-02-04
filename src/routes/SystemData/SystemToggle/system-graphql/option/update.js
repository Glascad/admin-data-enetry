import gql from 'graphql-tag';

export default {
    mutation: gql`mutation UpdateSystemOption(
        $nodeId:ID!
        $name:String,
        $optionOrder:Int,
        $overrideLevel:Int,
        $presentationLevel:Int
    ){
        updateSystemOption(
            input:{
                nodeId:$nodeId,
                systemOptionPatch:{
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
    mapResultToProps: (updatedOption, {
        system,
        system: {
            _systemOptions,
        }
    }) => ({
        system: {
            ...system,
            _systemOptions: _systemOptions
                .map(option => option.nodeId === updatedOption.nodeId ?
                    {
                        ...option,
                        ...updatedOption
                    }
                    :
                    option)
        }
    }),
};
