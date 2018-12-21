import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation CreateSystemInfillPocketSize(
        $systemId:Int!,
        $infillPocketSize:Int!
    ){
        createSystemInfillPocketSize(
            input:{
                systemInfillPocketSize:{
                    systemId:$systemId,
                    infillPocketSize:$infillPocketSize
                }
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
    // refetchQueries: ({
    //     data: {
    //         createSystemInfillPocketSize: {
    //             systemInfillPocketSize: {
    //                 systemBySystemId: {
    //                     nodeId
    //                 }
    //             }
    //         }
    //     }
    // }) => [{ ...query, variables: { nodeId } }]
};
