import gql from 'graphql-tag';

export default gql`query{
    allSystemTypes{
        nodes{
            nodeId
            id
            type
        }
    }
    allSystemTags{
        nodes{
            nodeId
            id
            type
        }
    }
    allInfillSizes{
        nodes{
            nodeId
            size
        }
    }
    allInfillPocketTypes{
        nodes{
            nodeId
            id
            type
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