import gql from 'graphql-tag';
import query from '../query';

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
            systemOptions,
        }
    }) => ({
        system: {
            ...system,
            systemOptions: systemOptions
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
