import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateSystemInfillSize(
        $systemId:Int!,
        $infillSize:Float!
    ){
        createSystemInfillSize(
            input:{
                systemInfillSize:{
                    systemId:$systemId,
                    infillSize:$infillSize
                }
            }
        ){
            systemInfillSize{
                nodeId
                infillSize
                infillSizeByInfillSize{
                    nodeId
                    size
                }
                systemBySystemId{
                    nodeId
                }
            }
        }
    }`,
    mapResultToProps: (newSystemInfillSize, {
        system,
        system: {
            systemInfillSizes,
        }
    }) => ({
        system: {
            ...system,
            systemInfillSizes: systemInfillSizes.concat(newSystemInfillSize)
        }
    }),
};
