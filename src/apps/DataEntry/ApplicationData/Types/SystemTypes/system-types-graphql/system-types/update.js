// import gql from 'graphql-tag';

// export default {
//     mutation: gql`mutation UpdateSystemType(
//         $nodeId:ID!,
//         $type:String!
//     ){
//         updateSystemType(
//             input:{
//                 nodeId:$nodeId
//                 systemTypePatch:{
//                     type:$type
//                 }
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
