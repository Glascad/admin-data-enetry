import gql from 'graphql-tag';

export const query = {
    query: gql`{
        allLinetypes{
            nodes{
                nodeId
                id
                name
                lineWeight
                pattern
            }
        }
        allLineWeights(orderBy:WEIGHT_ASC){
            nodes{
                nodeId
                name
                weight
            }
        }
    }`,
};

export const mutations = {
    createLinetype: {
        mutation: gql`mutation CreateLinetype(
            $name:String!,
            $lineWeight:Int,
            $pattern:String
        ){
            createLinetype(
                input:{
                    linetype:{
                        name:$name
                        lineWeight:$lineWeight
                        pattern:$pattern
                    }
                }
            ){
                linetype{
                    nodeId
                    id
                    name
                    lineWeight
                    pattern
                }
            }
        }`,
        update(cache, {
            data: {
                createLinetype: {
                    linetype
                }
            }
        }) {
            const { allLinetypes, ...data } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    ...data,
                    allLinetypes: {
                        ...allLinetypes,
                        nodes: allLinetypes.nodes.concat(linetype)
                    }
                }
            });
        }
    },
    updateLinetype: {
        mutation: gql`mutation UpdateLinetype(
            $nodeId:ID!,
            $name:String,
            $lineWeight:Int,
            $pattern:String
        ){
            updateLinetype(
                input:{
                    nodeId:$nodeId
                    linetypePatch:{
                        name:$name
                        lineWeight:$lineWeight
                        pattern:$pattern
                    }
                }
            ){
                linetype{
                    nodeId
                    id
                    name
                    lineWeight
                    pattern
                }
            }
        }`
    },
    deleteLinetype: {
        mutation: gql`mutation DeleteLinetype($nodeId:ID!){
            deleteLinetype(
                input:{
                    nodeId:$nodeId
                }
            ){
                linetype{
                    nodeId
                    id
                    name
                    lineWeight
                    pattern
                }
            }
        }`,
        update(cache, {
            data: {
                deleteLinetype: {
                    linetype: {
                        nodeId: deleteNID
                    }
                }
            }
        }) {
            const { allLinetypes, ...data } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    ...data,
                    allLinetypes: {
                        ...allLinetypes,
                        nodes: allLinetypes.nodes.filter(({ nodeId }) => nodeId !== deleteNID)
                    }
                }
            });
        },
    },
};
