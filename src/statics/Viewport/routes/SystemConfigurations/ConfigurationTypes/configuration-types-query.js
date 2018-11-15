import gql from 'graphql-tag';

export default gql`{
    allConfigurationTypes{
        nodes{
            nodeId
            id
            type
            door
            overrideLevel
            presentationLevel
            configurationTypePartTypesByConfigurationTypeId{
                nodes{
                    nodeId
                    partTypeByPartTypeId{
                        nodeId
                        id
                        type
                    }
                }
            }
        }
    }
}`;