import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteSystemInfillPocketType(
        $nodeId:ID!
    ){
        deleteSystemInfillPocketType(
            input:{
                nodeId:$nodeId
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
    mapMutationArgumentsToProps: ({ nodeId: deletedNID }, {
        system,
        system: {
            _systemInfillPocketTypes,
        }
    }) => ({
        system: {
            ...system,
            _systemInfillPocketTypes: _systemInfillPocketTypes.filter(({ nodeId }) => nodeId !== deletedNID)
        }
    }),
};
