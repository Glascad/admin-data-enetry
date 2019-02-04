import gql from 'graphql-tag';

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
    mapResultToProps: ({ nodeId: deletedNID }, {
        system,
        system: {
            _systemSystemTags,
        },
    }) => ({
        system: {
            ...system,
            _systemSystemTags: _systemSystemTags.filter(({ nodeId }) => nodeId !== deletedNID)
        },
    }),
};
