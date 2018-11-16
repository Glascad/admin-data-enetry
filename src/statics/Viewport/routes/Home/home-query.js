import gql from 'graphql-tag';

export default gql`query{
    allSystems{
        nodes{
            nodeId
            id
            name
            manufacturerByManufacturerId{
                nodeId
                id
                name
            }
        }
    }
}`;