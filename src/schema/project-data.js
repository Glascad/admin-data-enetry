import gql from 'graphql-tag';

import * as ED from './elevation-data';
import * as SD from './system-data';

// FIELDS

export const PROJECT_FIELDS = gql`
    fragment ProjectFields on Project {
        __typename
        nodeId
        id
        name
        defaultElevation
        # elevationsByProjectId {
        #     totalCount
        # }
    }
`;

// export const SYSTEM_SET_FIELDS = gql`
//     fragment SystemSetFields on SystemSet {
//         __typename
//         nodeId
//         id
//         name
//         systemType
//     }
// `;

// export const SYSTEM_SET_OPTION_VALUE_FIELDS = gql`
//     fragment SystemSetOptionValueFields on SystemSetOptionValue {
//         __typename
//         nodeId
//         optionName
//         name
//     }
// `;

// export const SYSTEM_SET_DETAIL_TYPE_CONFIGURATION_TYPE_FIELDS = gql`
//     fragment SystemSetDetailTypeConfigurationTypeFields on SystemSetDetailTypeConfigurationType {
//         __typename
//         nodeId
//         detailType
//         configurationType
//     }
// `;

// ALL OF TYPE

// replace with RLS
export const ALL_PROJECTS = gql`
    fragment AllProjects on Query {
        __typename
        allProjects {
            nodes {
                ...ProjectFields
            }
        }
    }
    ${PROJECT_FIELDS}
`;

// ENTIRE TYPE

// export const ENTIRE_SYSTEM_SET_OPTION_VALUE = gql`
//     fragment EntireSystemSetOptionValue on SystemSetOptionValue {
//          __typename
//         nodeId
//         systemOptionBySystemIdAndOptionName {
//             ...EntireSystemOption
//         }
//         optionValueBySystemIdAndOptionNameAndName {
//             ...OptionValueFields
//         }
//     }
// `;

// export const ENTIRE_SYSTEM_SET = gql`
//     fragment EntireSystemSet on SystemSet {
//         __typename
//         nodeId
//         id
//         systemBySystemId {
//             ...EntireSystem
//         }
//         systemSetOptionValuesBySystemSetIdAndSystemId {
//             nodes {
//             #    ...EntireSystemSetOptionValue
//                 ...SystemSetOptionValueFields
//             }
//         }
//         systemSetDetailTypeConfigurationTypesBySystemSetIdAndSystemIdAndSystemType {
//             nodes {
//                 ...SystemSetDetailTypeConfigurationTypeFields
//             }
//         }
//         elevationsBySystemSetId {
//             totalCount
//         }
//     }
//     ${SD.ENTIRE_SYSTEM}
//     ${SD.ENTIRE_SYSTEM_OPTION}
//     ${SD.OPTION_VALUE_FIELDS}
//     ${SYSTEM_SET_OPTION_VALUE_FIELDS}
//     ${SYSTEM_SET_DETAIL_TYPE_CONFIGURATION_TYPE_FIELDS}
// `;

export const ENTIRE_PROJECT = gql`
    fragment EntireProject on Project {
        ...ProjectFields
        elevationsByProjectId(orderBy: NAME_ASC) {
            nodes {
                ...ElevationFields
                # ...EntireElevation
            }
        }
        # systemSetsByProjectId {
        #     nodes {
        #         ...SystemSetFields
        #         systemBySystemId {
        #             name
        #             manufacturerByManufacturerId {
        #                 name
        #             }
        #         }
        #         elevationsBySystemSetId {
        #             totalCount
        #         }
        #     }
        # }
    }
    ${PROJECT_FIELDS}
    ${ED.ELEVATION_FIELDS}
`;

// ${SYSTEM_SET_FIELDS}
