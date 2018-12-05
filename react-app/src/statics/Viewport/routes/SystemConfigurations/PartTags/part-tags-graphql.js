import gql from 'graphql-tag';

export const query = gql`{
    allPartTags{
        nodes{
            nodeId
            id
            tag
        }
    }
}`;

export const create = {
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
    update: (cache, {
        data: {
            createPartTag: {
                partTag
            }
        }
    }) => {
        const { allPartTags, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allPartTags: {
                    ...allPartTags,
                    nodes: allPartTags.nodes.concat(partTag)
                }
            }
        });
    }
};

export const update = {
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

export const _delete = {
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
    update: (cache, {
        data: {
            deletePartTag: {
                partTag: {
                    nodeId: deletedNID
                }
            }
        }
    }) => {
        const { allPartTags, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allPartTags: {
                    ...allPartTags,
                    nodes: allPartTags.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
                }
            }
        });
    }
};

