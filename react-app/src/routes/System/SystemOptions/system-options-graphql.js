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
            $mirrorable:Bool,
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
                    mirrorable
                    optionOrder
                    overrideLevel
                    presentationLevel
                    optionValuesBySystemOptionId {
                        nodes {
                            nodeId
                            id
                            value
                        }
                    }
                }
            }
        }`,
    }
};
