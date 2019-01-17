import gql from 'graphql-tag';

export const query = {
    query: gql`{
        allLineWeights{
            nodes{
                nodeId
                name
                weight
            }
        }
    }`,
    mapQueryToProps: ({
        data: {
            allLineWeights: {
                nodes: lineWeights = [],
            } = {},
        } = {},
    }) => ({
        lineWeights,
    }),
};

export const mutations = {
    createLineWeight: {
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
    },
    updateLineWeight: {
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
    },
    deleteLineWeight: {
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
    },
};
