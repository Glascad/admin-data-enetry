import gql from 'graphql-tag';

export const MANUFACTURER_FIELDS = gql`
    fragment ManufacturerFields on Manufacturer {
        __typename
        nodeId
        id
        name
    }
`;

// FIELDS

export const PART_FIELDS = gql`
    fragment PartFields on Part {
        __typename
        nodeId
        id
        partNumber
        orientation
        paths {
            commands {
                command
                arguments
            }
        }
    }
`;

export const SYSTEM_FIELDS = gql`
    fragment SystemFields on System {
        __typename
        nodeId
        id
        manufacturerId
        systemType
        name
    }
`;

export const SYSTEM_OPTION_FIELDS = gql`
    fragment SystemOptionFields on SystemOption {
        __typename
        nodeId
        path
        defaultSystemOptionValue
    }
`;

export const SYSTEM_OPTION_VALUE_FIELDS = gql`
    fragment SystemOptionValueFields on SystemOptionValue {
        __typename
        nodeId
        path
    }
`;

export const OPTION_GROUP_FIELDS = gql`
    fragment OptionGroupFields on OptionGroup {
        __typename
        nodeId
        name
    }
`;

export const SYSTEM_DETAIL_FIELDS = gql`
    fragment SystemDetailFields on SystemDetail {
        __typename
        nodeId
        path
    }
`;

export const DETAIL_OPTION_FIELDS = gql`
    fragment DetailOptionFields on DetailOption {
        __typename
        nodeId
        path
        defaultDetailOptionValue
    }
`;

export const DETAIL_OPTION_VALUE_FIELDS = gql`
    fragment DetailOptionValueFields on DetailOptionValue {
        __typename
        nodeId
        path
    }
`;

export const DETAIL_CONFIGURATION_FIELDS = gql`
    fragment SystemConfigurationFields on SystemConfiguration {
        __typename
        nodeId
        path
        optional
        transform { a b c d e f g h i }
    }
`;

export const CONFIGURATION_OPTION_FIELDS = gql`
    fragment ConfigurationOptionFields on ConfigurationOption {
        __typename
        nodeId
        path
        defaultConfigurationOptionValue
    }
`;

export const CONFIGURATION_OPTION_VALUE_FIELDS = gql`
    fragment ConfigurationOptionValueFields on ConfigurationOptionValue {
        __typename
        nodeId
        path
    }
`;

// ALL OF TYPE

export const ALL_MANUFACTURERS = gql`
    fragment AllManufacturers on Query {
        __typename
        allManufacturers {
            nodes {
                ...ManufacturerFields
                systemsByManufacturerId {
                    nodes {
                        ...SystemFields
                    }
                }
            }
        }
    }
    ${MANUFACTURER_FIELDS}
    ${SYSTEM_FIELDS}
`;

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
    ${MANUFACTURER_FIELDS}
`;

// ENTIRE TYPE

export const ENTIRE_MANUFACTURER = gql`
    fragment EntireManufacturer on Manufacturer {
        ...ManufacturerFields
        systemsByManufacturerId {
            nodes {
                ...SystemFields
            }
        }
    }
    ${MANUFACTURER_FIELDS}
    ${SYSTEM_FIELDS}
`;

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
        optionGroupsBySystemId(orderBy: NAME_DESC) {
            nodes {
                ...OptionGroupFields
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
    ${MANUFACTURER_FIELDS}
    ${SYSTEM_OPTION_FIELDS}
    ${SYSTEM_OPTION_VALUE_FIELDS}
    ${OPTION_GROUP_FIELDS}
    ${SYSTEM_DETAIL_FIELDS}
    ${DETAIL_OPTION_FIELDS}
    ${DETAIL_OPTION_VALUE_FIELDS}
    ${DETAIL_CONFIGURATION_FIELDS}
    ${CONFIGURATION_OPTION_FIELDS}
    ${CONFIGURATION_OPTION_VALUE_FIELDS}
`;
