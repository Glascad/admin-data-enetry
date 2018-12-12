import gql from 'graphql-tag';
import { query } from './system-info-graphql';

export const create = {
    mutation: gql`mutation CreateSystemSystemTag(
        $systemId:Int!,
        $systemTagId:Int!
    ){
        createSystemSystemTag(
            input:{
                systemSystemTag:{
                    systemId:$systemId,
                    systemTagId:$systemTagId
                }
            }
        ){
            systemSystemTag{
                nodeId
                systemId
                systemBySystemId{
                    nodeId
                }
                systemTagId
            }
        }
    }`,
    refetchQueries: ({
        data: {
            createSystemSystemTag: {
                systemSystemTag: {
                    systemBySystemId: {
                        nodeId
                    }
                }
            }
        }
    }) => [{ query, variables: { nodeId } }]
};

export const _delete = {
    mutation: gql`mutation DeleteSystemSystemTag(
        $nodeId:ID!
    ){
        deleteSystemSystemTag(
            input:{
                nodeId:$nodeId
            }
        ){
            systemSystemTag{
                nodeId
                systemId
                systemBySystemId{
                    nodeId
                }
                systemTagId
            }
        }
    }`,
    refetchQueries: ({
        data: {
            deleteSystemSystemTag: {
                systemSystemTag: {
                    systemBySystemId: {
                        nodeId
                    }
                }
            }
        }
    }) => [{ query, variables: { nodeId } }]
};
