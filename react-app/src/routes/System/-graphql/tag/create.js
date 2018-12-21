import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation CreateSystemSystemTag(
        $systemId:Int!,
        $systemTagId:Int!
    ){
        createSystemSystemTag(
            input:{
                systemSystemTag:{
                    systemId:$systemId,
                    systemTagId:$systemTagId
                }
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
    mapResultToProps: (newSystemTag, { systemSystemTags, allSystemTags }) => ({
        systemSystemTags: systemSystemTags.concat({
            ...newSystemTag,
            systemTagBySystemTagId: allSystemTags.find(({ id }) => id === newSystemTag.systemTagId)
        }),
    }),
    // refetchQueries: ({
    //     data: {
    //         createSystemSystemTag: {
    //             systemSystemTag: {
    //                 systemBySystemId: {
    //                     nodeId
    //                 }
    //             }
    //         }
    //     }
    // }) => [{ ...query, variables: { nodeId } }]
};
