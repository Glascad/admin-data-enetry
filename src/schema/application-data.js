import gql from 'graphql-tag';

// FIELDS

export const MANUFACTURER_FIELDS = gql`
    fragment ManufacturerFields on Manufacturer {
        __typename
        nodeId
        id
        name
    }
`;

// export const SYSTEM_TYPE_FIELDS = gql`
//     fragment SystemTypeFields on SystemType {
//         __typename
//         nodeId
//         id
//         type
//     }
// `;

// export const SYSTEM_TAG_FIELDS = gql`
//     fragment SystemTagFields on SystemTag {
//         __typename
//         nodeId
//         id
//         tag
//     }
// `;

// export const DETAIL_TYPE_FIELDS = gql`
//     fragment DetailTypeFields on DetailType {
//         __typename
//         nodeId
//         id
//         type
//         entrance
//         vertical
//     }
// `;

// export const CONFIGURATION_TYPE_FIELDS = gql`
//     fragment ConfigurationTypeFields on ConfigurationType {
//         __typename
//         nodeId
//         id
//         type
//         door
//     }
// `;

export const SYSTEM_TYPE_DETAIL_TYPE_FIELDS = gql`
    fragment SystemTypeDetailTypeFields on SystemTypeDetailType {
        __typename
        nodeId
        systemType
        detailType
    }
`;

export const SYSTEM_TYPE_DETAIL_TYPE_CONFIGURATION_TYPE_FIELDS = gql`
    fragment SystemTypeDetailTypeConfigurationTypeFields on SystemTypeDetailTypeConfigurationType {
        __typename
        nodeId
        systemType
        detailType
        configurationType
        mirrorable
        required
        presentationLevel
        overrideLevel
    }
`;

// export const INFILL_SIZE_FIELDS = gql`
//     fragment InfillSizeFields on InfillSize {
//         __typename
//         nodeId
//         size
//     }
// `;

// export const INFILL_POCKET_SIZE_FIELDS = gql`
//     fragment InfillPocketSizeFields on InfillPocketSize {
//         __typename
//         nodeId
//         size
//     }
// `;

// export const INFILL_POCKET_TYPE_FIELDS = gql`
//     fragment InfillPocketTypeFields on InfillPocketType {
//         __typename
//         nodeId
//         id
//         type
//     }
// `;

// ALL OF TYPE

export const ALL_MANUFACTURERS = gql`
    fragment AllManufacturers on Query {
        __typename
        allManufacturers {
            nodes {
                ...ManufacturerFields
            }
        }
    }
    ${MANUFACTURER_FIELDS}
`;

// export const ALL_SYSTEM_TYPES = gql`
//     fragment AllSystemTypes on Query {
//         __typename
//         allSystemTypes {
//             nodes {
//                 ...SystemTypeFields
//             }
//         }
//     }
//     ${SYSTEM_TYPE_FIELDS}
// `;

// export const ALL_SYSTEM_TAGS = gql`
//     fragment AllSystemTags on Query {
//         __typename
//         allSystemTags {
//             nodes {
//                 ...SystemTagFields
//             }
//         }
//     }
//     ${SYSTEM_TAG_FIELDS}
// `;

// export const ALL_DETAIL_TYPES = gql`
//     fragment AllDetailTypes on Query {
//         __typename
//         allDetailTypes {
//             nodes {
//                 ...DetailTypeFields
//             }
//         }
//     }
//     ${DETAIL_TYPE_FIELDS}
// `;

// export const ALL_CONFIGURATION_TYPES = gql`
//     fragment AllConfigurationTypes on Query {
//         __typename
//         allConfigurationTypes {
//             nodes {
//                 ...ConfigurationTypeFields
//             }
//         }
//     }
//     ${CONFIGURATION_TYPE_FIELDS}
// `;

// export const ALL_INFILL_SIZES = gql`
//     fragment AllInfillSizes on Query {
//         __typename
//         allInfillSizes(orderBy:SIZE_ASC) {
//             nodes {
//                 ...InfillSizeFields
//             }
//         }
//     }
//     ${INFILL_SIZE_FIELDS}
// `;

// export const ALL_INFILL_POCKET_SIZES = gql`
//     fragment AllInfillPocketSizes on Query {
//         __typename
//         allInfillPocketSizes(orderBy:SIZE_ASC) {
//             nodes {
//                 ...InfillPocketSizeFields
//             }
//         }
//     }
//     ${INFILL_POCKET_SIZE_FIELDS}
// `;

// export const ALL_INFILL_POCKET_TYPES = gql`
//     fragment AllInfillPocketTypes on Query {
//         __typename
//         allInfillPocketTypes {
//             nodes {
//                 ...InfillPocketTypeFields
//             }
//         }
//     }
//     ${INFILL_POCKET_TYPE_FIELDS}
// `;

// ENTIRE TYPE

// export const ENTIRE_SYSTEM_TYPE_DETAIL_TYPE_CONFIGURATION_TYPE = gql`
//     fragment EntireSystemTypeDetailTypeConfigurationType on SystemTypeDetailTypeConfigurationType {
//         ...SystemTypeDetailTypeConfigurationTypeFields
//         detailTypeByDetailType
//         configurationType
//     }
//     ${SYSTEM_TYPE_DETAIL_TYPE_CONFIGURATION_TYPE_FIELDS}
// `;

// ${DETAIL_TYPE_FIELDS}
// ${CONFIGURATION_TYPE_FIELDS}

export const ENTIRE_SYSTEM_TYPE = gql`
    fragment EntireSystemType on SystemType {
        __typename
        nodeId
        type
        systemTypeDetailTypesBySystemType {
            nodes {
                ...SystemTypeDetailTypeFields
                systemTypeDetailTypeConfigurationTypesBySystemTypeAndDetailType {
                    nodes {
                        ...SystemTypeDetailTypeConfigurationTypeFields
                    }
                }
            }
        }
    }
    ${SYSTEM_TYPE_DETAIL_TYPE_FIELDS}
    ${SYSTEM_TYPE_DETAIL_TYPE_CONFIGURATION_TYPE_FIELDS}
`;

// # ${SYSTEM_TYPE_FIELDS}

export const ALL_SYSTEM_TYPES = gql`
    fragment AllSystemTypes on Query {
        allSystemTypes {
            nodes {
                ...EntireSystemType
            }
        }
    }
    ${ENTIRE_SYSTEM_TYPE}
`;
