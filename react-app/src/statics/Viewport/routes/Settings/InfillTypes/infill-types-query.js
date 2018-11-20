import gql from 'graphql-tag';

export default gql`{
    allInfillPocketTypes{
        nodes{
            nodeId
            id
            type
            description
            captured
        }
    }
    allInfillPocketSizes{
        nodes{
            nodeId
            size
        }
    }
}`;