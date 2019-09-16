import gql from 'graphql-tag';

import * as AD from './application-data';

// FIELDS

export const SYSTEM_FIELDS = gql`
    fragment SystemFields on System {
        __typename
        nodeId
        id
        manufacturerId
        systemType
        name
        # depth
        # shimSize
        # defaultGlassSize
        # defaultGlassBite
        # defaultSightline
        # inset
        # frontInset
        # topGap
        # bottomGap
        # sideGap
        # glassGap
        # meetingStileGap
    }
`;

export const SYSTEM_OPTION_FIELDS = gql`
    fragment SystemOptionFields on SystemOption {
        __typename
        nodeId
        id
        name
        parentSystemOptionValueId
        defaultSystemOptionValueId
    }
`;

export const SYSTEM_OPTION_VALUE_FIELDS = gql`
    fragment SystemOptionValueFields on SystemOptionValue {
        __typename
        nodeId
        id
        name
        # raisedOptionNames
        # raisedConfigurationTypes
        parentSystemOptionId
    }
`;

export const system_detail_FIELDS = gql`
    fragment SystemDetailFields on SystemDetail {
        __typename
        nodeId
        id
        detailType
        parentSystemOptionValueId
    }
`;

export const DETAIL_OPTION_FIELDS = gql`
    fragment DetailOptionFields on DetailOption {
        __typename
        nodeId
        id
        name
        parentSystemDetailId
        parentDetailOptionValueId
        defaultDetailOptionValueId
    }
`;

export const DETAIL_OPTION_VALUE_FIELDS = gql`
    fragment DetailOptionValueFields on DetailOptionValue {
        __typename
        nodeId
        id
        name
        parentDetailOptionId
    }
`;

export const SYSTEM_CONFIGURATION_FIELDS = gql`
    fragment SystemConfigurationFields on SystemConfiguration {
        __typename
        nodeId
        id
        configurationType
        optional
        parentDetailOptionValueId
    }
`;

export const CONFIGURATION_OPTION_FIELDS = gql`
    fragment ConfigurationOptionFields on ConfigurationOption {
        __typename
        nodeId
        id
        name
        parentSystemConfigurationId
        parentConfigurationOptionValueId
        defaultConfigurationOptionValueId
    }
`;

export const CONFIGURATION_OPTION_VALUE_FIELDS = gql`
    fragment ConfigurationOptionValueFields on ConfigurationOptionValue {
        __typename
        nodeId
        id
        name
        parentConfigurationOptionId
    }
`;

// ALL OF TYPE

export const ALL_SYSTEMS = gql`
    fragment AllSystems on Query {
        __typename
        allSystems {
            nodes {
                ...SystemFields
                manufacturerByManufacturerId {
                    ...ManufacturerFields
                }
            }
        }
    }
    ${SYSTEM_FIELDS}
    ${AD.MANUFACTURER_FIELDS}
`;

// ENTIRE TYPE

// export const ENTIRE_CONFIGURATION = gql`
//     fragment EntireConfiguration on Configuration {
//         ...ConfigurationFields
//     }
//     ${CONFIGURATION_FIELDS}
// `;

// export const ENTIRE_CONFIGURATION_OPTION_VALUE = gql`
//     fragment EntireConfigurationOptionValue on ConfigurationOptionValue {
//         ...ConfigurationOptionValueFields
//         configurationsByConfigurationOptionValueId {
//             nodes {
//                 ...EntireConfiguration
//             }
//         }
//     }
//     ${CONFIGURATION_OPTION_VALUE_FIELDS}
//     ${ENTIRE_CONFIGURATION}
// `;

// export const ENTIRE_CONFIGURATION_OPTION = gql`
//     fragment EntireConfigurationOption on ConfigurationOption {
//         ...ConfigurationOptionFields
//         configurationOptionValuesByConfigurationOptionId {
//             nodes {
//                 ...EntireConfigurationOptionValue
//             }
//         }
//     }
//     ${CONFIGURATION_OPTION_FIELDS}
//     ${ENTIRE_CONFIGURATION_OPTION_VALUE}
// `;

// export const ENTIRE_DETAIL_OPTION_VALUE = gql`
//     fragment EntireDetailOptionValue on DetailOptionValue {
//         ...DetailOptionValueFields
//         systemConfigurationsByDetailOptionValueId {
//             nodes {
//                 ...SystemConfigurationFields
//             }
//         }
//     }
//     ${DETAIL_OPTION_VALUE_FIELDS}
//     ${SYSTEM_CONFIGURATION_FIELDS}
// `;

// export const ENTIRE_DETAIL_OPTION = gql`
//     fragment EntireDetailOption on DetailOption {
//         ...DetailOptionFields
//         detailOptionValuesByDetailOptionId {
//             nodes {
//                 ...EntireDetailOptionValue
//             }
//         }
//     }
//     ${DETAIL_OPTION_FIELDS}
//     ${ENTIRE_DETAIL_OPTION_VALUE}
// `;

// export const ENTIRE_SYSTEM_OPTION_VALUE = gql`
//     fragment EntireSystemOptionValue on SystemOptionValue {
//         ...SystemOptionValueFields
//         systemDetailsBySystemOptionValueId {
//             nodes {
//                 ...SystemDetailFields
//             }
//         }
//     }
//     ${SYSTEM_OPTION_VALUE_FIELDS}
//     ${system_detail_FIELDS}
// `;

// export const ENTIRE_SYSTEM_OPTION = gql`
//     fragment EntireSystemOption on SystemOption {
//         ...SystemOptionFields
//         systemOptionValuesBySystemOptionId {
//             nodes {
//                 ...EntireSystemOptionValue
//             }
//         }
//     }
//     ${SYSTEM_OPTION_FIELDS}
//     ${ENTIRE_SYSTEM_OPTION_VALUE}
// `;

export const ENTIRE_SYSTEM = gql`
    fragment EntireSystem on System {
        ...SystemFields
        manufacturerByManufacturerId {
            ...ManufacturerFields
        }
        systemOptionsBySystemId {
            nodes {
                ...SystemOptionFields
            }
        }
        systemOptionValuesBySystemId {
            nodes {
                ...SystemOptionValueFields
            }
        }
        systemDetailsBySystemId {
            nodes {
                ...SystemDetailFields
            }
        }
        detailOptionsBySystemId {
            nodes {
                ...DetailOptionFields
            }
        }
        detailOptionValuesBySystemId {
            nodes {
                ...DetailOptionValueFields
            }
        }
        systemConfigurationsBySystemId {
            nodes {
                ...SystemConfigurationFields
            }
        }
        configurationOptionsBySystemId {
            nodes {
                ...ConfigurationOptionFields
            }
        }
        configurationOptionValuesBySystemId {
            nodes {
                ...ConfigurationOptionValueFields
            }
        }
    }
    ${SYSTEM_FIELDS}
    ${AD.MANUFACTURER_FIELDS}
    ${SYSTEM_OPTION_FIELDS}
    ${SYSTEM_OPTION_VALUE_FIELDS}
    ${system_detail_FIELDS}
    ${DETAIL_OPTION_FIELDS}
    ${DETAIL_OPTION_VALUE_FIELDS}
    ${SYSTEM_CONFIGURATION_FIELDS}
    ${CONFIGURATION_OPTION_FIELDS}
    ${CONFIGURATION_OPTION_VALUE_FIELDS}
`;
