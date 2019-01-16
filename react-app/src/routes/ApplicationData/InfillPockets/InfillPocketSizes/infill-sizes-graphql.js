import gql from 'graphql-tag';

export const query = {
    query: gql`{
        allInfillPocketSizes(orderBy:SIZE_ASC){
            nodes{
                nodeId
                size
            }
        }
    }`,
    mapQueryToProps: ({
        data: {
            allInfillPocketSizes: {
                nodes: infillPocketSizes = []
            } = {}
        } = {}
    }) => ({
        infillPocketSizes,
    }),
};

export const mutations = {
    createInfillPocketSize: {
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
    },

    updateInfillPocketSize: {
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
    },

    deleteInfillPocketSize: {
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
    },
};
