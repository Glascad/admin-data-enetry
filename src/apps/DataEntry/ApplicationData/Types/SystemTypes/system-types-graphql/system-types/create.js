// import gql from 'graphql-tag';

// export default {
//     mutation: gql`mutation CreateSystemType(
//         $type:String!
//     ){
//         createSystemType(input:{
//             systemType:{
//                 type:$type
//             }
//         }){
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
