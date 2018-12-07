import gql from 'graphql-tag';

export default gql`{
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