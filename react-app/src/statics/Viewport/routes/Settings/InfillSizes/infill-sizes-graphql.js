import gql from 'graphql-tag';

export const query = gql`{
    allInfillSizes{
        nodes{
            nodeId
            size
        }
    }
}`;

export const create = {
    mutation: gql`mutation CreateInfillSize(
        $size:Float!
    ){
        createInfillSize(
            input:{
                infillSize:{
                    size:$size
                }
            }
        ){
            infillSize{
                nodeId
                size
            }
        }
    }`,
    awaitRefetchQueries: true,
    // Since `size` is the only column, and the primary key, we need to completely refetch the query - we cannot update the cache automatically
    refetchQueries: [{ query }],
};

export const update = {
    mutation: gql`mutation UpdateInfillSize(
        $nodeId:ID!,
        $size:Float!
    ){
        updateInfillSize(
            input:{
                nodeId:$nodeId
                infillSizePatch:{
                    size:$size
                }
            }
        ){
            infillSize{
                nodeId
                size
            }
        }
    }`,
    awaitRefetchQueries: true,
    refetchQueries: [{ query }],
}

export const _delete = {
    mutation: gql`mutation DeleteInfillSize($nodeId:ID!){
        deleteInfillSize(
            input:{
                nodeId:$nodeId
            }
        ){
            infillSize{
                nodeId
                size
            }
        }
    }`,
    awaitRefetchQueries: true,
    refetchQueries: [{ query }],
}
