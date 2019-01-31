import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateOptionValue(
        $systemOptionId:Int!,
        $name:String!,
        $value:Float
    ){
        createOptionValue(
            input:{
                optionValue:{
                    systemOptionId:$systemOptionId,
                    name:$name,
                    value:$value
                }
            }
        ){
            optionValue{
                nodeId
                id
                name
                value
                systemOptionBySystemOptionId{
                    nodeId
                    systemBySystemId{
                        nodeId
                    }
                }
            }
        }
    }`,
    mapResultToProps: (newOptionValue, {
        system,
        system: {
            systemOptions,
        }
    }) => ({
        system: {
            ...system,
            systemOptions: systemOptions
                .map(option => option.id === newOptionValue.systemOptionId ?
                    {
                        ...option,
                        optionValuesBySystemOptionId: {
                            ...option.optionValuesBySystemOptionId,
                            nodes: option.optionValuesBySystemOptionId.nodes.concat(newOptionValue)
                        }
                    }
                    :
                    option
                )
        }
    }),
};
