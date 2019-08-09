import gql from 'graphql-tag';
import F from '../../../../../../schema';

export default gql`query SystemSet($id: Int!) {
    systemSetById(id: $id) {
        ...EntireSystemSet
    }
    allSystems {
        nodes {
            ...EntireSystem
        }
    }
} 
${F.SYS.ENTIRE_SYSTEM}
${F.PRJ.ENTIRE_SYSTEM_SET}
`;

// export default gql`query SelectEntireSystemSet($systemSetId: Int!) {
//     allManufacturers {
//         nodes {
//             nodeId
//             id
//             name
//         }
//     }
//     allSystems {
//         nodes {
//             nodeId
//             id
//             name
//             manufacturerId
//             systemInfillSizesBySystemId {
//                 nodes {
//                     nodeId
//                     infillSize
//                 }
//             }
//             systemOptionsBySystemId(
//                 orderBy: OPTION_ORDER_ASC,
//                 condition: {
//                     presentationLevel: SYSTEM
//                 }
//             ) {
//                 nodes {
//                     nodeId
//                     id
//                     name
//                     optionOrder
//                     optionValuesBySystemOptionId(orderBy: VALUE_ORDER_ASC) {
//                         nodes {
//                             nodeId
//                             id
//                             name
//                             value
//                             valueOrder
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     systemSet: selectEntireSystemSet(systemSetId: $systemSetId) {
//         id
//         infillSize
//         system {
//             id
//             name
//             infillSizes
//             manufacturer {
//                 id
//                 name
//             }
//             systemType {
//                 id
//                 type
//             }
//         }
//         selectedOptionValues {
//             selectedValueId
//             systemOption {
//                 id
//                 name
//                 optionOrder
//                 overrideLevel
//                 presentationLevel
//             }
//             optionValues {
//                 id
//                 name
//                 value
//                 valueOrder
//             }
//         }
//         detailTypeConfigurationTypes {
//             detailType {
//                 id
//                 type
//                 entrance
//                 vertical
//             }
//             configurationTypes {
//                 selected
//                 systemDefault {
//                     invalid
//                     configurationType {
//                         id
//                         type
//                         door
//                         required
//                         mirrorable
//                         presentationLevel
//                         overrideLevel
//                     }
//                     systemTypeDefault {
//                         id
//                         type
//                         door
//                     }
//                 }
//             }
//         }
//     }
// }`;
