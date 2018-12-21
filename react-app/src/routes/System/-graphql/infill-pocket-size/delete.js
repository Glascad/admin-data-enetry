import gql from 'graphql-tag';
import query from '../query';

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
    mapResultToProps: ({ nodeId: deletedNID }, { systemInfillPocketSizes }) => ({
        systemInfillPocketSizes: systemInfillPocketSizes.filter(({ nodeId }) => nodeId !== deletedNID)
    })
};

