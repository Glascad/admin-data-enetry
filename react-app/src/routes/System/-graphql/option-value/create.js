import gql from 'graphql-tag';
import query from '../query';

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
    mapResultToProps: (newOptionValue, { systemOptions }) => ({
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
                option)
    }),
    refetchQueries: ({
        data: {
            createOptionValue: {
                optionValue: {
                    systemOptionBySystemOptionId: {
                        systemBySystemId: {
                            nodeId
                        }
                    }
                }
            }
        }
    }) => [{ ...query, variables: { nodeId } }]
};
