import gql from 'graphql-tag';
import query from '../query';

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
    mapResultToProps: (newSystemInfillSize, { systemInfillSizes }) => ({
        systemInfillSizes: systemInfillSizes.concat(newSystemInfillSize)
    })
};
