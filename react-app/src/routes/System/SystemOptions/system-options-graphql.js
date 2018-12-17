import gql from 'graphql-tag';

export const query = gql`query SystemOptions($nodeId:ID!){
    system(nodeId:$nodeId){
        nodeId
        id
        name
        systemOptionsBySystemId {
            nodes {
                nodeId
                id
                name
                systemId
                mirrorable
                optionOrder
                overrideLevel
                presentationLevel
                optionValuesBySystemOptionId {
                    nodes {
                        nodeId
                        id
                        name
                        value
                    }
                }
                systemOptionConfigurationTypesBySystemOptionId{
                    nodes{
                        nodeId
                        configurationTypeId
                        configurationTypeByConfigurationTypeId{
                            nodeId
                            id
                            type
                            door
                            overrideLevel
                            presentationLevel
                        }
                    }
                }
            }
        }
    }
    allConfigurationTypes{
        nodes{
            nodeId
            id
            type
            door
            overrideLevel
            presentationLevel
        }
    }
}`;

export const mutations = {
    createSystemOption: {
        mutation: gql`mutation CreateSystemOption(
            $systemId:Int!,
            $name:String!,
            $mirrorable:Boolean,
            $optionOrder:Int,
            $overrideLevel:Int,
            $presentationLevel:Int
        ){
            createSystemOption(
                input:{
                    systemOption:{
                        systemId:$systemId,
                        name:$name,
                        mirrorable:$mirrorable,
                        optionOrder:$optionOrder,
                        overrideLevel:$overrideLevel,
                        presentationLevel:$presentationLevel
                    }
                }
            ) {
                systemOption{
                    nodeId
                    id
                    name
                    systemId
                    systemBySystemId{
                        nodeId
                    }
                    mirrorable
                    optionOrder
                    overrideLevel
                    presentationLevel
                    optionValuesBySystemOptionId {
                        nodes {
                            nodeId
                            id
                            name
                            value
                        }
                    }
                    systemOptionConfigurationTypesBySystemOptionId{
                        nodes{
                            nodeId
                            configurationTypeId
                            configurationTypeByConfigurationTypeId{
                                nodeId
                                type
                                door
                                overrideLevel
                                presentationLevel
                            }
                        }
                    }
                }
            }
        }`,
        mapResultToProps: (newOption, { systemOptions }) => ({
            systemOptions: systemOptions.concat(newOption)
        }),
        refetchQueries: ({
            data: {
                createSystemOption: {
                    systemOption: {
                        systemBySystemId: {
                            nodeId
                        }
                    }
                }
            }
        }) => [{ query, variables: { nodeId } }]
    },
    updateSystemOption: {
        mutation: gql`mutation UpdateSystemOption(
            $nodeId:ID!
            $name:String,
            $mirrorable:Boolean,
            $optionOrder:Int,
            $overrideLevel:Int,
            $presentationLevel:Int
        ){
            updateSystemOption(
                input:{
                    nodeId:$nodeId,
                    systemOptionPatch:{
                        name:$name,
                        mirrorable:$mirrorable,
                        optionOrder:$optionOrder,
                        overrideLevel:$overrideLevel,
                        presentationLevel:$presentationLevel
                    }
                }
            ) {
                systemOption{
                    nodeId
                    id
                    name
                    systemId
                    systemBySystemId{
                        nodeId
                    }
                    mirrorable
                    optionOrder
                    overrideLevel
                    presentationLevel
                    optionValuesBySystemOptionId {
                        nodes {
                            nodeId
                            id
                            name
                            value
                        }
                    }
                    systemOptionConfigurationTypesBySystemOptionId{
                        nodes{
                            nodeId
                            configurationTypeId
                            configurationTypeByConfigurationTypeId{
                                nodeId
                                type
                                door
                                overrideLevel
                                presentationLevel
                            }
                        }
                    }
                }
            }
        }`,
        mapResultToProps: (updatedOption, { systemOptions }) => ({
            systemOptions: systemOptions
                .map(option => option.nodeId === updatedOption.nodeId ?
                    {
                        ...option,
                        ...updatedOption
                    }
                    :
                    option)
        }),
        refetchQueries: ({
            data: {
                updateSystemOption: {
                    systemOption: {
                        systemBySystemId: {
                            nodeId
                        }
                    }
                }
            }
        }) => [{ query, variables: { nodeId } }]
    },
    createOptionValue: {
        mutation: gql`mutation CreateOptionValue(
            $systemOptionId:Int!,
            $name:String!,
            $value:Float
        ){
            createOptionValue(
                input:{
                    optionValue:{
                        systemOptionId:$systemOptionId,
                        name:$name,
                        value:$value
                    }
                }
            ){
                optionValue{
                    nodeId
                    id
                    name
                    value
                    systemOptionBySystemOptionId{
                        nodeId
                        systemBySystemId{
                            nodeId
                        }
                    }
                }
            }
        }`,
        mapResultToProps: (newOptionValue, { systemOptions }) => ({
            systemOptions: systemOptions
                .map(option => option.id === newOptionValue.systemOptionId ?
                    {
                        ...option,
                        optionValuesBySystemOptionId: {
                            ...option.optionValuesBySystemOptionId,
                            nodes: option.optionValuesBySystemOptionId.nodes.concat(newOptionValue)
                        }
                    }
                    :
                    option)
        }),
        refetchQueries: ({
            data: {
                createOptionValue: {
                    optionValue: {
                        systemOptionBySystemOptionId: {
                            systemBySystemId: {
                                nodeId
                            }
                        }
                    }
                }
            }
        }) => [{ query, variables: { nodeId } }]
    },
    createSystemOptionConfigurationType: {
        mutation: gql`mutation CreateSystemOptionConfigurationType(
            $systemOptionId:Int!,
            $configurationTypeId:Int!
        ){
            createSystemOptionConfigurationType(
                input:{
                    systemOptionConfigurationType:{
                        systemOptionId:$systemOptionId,
                        configurationTypeId:$configurationTypeId
                    }
                }
            ){
                systemOptionConfigurationType{
                    nodeId
                    systemOptionId
                    systemOptionBySystemOptionId{
                        nodeId
                        systemBySystemId{
                            nodeId
                        }
                    }
                    configurationTypeId
                    configurationTypeByConfigurationTypeId{
                        nodeId
                    }
                }
            }
        }`,
        mapResultToProps: (newSystemOptionConfigurationType, { systemOptions }) => ({
            n: console.log({ newSystemOptionConfigurationType, systemOptions }),
            systemOptions: systemOptions
                .map(option => option.id === newSystemOptionConfigurationType.systemOptionId ?
                    {
                        ...option,
                        systemOptionConfigurationTypesBySystemOptionId: {
                            ...option.systemOptionConfigurationTypesBySystemOptionId,
                            nodes: option.systemOptionConfigurationTypesBySystemOptionId.nodes.concat(newSystemOptionConfigurationType)
                        }
                    }
                    :
                    option)
        }),
        refetchQueries: ({
            data: {
                createSystemOptionConfigurationType: {
                    systemOptionConfigurationType: {
                        systemOptionBySystemOptionId: {
                            systemBySystemId: {
                                nodeId
                            }
                        }
                    }
                }
            }
        }) => [{ query, variables: { nodeId } }]
    },
    deleteSystemOptionConfigurationType: {
        mutation: gql`mutation DeleteSystemOptionConfigurationType(
            $nodeId:ID!
        ){
            deleteSystemOptionConfigurationType(
                input:{
                    nodeId:$nodeId
                }
            ){
                systemOptionConfigurationType{
                    nodeId
                    systemOptionId
                    systemOptionBySystemOptionId{
                        nodeId
                        systemBySystemId{
                            nodeId
                        }
                    }
                    configurationTypeId
                    configurationTypeByConfigurationTypeId{
                        nodeId
                    }
                }
            }
        }`,
        mapResultToProps: ({systemOptionId, nodeId}, { systemOptions }) => ({
            n: console.log({ systemOptionId, nodeId, systemOptions }),
            systemOptions: systemOptions
                .map(option => option.id === systemOptionId ?
                    {
                        ...option,
                        systemOptionConfigurationTypesBySystemOptionId: {
                            ...option.systemOptionConfigurationTypesBySystemOptionId,
                            nodes: option.systemOptionConfigurationTypesBySystemOptionId.nodes.filter(soct => soct.nodeId !== nodeId)
                        }
                    }
                    :
                    option)
        }),
        refetchQueries: ({
            data: {
                deleteSystemOptionConfigurationType: {
                    systemOptionConfigurationType: {
                        systemOptionBySystemOptionId: {
                            systemBySystemId: {
                                nodeId
                            }
                        }
                    }
                }
            }
        }) => [{ query, variables: { nodeId } }]
    }
};
