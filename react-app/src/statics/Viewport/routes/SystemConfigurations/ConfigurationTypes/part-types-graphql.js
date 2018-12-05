import gql from 'graphql-tag';

export const query = gql`query ConfigurationType(
        $nodeId:ID!
    ){
    configurationType(
        nodeId:$nodeId
    ){
        nodeId
        id
        type
        configurationTypePartTypesByConfigurationTypeId{
            nodes{
                nodeId
                configurationTypeId
                partTypeId
                partTypeByPartTypeId{
                    nodeId
                    id
                    type
                }
            }
        }
    }
    allPartTypes{
        nodes{
            nodeId
            id
            type
        }
    }
}`;

export const create = {
    mutation: gql`mutation CreateConfigurationTypePartType(
        $configurationTypeId:ID!,
        $partTypeId:ID!
    ){
        createConfigurationTypePartType(input:{
            configurationTypeId:$configurationTypeId,
            partTypeId:$partTypeId
        }){
            configurationType{
                nodeId
                partTypeId
                configurationTypeId
            }
        }
    }`,
};

// export const _delete = {

// };
