import gql from 'graphql-tag';

export const query = {
    query: gql`{
        allInfillSizes(orderBy:SIZE_ASC){
            nodes{
                nodeId
                size
            }
        }
    }`,
};

export const mutations = {
    createInfillSize: {
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
    },
    updateInfillSize: {
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
    },
    deleteInfillSize: {
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
    }
};
