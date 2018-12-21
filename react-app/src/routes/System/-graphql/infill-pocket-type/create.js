import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation CreateSystemInfillPocketType(
        $systemId:Int!,
        $infillPocketTypeId:Int!
    ){
        createSystemInfillPocketType(
            input:{
                systemInfillPocketType:{
                    systemId:$systemId,
                    infillPocketTypeId:$infillPocketTypeId
                }
            }
        ){
            systemInfillPocketType{
                nodeId
                infillPocketTypeId
                infillPocketTypeByInfillPocketTypeId{
                    nodeId
                    type
                }
                systemBySystemId{
                    nodeId
                }
            }
        }
    }`,
    mapResultToProps: (newSystemInfillPocketType, { systemInfillPocketTypes }) => ({
        systemInfillPocketTypes: systemInfillPocketTypes.concat(newSystemInfillPocketType)
    }),
    // refetchQueries: ({
    //     data: {
    //         createSystemInfillPocketType: {
    //             systemInfillPocketType: {
    //                 systemBySystemId: {
    //                     nodeId
    //                 }
    //             }
    //         }
    //     }
    // }) => [{ ...query, variables: { nodeId } }]
};
