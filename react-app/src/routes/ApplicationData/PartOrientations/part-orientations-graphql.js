import gql from 'graphql-tag';

export const query = {
    query: gql`{
        allOrientations{
            nodes{
                nodeId
                id
                orientation
            }
        }
    }`,
};

export const mutations = {
    createOrientation: {
        mutation: gql`mutation CreateOrientation(
            $orientation:String!
        ){
            createOrientation(
                input:{
                    orientation:{
                        orientation:$orientation
                    }
                }
            ){
                orientation{
                    nodeId
                    id
                    orientation
                }
            }
        }`,
        update(cache, {
            data: {
                createOrientation: {
                    orientation
                }
            }
        }) {
            const { allOrientations, ...data } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    ...data,
                    allOrientations: {
                        ...allOrientations,
                        nodes: allOrientations.nodes.concat(orientation)
                    }
                }
            });
        }
    },
    updateOrientation: {
        mutation: gql`mutation UpdateOrientation(
            $nodeId:ID!,
            $orientation:String
        ){
            updateOrientation(
                input:{
                    nodeId:$nodeId
                    orientationPatch:{
                        orientation:$orientation
                    }
                }
            ){
                orientation{
                    nodeId
                    id
                    orientation
                }
            }
        }`,
    },
    deleteOrientation: {
        mutation: gql`mutation DeleteOrientation($nodeId:ID!){
                deleteOrientation(
                    input:{
                        nodeId:$nodeId
                    }
                ){
                    orientation{
                        nodeId
                        id
                        orientation
                    }
                }
            }`,
        update(cache, {
            data: {
                deleteOrientation: {
                    orientation: {
                        nodeId: deleteNID
                    }
                }
            }
        }) {
            const { allOrientations, ...data } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    ...data,
                    allOrientations: {
                        ...allOrientations,
                        nodes: allOrientations.nodes.filter(({ nodeId }) => nodeId !== deleteNID)
                    }
                }
            });
        },
    },
};
