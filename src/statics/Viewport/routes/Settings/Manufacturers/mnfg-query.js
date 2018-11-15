import gql from 'graphql-tag';

export default gql`{
    allManufacturers{
        nodes{
            nodeId
            id
            name
        }
    }
}`;