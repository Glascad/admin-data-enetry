import gql from 'graphql-tag';

export const query = gql`{
    allInfillPocketTypes{
        nodes{
            nodeId
            id
            type
            description
            captured
        }
    }
}`;

export const create = {
    mutation: gql`mutation CreateInfillPocketType($type:String!){
        createInfillPocketType(input:{
            infillPocketType:{
                type:$type
            }
        }){
            infillPocketType{
                nodeId
                id
                type
                description
                captured
            }
        }
    }`,
    update(cache, {
        data: {
            createInfillPocketType: {
                infillPocketType
            }
        }
    }) {
        const { allInfillPocketTypes } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                allInfillPocketTypes: {
                    ...allInfillPocketTypes,
                    nodes: allInfillPocketTypes.nodes.concat(infillPocketType)
                }
            }
        });
    }
};

export const update = {
    mutation: gql`mutation UpdateInfillPocketType(
        $nodeId:ID!,
        $type:String,
        $description:String,
        $captured:Bool
    ){
        updateInfillPocketType(input:{
            nodeId:$nodeId
            infillPocketTypePatch:{
                type:$type
                description:$description
                captured:$captured
            }
        }){
            infillPocketType{
                nodeId
                id
                type
                description
                captured
            }
        }
    }`,
}

export const _delete = {
    mutation: gql`mutation DeleteInfillPocketType($nodeId:ID!){
        deleteInfillPocketType(input:{
            nodeId:$nodeId
        }){
            infillPocketType{
                nodeId
                id
                type
                description
                captured
            }
        }
    }`,
    update(cache, {
        data: {
            deleteInfillPocketType: {
                infillPocketType: {
                    nodeId: deletedNID
                }
            }
        }
    }) {
        const { allInfillPocketTypes } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                allInfillPocketTypes: {
                    ...allInfillPocketTypes,
                    nodes: allInfillPocketTypes.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
                }
            }
        })
    }
};
