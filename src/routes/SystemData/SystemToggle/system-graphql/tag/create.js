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
            _systemSystemTags,
        },
        allSystemTags,
    }) => ({
        system: {
            ...system,
            _systemSystemTags: _systemSystemTags.concat({
                ...newSystemTag,
                _systemTag: allSystemTags.find(({ id }) => id === newSystemTag.systemTagId)
            }),
        }
    }),
};
