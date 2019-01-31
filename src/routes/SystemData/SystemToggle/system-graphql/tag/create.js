import gql from 'graphql-tag';

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
    mapResultToProps: (newSystemTag, {
        system,
        system: {
            systemSystemTags,
        },
        allSystemTags,
    }) => ({
        system: {
            ...system,
            systemSystemTags: systemSystemTags.concat({
                ...newSystemTag,
                systemTagBySystemTagId: allSystemTags.find(({ id }) => id === newSystemTag.systemTagId)
            }),
        }
    }),
};
