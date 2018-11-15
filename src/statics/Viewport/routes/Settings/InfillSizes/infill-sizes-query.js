import gql from 'graphql-tag';

export default gql`{
    allInfillSizes{
        nodes{
            nodeId
            size
        }
    }
}`;