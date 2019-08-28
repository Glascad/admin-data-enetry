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
    }
`;

export const SYSTEM_OPTION_VALUE_FIELDS = gql`
    fragment SystemOptionValueFields on SystemOptionValue {
        __typename
        nodeId
        id
        name
        raisedOptionNames
        raisedConfigurationTypes
    }
`;

export const SYSTEM_DETAIL_TYPE_FIELDS = gql`
    fragment SystemDetailTypeFields on SystemDetailType {
        __typename
        nodeId
        id
        detailType
    }
`;

export const DETAIL_OPTION_FIELDS = gql`
    fragment DetailOptionFields on DetailOption {
        __typename
        nodeId
        id
        name
        systemDetailTypeId
        parentDetailOptionValueId
    }
`;

export const DETAIL_OPTION_VALUE_FIELDS = gql`
    fragment DetailOptionValueFields on DetailOptionValue {
        __typename
        nodeId
        id
        name
    }
`;

export const SYSTEM_CONFIGURATION_TYPE_FIELDS = gql`
    fragment SystemConfigurationTypeFields on SystemConfigurationType {
        __typename
        nodeId
        id
        configurationType
        optional
    }
`;

export const CONFIGURATION_OPTION_FIELDS = gql`
    fragment ConfigurationOptionFields on ConfigurationOption {
        __typename
        nodeId
        id
        name
        systemConfigurationTypeId
        parentConfigurationOptionValueId
    }
`;

export const CONFIGURATION_OPTION_VALUE_FIELDS = gql`
    fragment ConfigurationOptionValueFields on ConfigurationOptionValue {
        __typename
        nodeId
        id
        name
    }
`;

export const CONFIGURATION_FIELDS = gql`
    fragment ConfigurationFields on Configuration {
        __typename
        nodeId
        id
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

export const ENTIRE_CONFIGURATION = gql`
    fragment EntireConfiguration on Configuration {
        ...ConfigurationFields
    }
    ${CONFIGURATION_FIELDS}
`;

export const ENTIRE_CONFIGURATION_OPTION_VALUE = gql`
    fragment EntireConfigurationOptionValue on ConfigurationOptionValue {
        ...ConfigurationOptionValueFields
        configurationsByConfigurationOptionValueId(orderBy: ID_ASC) {
            nodes {
                ...EntireConfiguration
            }
        }
    }
    ${CONFIGURATION_OPTION_VALUE_FIELDS}
    ${ENTIRE_CONFIGURATION}
`;

export const ENTIRE_CONFIGURATION_OPTION = gql`
    fragment EntireConfigurationOption on ConfigurationOption {
        ...ConfigurationOptionFields
        configurationOptionValuesByConfigurationOptionId(orderBy: ID_ASC) {
            nodes {
                ...EntireConfigurationOptionValue
            }
        }
    }
    ${CONFIGURATION_OPTION_FIELDS}
    ${ENTIRE_CONFIGURATION_OPTION_VALUE}
`;

export const ENTIRE_DETAIL_OPTION_VALUE = gql`
    fragment EntireDetailOptionValue on DetailOptionValue {
        ...DetailOptionValueFields
        systemConfigurationTypesByDetailOptionValueId(orderBy: ID_ASC) {
            nodes {
                ...SystemConfigurationTypeFields
            }
        }
    }
    ${DETAIL_OPTION_VALUE_FIELDS}
    ${SYSTEM_CONFIGURATION_TYPE_FIELDS}
`;

export const ENTIRE_DETAIL_OPTION = gql`
    fragment EntireDetailOption on DetailOption {
        ...DetailOptionFields
        detailOptionValuesByDetailOptionId(orderBy: ID_ASC) {
            nodes {
                ...EntireDetailOptionValue
            }
        }
    }
    ${DETAIL_OPTION_FIELDS}
    ${ENTIRE_DETAIL_OPTION_VALUE}
`;

export const ENTIRE_SYSTEM_OPTION_VALUE = gql`
    fragment EntireSystemOptionValue on SystemOptionValue {
        ...SystemOptionValueFields
        systemDetailTypesBySystemOptionValueId(orderBy: ID_ASC) {
            nodes {
                ...SystemDetailTypeFields
            }
        }
    }
    ${SYSTEM_OPTION_VALUE_FIELDS}
    ${SYSTEM_DETAIL_TYPE_FIELDS}
`;

export const ENTIRE_SYSTEM_OPTION = gql`
    fragment EntireSystemOption on SystemOption {
        ...SystemOptionFields
        systemOptionValuesBySystemOptionId(orderBy: ID_ASC) {
            nodes {
                ...EntireSystemOptionValue
            }
        }
    }
    ${SYSTEM_OPTION_FIELDS}
    ${ENTIRE_SYSTEM_OPTION_VALUE}
`;

export const ENTIRE_SYSTEM = gql`
    fragment EntireSystem on System {
        ...SystemFields
        manufacturerByManufacturerId {
            ...ManufacturerFields
        }
        systemOptionsBySystemId(orderBy: PARENT_SYSTEM_OPTION_VALUE_ID_ASC) {
            nodes {
                ...EntireSystemOption
            }
        }
        detailOptionsBySystemId(orderBy: PARENT_DETAIL_OPTION_VALUE_ID_ASC) {
            nodes {
                ...EntireDetailOption
            }
        }
        configurationOptionsBySystemId(orderBy: PARENT_CONFIGURATION_OPTION_VALUE_ID_ASC) {
            nodes {
                ...EntireConfigurationOption
            }
        }
    }
    ${SYSTEM_FIELDS}
    ${AD.MANUFACTURER_FIELDS}
    ${ENTIRE_SYSTEM_OPTION}
    ${ENTIRE_DETAIL_OPTION}
    ${ENTIRE_CONFIGURATION_OPTION}
`;
