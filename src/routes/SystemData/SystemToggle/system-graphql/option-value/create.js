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
    mapMutationArgumentsToProps: (newOptionValue, {
        system,
        system: {
            _systemOptions,
        }
    }) => ({
        system: {
            ...system,
            _systemOptions: _systemOptions
                .map(option => option.id === newOptionValue.systemOptionId ?
                    {
                        ...option,
                        _optionValues: {
                            ...option._optionValues,
                            nodes: option._optionValues.nodes.concat(newOptionValue)
                        }
                    }
                    :
                    option
                )
        }
    }),
};
