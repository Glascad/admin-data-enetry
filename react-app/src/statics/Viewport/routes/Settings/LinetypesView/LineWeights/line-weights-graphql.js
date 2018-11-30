import gql from 'graphql-tag';

export const query = gql`{
    allLineWeights{
        nodes{
            nodeId
            name
            weight
        }
    }
}`;

export const create = {
    mutation: gql`mutation CreateLineWeight(
        $name:String!,
        $weight:Float!
    ){
        createLineWeight(
            input:{
                lineWeight:{
                    name:$name
                    weight:$weight
                }
            }
        ){
            lineWeight{
                nodeId
                name
                weight
            }
        }
    }`,
    update(cache, {
        data: {
            createLineWeight: {
                lineWeight
            }
        }
    }) {
        const { allLineWeights, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allLineWeights: {
                    ...allLineWeights,
                    nodes: allLineWeights.nodes.concat(lineWeight)
                }
            }
        });
    }
};

export const update = {
    mutation: gql`mutation UpdateLineWeight(
        $nodeId:ID!,
        $name:String,
        $weight:Float
    ){
        updateLineWeight(
            input:{
                nodeId:$nodeId
                lineWeightPatch:{
                    name:$name
                    weight:$weight
                }
            }
        ){
            lineWeight{
                nodeId
                name
                weight
            }
        }
    }`
}

export const _delete = {
    mutation: gql`mutation DeleteLineWeight($nodeId:ID!){
        deleteLineWeight(
            input:{
                nodeId:$nodeId
            }
        ){
            lineWeight{
                nodeId
                name
                weight
            }
        }
    }`,
    update(cache, {
        data: {
            deleteLineWeight: {
                lineWeight: {
                    nodeId: deleteNID
                }
            }
        }
    }) {
        const { allLineWeights, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allLineWeights: {
                    ...allLineWeights,
                    nodes: allLineWeights.nodes.filter(({ nodeId }) => nodeId !== deleteNID)
                }
            }
        });
    }
}
