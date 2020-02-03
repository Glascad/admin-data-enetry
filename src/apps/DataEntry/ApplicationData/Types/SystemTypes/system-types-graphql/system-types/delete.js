// import gql from 'graphql-tag';

// export default {
//     mutation: gql`mutation DeleteSystemType(
//         $nodeId:ID!
//     ){
//         deleteSystemType(
//             input:{
//                 nodeId:$nodeId
//             }
//         ){
//             systemType{
//                 nodeId
//                 id
//                 type
//                 systemTypeDetailTypeConfigurationTypesBySystemTypeId{
//                     nodes{
//                         nodeId
//                         overrideLevel
//                         presentationLevel
//                         required
//                         mirrorable
//                         detailTypeByDetailTypeId{
//                             nodeId
//                             id
//                         }
//                         configurationTypeByConfigurationTypeId{
//                             nodeId
//                             id
//                             type
//                             door
//                         }
//                     }
//                 }
//             }
//         }
//     }`,
// };
