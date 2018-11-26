import gql from 'graphql-tag';

export const query = gql`{
    allDetailTypes{
        nodes{
            nodeId
            id
            type
            vertical
            entrance
        }
    }
}`;

export const create_detail_type = {
    mutation: gql`mutation CreateDetailType(
        $type:String!,
        $vertical:Boolean!,
        $entrance:Boolean!
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
        const { allDetailTypes, ...data } = cache.readQuery({ query });
        console.log({
            data: {
                allDetailTypes,
                ...data
            },
            detailType,
        })
        cache.writeQuery({
            query,
            data: {
                ...data,
                allDetailTypes: {
                    ...allDetailTypes,
                    nodes: allDetailTypes.nodes.concat(detailType)
                }
            }
        })
    }
}

export const update_detail_type = {
    mutation: gql`mutation UpdateDetailType(
        $nodeId:ID!,
        $type:String!,
        $vertical:Boolean!,
        $entrance:Boolean!
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
};

export const delete_detail_type = {
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
        console.log(cache, deletedNID);
        const { allDetailTypes, ...data } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                ...data,
                allDetailTypes: {
                    ...allDetailTypes,
                    nodes: allDetailTypes.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
                }
            }
        })
    }
}
