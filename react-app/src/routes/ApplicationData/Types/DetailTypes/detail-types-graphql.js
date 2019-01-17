import gql from 'graphql-tag';

export const query = {
    query: gql`{
        allDetailTypes{
            nodes{
                nodeId
                id
                type
                vertical
                entrance
            }
        }
    }`,
    mapQueryToProps: ({
        data: {
            allDetailTypes: {
                nodes: detailTypes = []
            } = {}
        } = {}
    }) => ({
        detailTypes,
    })
};

export const mutations = {
    createDetailType: {
        mutation: gql`mutation CreateDetailType(
            $type:String!,
            $vertical:Boolean,
            $entrance:Boolean
        ){
            createDetailType(
                input:{
                    detailType:{
                        type:$type
                        vertical:$vertical
                        entrance:$entrance
                    }
                }
            ){
                detailType{
                    nodeId
                    id
                    type
                    vertical
                    entrance
                }
            }
        }`,
        update: (cache, {
            data: {
                createDetailType: {
                    detailType
                }
            }
        }) => {
            const { allDetailTypes, ...data } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    ...data,
                    allDetailTypes: {
                        ...allDetailTypes,
                        nodes: allDetailTypes.nodes.concat(detailType)
                    }
                }
            });
        }
    },
    updateDetailType: {
        mutation: gql`mutation UpdateDetailType(
            $nodeId:ID!,
            $type:String,
            $vertical:Boolean,
            $entrance:Boolean
        ){
            updateDetailType(
                input:{
                    nodeId:$nodeId
                    detailTypePatch:{
                        type:$type
                        vertical:$vertical
                        entrance:$entrance
                    }
                }
            ){
                detailType{
                    nodeId
                    id
                    type
                    vertical
                    entrance
                }
            }
        }`
    },
    deleteDetailType: {
        mutation: gql`mutation DeleteDetailType($nodeId:ID!){
            deleteDetailType(input:{
                nodeId:$nodeId
            }){
                detailType{
                    nodeId
                    id
                    type
                    vertical
                    entrance
                }
            }
        }`,
        update: (cache, {
            data: {
                deleteDetailType: {
                    detailType: {
                        nodeId: deletedNID
                    }
                }
            },
        }) => {
            const { allDetailTypes, ...data } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    ...data,
                    allDetailTypes: {
                        ...allDetailTypes,
                        nodes: allDetailTypes.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
                    }
                }
            });
        }
    }

}