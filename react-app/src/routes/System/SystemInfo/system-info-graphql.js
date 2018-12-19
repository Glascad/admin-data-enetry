import gql from 'graphql-tag';

export const query = gql`query SystemInfo($nodeId:ID!){
    system(nodeId:$nodeId){
        nodeId
        id
        name
        depth
        defaultSightline
        shimSize
        manufacturerByManufacturerId{
            nodeId
            id
            name
        }
        systemTypeBySystemTypeId{
            nodeId
            id
            type
        }
        systemSystemTagsBySystemId{
            nodes{
                nodeId
                systemTagBySystemTagId{
                    nodeId
                    id
                    tag
                }
            }
        }
    }
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
            tag
        }
    }
}`;

export const mutations = {
    updateSystem: {
        mutation: gql`mutation UpdateSystem(
            $nodeId:ID!,
            $name:String,
            $depth:Float,
            $defaultSightline:Float,
            $shimSize:Float,
            $systemTypeId:Int
        ){
            updateSystem(input:{
                nodeId:$nodeId,
                systemPatch:{
                    name:$name,
                    depth:$depth,
                    defaultSightline:$defaultSightline,
                    shimSize:$shimSize,
                    systemTypeId:$systemTypeId
                }
            }){
                system{
                    nodeId
                    id
                    name
                    depth
                    defaultSightline
                    shimSize
                    manufacturerByManufacturerId{
                        nodeId
                        id
                        name
                    }
                    systemTypeBySystemTypeId{
                        nodeId
                        id
                        type
                    }
                    systemSystemTagsBySystemId{
                        nodes{
                            nodeId
                            systemTagBySystemTagId{
                                nodeId
                                id
                                tag
                            }
                        }
                    }
                }
            }
        }`,
        mapResultToProps: (updatedSystem, { system, systemType, systemTypes }) => ({
            system: {
                ...system,
                ...updatedSystem,
            },
            systemType: systemTypes.find(({ id }) => id === updatedSystem.systemTypeId) || systemType,
        }),
    },
    createSystemSystemTag: {
        mutation: gql`mutation CreateSystemSystemTag(
            $systemId:Int!,
            $systemTagId:Int!
        ){
            createSystemSystemTag(
                input:{
                    systemSystemTag:{
                        systemId:$systemId,
                        systemTagId:$systemTagId
                    }
                }
            ){
                systemSystemTag{
                    nodeId
                    systemId
                    systemBySystemId{
                        nodeId
                    }
                    systemTagId
                }
            }
        }`,
        mapResultToProps: (newSystemTag, { systemSystemTags, systemTags }) => ({
            systemSystemTags: systemSystemTags.concat({
                ...newSystemTag,
                systemTagBySystemTagId: systemTags.find(({ id }) => id === newSystemTag.systemTagId)
            }),
        }),
        refetchQueries: ({
            data: {
                createSystemSystemTag: {
                    systemSystemTag: {
                        systemBySystemId: {
                            nodeId
                        }
                    }
                }
            }
        }) => [{ query, variables: { nodeId } }]
    },
    deleteSystemSystemTag: {
        mutation: gql`mutation DeleteSystemSystemTag(
            $nodeId:ID!
        ){
            deleteSystemSystemTag(
                input:{
                    nodeId:$nodeId
                }
            ){
                systemSystemTag{
                    nodeId
                    systemId
                    systemBySystemId{
                        nodeId
                    }
                    systemTagId
                }
            }
        }`,
        mapResultToProps: ({ nodeId: deletedNID }, { systemSystemTags }) => ({
            systemSystemTags: systemSystemTags.filter(({ nodeId }) => nodeId !== deletedNID)
        }),
        refetchQueries: ({
            data: {
                deleteSystemSystemTag: {
                    systemSystemTag: {
                        systemBySystemId: {
                            nodeId
                        }
                    }
                }
            }
        }) => [{ query, variables: { nodeId } }]
    },
};

