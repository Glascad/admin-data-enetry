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
    awaitRefetchQueries: true,
    // Since `size` is the primary key, we need to completely refetch the query - we cannot update the cache automatically
    refetchQueries: [{ query }],
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
    }`,
    awaitRefetchQueries: true,
    refetchQueries: [{ query }],
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
    awaitRefetchQueries: true,
    refetchQueries: [{ query }],
}
