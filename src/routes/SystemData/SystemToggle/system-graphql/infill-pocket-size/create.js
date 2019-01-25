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
    mapResultToProps: (newSystemInfillPocketSize, {
        system,
        system: {
            systemInfillPocketSizes,
        }
    }) => ({
        system: {
            ...system,
            systemInfillPocketSizes: systemInfillPocketSizes.concat(newSystemInfillPocketSize)
        }
    })
};
