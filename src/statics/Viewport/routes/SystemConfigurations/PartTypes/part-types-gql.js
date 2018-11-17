import gql from 'graphql-tag';

export const query = gql`{
    allPartTypes{
        nodes{
            nodeId
            id
            type
        }
    }
    allPartTags{
        nodes{
            nodeId
            id
            tag
        }
    }
}`;

export const create_part_type = {
    mutation: gql`mutation CreatePartType($type:String!){
        createPartType(input:{
            partType:{
                type:$type
            }
        }){
            partType{
                nodeId
                id
                type
            }
        }
    }`,
};

export const update_part_type = {
    mutation: gql`mutation UpdatePartType($nodeId:ID!,$type:String!){
        updatePartType(input:{
            nodeId:$nodeId
            partTypePatch:{
                type:$type
            }
        }){
            partType{
                nodeId
                id
                type
            }
        }
    }`,
};

export const delete_part_type = {
    mutation: gql`mutation DeletePartType($nodeId:ID!){
        deletePartType(input:{
            nodeId:$nodeId
        }){
            partType{
                nodeId
                id
                type
            }
        }
    }`,
};

