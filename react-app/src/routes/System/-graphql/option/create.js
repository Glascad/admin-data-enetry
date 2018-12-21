import gql from 'graphql-tag'; 
import query from '../query';

export default {
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
     }) => [{ ...query, variables: { nodeId } }]
};
