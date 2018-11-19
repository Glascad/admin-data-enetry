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
    update: (cache, {
        data: {
            createPartType: {
                partType
            }
        }
    }) => {
        const { allPartTypes, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allPartTypes: {
                    ...allPartTypes,
                    nodes: allPartTypes.nodes.concat(partType)
                }
            }
        });
    }
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
    update: (cache, {
        data: {
            deletePartType: {
                partType: {
                    nodeId: deletedNID
                }
            }
        }
    }) => {
        const { allPartTypes, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allPartTypes: {
                    ...allPartTypes,
                    nodes: allPartTypes.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
                }
            }
        });
    }
};

