import gql from 'graphql-tag';

export default gql`{
    allLinetypes{
        nodes{
            nodeId
            id
            name
            lineWeight
            pattern
        }
    }
    allLineWeights{
        nodes{
            nodeId
            name
            weight
        }
    }
}`;