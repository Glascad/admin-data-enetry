import gql from 'graphql-tag';

export const query = gql`{
    allOrientations{
        nodes{
            nodeId
            id
            orientation
        }
    }
}`;

export const create = {
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
        const { allOrientations, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allOrientations: {
                    ...allOrientations,
                    nodes: allOrientations.nodes.concat(orientation)
                }
            }
        });
    }
};

export const update = {
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
    }`
}

export const _delete = {
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
        const { allOrientations, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allOrientations: {
                    ...allOrientations,
                    nodes: allOrientations.nodes.filter(({ nodeId }) => nodeId !== deleteNID)
                }
            }
        });
    }
}
