import gql from 'graphql-tag';

export const query = {
    query: gql`{
        allSystemTags{
            nodes{
                nodeId
                id
                tag
            }
        }
    }`,
    mapQueryToProps: ({
        data: {
            allSystemTags: {
                nodes: systemTags = [],
            } = {}
        } = {}
    }) => ({
        systemTags,
    }),
};

export const mutations = {
    createSystemTag: {
        mutation: gql`mutation CreateSystemTag($tag:String!){
            createSystemTag(input:{
                systemTag:{
                    tag:$tag
                }
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
                createSystemTag: {
                    systemTag
                }
            }
        }) => {
            const { allSystemTags, ...data } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    ...data,
                    allSystemTags: {
                        ...allSystemTags,
                        nodes: allSystemTags.nodes.concat(systemTag)
                    }
                }
            });
        }
    },
    updateSystemTag: {
        mutation: gql`mutation UpdateSystemTag($nodeId:ID!,$tag:String!){
            updateSystemTag(input:{
                nodeId:$nodeId
                systemTagPatch:{
                    tag:$tag
                }
            }){
                systemTag{
                    nodeId
                    id
                    tag
                }
            }
        }`,
    },
    deleteSystemTag: {
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
            const { allSystemTags, ...data } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    ...data,
                    allSystemTags: {
                        ...allSystemTags,
                        nodes: allSystemTags.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
                    }
                }
            });
        },
    },
};

