import gql from 'graphql-tag';

export default gql`query{
    allSystems{
        nodes{
            id
            nodeId
            name
            manufacturerByManufacturerId{
                id
                nodeId
                name
            }
        }
    }
}`;