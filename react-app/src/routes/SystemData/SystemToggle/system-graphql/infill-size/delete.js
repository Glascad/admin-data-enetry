import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation DeleteSystemInfillSize(
        $nodeId:ID!
    ){
        deleteSystemInfillSize(
            input:{
                nodeId:$nodeId
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
    mapResultToProps: ({
        nodeId: deletedNID
    }, {
        system,
        system: {
            systemInfillSizes,
        }
    }) => ({
        system: {
            ...system,
            systemInfillSizes: systemInfillSizes.filter(({ nodeId }) => nodeId !== deletedNID)
        }
    })
};
