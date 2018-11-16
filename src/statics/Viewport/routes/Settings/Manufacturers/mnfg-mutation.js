import gql from 'graphql-tag';

export default gql`
    mutation CreateManufacturer($name:String!){
        createManufacturer(input:{
            manufacturer:{
                name:$name
            }
        }){
            manufacturer{
                nodeId
                id
                name
            }
        }
    }
`;