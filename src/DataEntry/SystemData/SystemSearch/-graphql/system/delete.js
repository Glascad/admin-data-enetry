import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteSystem($nodeId:ID!){
        deleteSystem(
            input:{
                nodeId:$nodeId
            }
        ){
            system{
                nodeId
                id
                name
                defaultGlassSize
                defaultGlassBite
                depth
                defaultSightline
                shimSize
            }
        }
    }`
};
