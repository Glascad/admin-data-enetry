import gql from 'graphql-tag';
import query from '../query';

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
    mapResultToProps: ({ nodeId: deletedNID }, {
        system,
        system: {
            systemInfillPocketTypes,
        }
    }) => ({
        system: {
            ...system,
            systemInfillPocketTypes: systemInfillPocketTypes.filter(({ nodeId }) => nodeId !== deletedNID)
        }
    }),
};
