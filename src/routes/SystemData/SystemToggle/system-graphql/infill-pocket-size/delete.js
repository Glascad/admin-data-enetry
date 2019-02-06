import gql from 'graphql-tag';

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
    mapMutationArgumentsToProps: ({ nodeId: deletedNID }, {
        system,
        system: {
            _systemInfillPocketSizes,
        }
    }) => ({
        system: {
            ...system,
            _systemInfillPocketSizes: _systemInfillPocketSizes.filter(({ nodeId }) => nodeId !== deletedNID)
        }
    })
};

