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
            }
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
    }
};
