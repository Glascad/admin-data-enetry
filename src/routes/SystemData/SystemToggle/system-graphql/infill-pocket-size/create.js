import gql from 'graphql-tag';

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
    mapMutationArgumentsToProps: (newSystemInfillPocketSize, {
        system,
        system: {
            _systemInfillPocketSizes,
        }
    }) => ({
        system: {
            ...system,
            _systemInfillPocketSizes: _systemInfillPocketSizes.concat(newSystemInfillPocketSize)
        }
    })
};
