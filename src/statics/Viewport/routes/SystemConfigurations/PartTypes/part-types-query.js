import gql from 'graphql-tag';

export default gql`{
    allPartTypes{
        nodes{
            nodeId
            id
            type
        }
    }
    allPartTags{
        nodes{
            nodeId
            id
            tag
        }
    }
}`;