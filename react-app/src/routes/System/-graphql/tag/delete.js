import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation DeleteSystemSystemTag(
        $nodeId:ID!
    ){
        deleteSystemSystemTag(
            input:{
                nodeId:$nodeId
            }
        ){
            systemSystemTag{
                nodeId
                systemId
                systemBySystemId{
                    nodeId
                }
                systemTagId
            }
        }
    }`,
    mapResultToProps: ({ nodeId: deletedNID }, { systemSystemTags }) => ({
        systemSystemTags: systemSystemTags.filter(({ nodeId }) => nodeId !== deletedNID)
    }),
    // refetchQueries: ({
    //     data: {
    //         deleteSystemSystemTag: {
    //             systemSystemTag: {
    //                 systemBySystemId: {
    //                     nodeId
    //                 }
    //             }
    //         }
    //     }
    // }) => [{ ...query, variables: { nodeId } }]
};
