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

export const update_detail_type = {
    mutation: gql`mutation UpdateDetailType(
            $nodeId:ID!,
            $type:String!,
            $vertical:Bool!,
            $entrance:Bool!
        ){
        updateDetailType(
            input:{
                nodeId:$nodeId
                detailTypePatch:{
                    detailType:{
                        type:$type
                        vertical:$vertical
                        entrance:$entrance
                    }
                }
            }
        ){
            detailType{
                nodes{
                    nodeId
                    id
                    type
                    vertical
                    entrance
                }
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
                nodes{
                    nodeId
                    id
                    type
                    vertical
                    entrance
                }
            }
        }
    }`
}
