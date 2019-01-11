import gql from 'graphql-tag';

export const query = gql`{
    allInfillPocketSizes{
        nodes{
            nodeId
            size
        }
    }
}`;

export const create = {
    mutation: gql`mutation CreateInfillPocketSize(
        $size:Float!
    ){
        createInfillPocketSize(
            input:{
                infillPocketSize:{
                    size:$size
                }
            }
        ){
            infillPocketSize{
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
    mutation: gql`mutation UpdateInfillPocketSize(
        $nodeId:ID!,
        $size:Float!
    ){
        updateInfillPocketSize(
            input:{
                nodeId:$nodeId
                infillPocketSizePatch:{
                    size:$size
                }
            }
        ){
            infillPocketSize{
                nodeId
                size
            }
        }
    }`,
    awaitRefetchQueries: true,
    refetchQueries: [{ query }],
}

export const _delete = {
    mutation: gql`mutation DeleteInfillPocketSize($nodeId:ID!){
        deleteInfillPocketSize(
            input:{
                nodeId:$nodeId
            }
        ){
            infillPocketSize{
                nodeId
                size
            }
        }
    }`,
    awaitRefetchQueries: true,
    refetchQueries: [{ query }],
}
