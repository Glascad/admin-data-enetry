import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation CreateSystemInfillPocketType(
        $systemId:Int!,
        $infillPocketTypeId:Int!
    ){
        createSystemInfillPocketType(
            input:{
                systemInfillPocketType:{
                    systemId:$systemId,
                    infillPocketTypeId:$infillPocketTypeId
                }
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
    mapResultToProps: (newSystemInfillPocketType, {
        system,
        system: {
            systemInfillPocketTypes,
        }
    }) => ({
        system: {
            ...system,
            systemInfillPocketTypes: systemInfillPocketTypes.concat(newSystemInfillPocketType)
        }
    }),
};
