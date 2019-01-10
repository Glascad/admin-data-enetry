import gql from 'graphql-tag'; 
import query from '../query';

export default {
    mutation: gql`mutation DeleteOptionValue(
        $nodeId:ID!
    ){
        deleteOptionValue(
            input:{
                nodeId:$nodeId
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
    mapResultToProps: (deletedOptionValue, { systemOptions }) => ({
        systemOptions: systemOptions
            .map(option => option.id === deletedOptionValue.systemOptionId ?
                {
                    ...option,
                    optionValuesBySystemOptionId: {
                        ...option.optionValuesBySystemOptionId,
                        nodes: option.optionValuesBySystemOptionId.nodes.filter(ov => ov.nodeId !== deletedOptionValue.nodeId)
                    }
                }
                :
                option)
    }),
     refetchQueries: ({
         data: {
             deleteOptionValue: {
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