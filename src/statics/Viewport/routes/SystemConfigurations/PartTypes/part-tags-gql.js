import gql from 'graphql-tag';

export const create_part_tag = {
    mutation: gql`mutation CreatePartTag($tag:String!){
        createPartTag(input:{
            partTag:{
                tag:$tag
            }
        }){
            partTag{
                nodeId
                id
                tag
            }
        }
    }`,
};

export const update_part_tag = {
    mutation: gql`mutation UpdatePartTag($nodeId:ID!,$tag:String!){
        updatePartTag(input:{
            nodeId:$nodeId
            partTagPatch:{
                tag:$tag
            }
        }){
            partTag{
                nodeId
                id
                tag
            }
        }
    }`,
};

export const delete_part_tag = {
    mutation: gql`mutation DeletePartTag($nodeId:ID!){
        deletePartTag(input:{
            nodeId:$nodeId
        }){
            partTag{
                nodeId
                id
                tag
            }
        }
    }`,
};

