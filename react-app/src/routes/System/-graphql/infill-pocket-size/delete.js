import gql from 'graphql-tag'; 
import query from '../query';

export default {
    mutation: gql`mutation DeleteSystemInfillPocketSize(
        $nodeId:ID!
    ){
        deleteSystemInfillPocketSize(
            input:{
                nodeId:$nodeId
            }
        ){
            systemInfillPocketSize{
                nodeId
                infillPocketSize
                infillPocketSizeByInfillPocketSize{
                    nodeId
                    size
                }
                systemBySystemId{
                    nodeId
                }
            }
        }
    }`,
    refetchQueries: ({
        data: {
            deleteSystemInfillPocketSize: {
                systemInfillPocketSize: {
                    systemBySystemId: {
                        nodeId
                    }
                }
            }
        }
    }) => [{ ...query, variables: { nodeId } }]
};

