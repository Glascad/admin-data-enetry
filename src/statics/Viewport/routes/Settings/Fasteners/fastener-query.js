import gql from 'graphql-tag';

export default gql`{
    allFastenerTypes{
        nodes{
            id
            nodeId
        }
    }
}`;