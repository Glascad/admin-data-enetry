import gql from 'graphql-tag';
import { query } from './glazing-info-graphql';

export const create = {
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
    refetchQueries: ({
        data: {
            createSystemInfillPocketSize: {
                systemInfillPocketSize: {
                    systemBySystemId: {
                        nodeId
                    }
                }
            }
        }
    }) => [{ query, variables: { nodeId } }]
};

export const _delete = {
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
    refetchQueries: ({
        data: {
            deleteSystemInfillPocketSize: {
                systemInfillPocketSize: {
                    systemBySystemId: {
                        nodeId
                    }
                }
            }
        }
    }) => [{ query, variables: { nodeId } }]
};

