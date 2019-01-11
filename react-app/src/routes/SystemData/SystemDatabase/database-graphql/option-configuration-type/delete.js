import gql from 'graphql-tag'; 
import query from '../query';

export default {
    mutation: gql`mutation DeleteSystemOptionConfigurationType(
        $nodeId:ID!
    ){
        deleteSystemOptionConfigurationType(
            input:{
                nodeId:$nodeId
            }
        ){
            systemOptionConfigurationType{
                nodeId
                systemOptionId
                systemOptionBySystemOptionId{
                    nodeId
                    systemBySystemId{
                        nodeId
                    }
                }
                configurationTypeId
                configurationTypeByConfigurationTypeId{
                    nodeId
                }
            }
        }
    }`,
    mapResultToProps: ({ systemOptionId, nodeId }, { systemOptions }) => ({
        n: console.log({ systemOptionId, nodeId, systemOptions }),
        systemOptions: systemOptions
            .map(option => option.id === systemOptionId ?
                {
                    ...option,
                    systemOptionConfigurationTypesBySystemOptionId: {
                        ...option.systemOptionConfigurationTypesBySystemOptionId,
                        nodes: option.systemOptionConfigurationTypesBySystemOptionId.nodes.filter(soct => soct.nodeId !== nodeId)
                    }
                }
                :
                option)
    }),
     refetchQueries: ({
         data: {
             deleteSystemOptionConfigurationType: {
                 systemOptionConfigurationType: {
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
