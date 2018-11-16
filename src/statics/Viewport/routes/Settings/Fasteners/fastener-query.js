import gql from 'graphql-tag';

export default gql`{
    allFastenerTypes{
        nodes{
            nodeId
            id
        }
    }
}`;