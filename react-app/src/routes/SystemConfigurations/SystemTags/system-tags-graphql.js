import gql from 'graphql-tag';

export const query = gql`{
    allSystemTags{
        nodes{
            nodeId
            id
            type
        }
    }
}`;

export const create = {
    mutation: gql`mutation CreateSystemTag($type:String!){
        createSystemTag(input:{
            systemTag:{
                type:$type
            }
        }){
            systemTag{
                nodeId
                id
                type
            }
        }
    }`,
    update: (cache, {
        data: {
            createSystemTag: {
                systemTag
            }
        }
    }) => {
        const { allSystemTags, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allSystemTags: {
                    ...allSystemTags,
                    nodes: allSystemTags.nodes.concat(systemTag)
                }
            }
        });
    }
};

export const update = {
    mutation: gql`mutation UpdateSystemTag($nodeId:ID!,$type:String!){
        updateSystemTag(input:{
            nodeId:$nodeId
            systemTagPatch:{
                type:$type
            }
        }){
            systemTag{
                nodeId
                id
                type
            }
        }
    }`,
};

export const _delete = {
    mutation: gql`mutation DeleteSystemTag($nodeId:ID!){
        deleteSystemTag(input:{
            nodeId:$nodeId
        }){
            systemTag{
                nodeId
                id
                tag
            }
        }
    }`,
    update: (cache, {
        data: {
            deleteSystemTag: {
                systemTag: {
                    nodeId: deletedNID
                }
            }
        }
    }) => {
        const { allSystemTags, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allSystemTags: {
                    ...allSystemTags,
                    nodes: allSystemTags.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
                }
            }
        });
    }
};

