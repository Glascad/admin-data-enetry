import gql from 'graphql-tag';

// ROOT FRAGMENTS

export const MANUFACTURER_FIELDS = gql`
    fragment ManufacturerFields on Manufacturer {
        nodeId
        id
        name
    }
`;

export const SYSTEM_TYPE_FIELDS = gql`
    fragment SystemTypeFields on SystemType {
        nodeId
        id
        type
    }
`;

export const SYSTEM_TAG_FIELDS = gql`
    fragment SystemTagFields on SystemTag {
        nodeId
        id
        tag
    }
`;

export const DETAIL_TYPE_FIELDS = gql`
    fragment DetailTypeFields on DetailType {
        nodeId
        id
        type
        entrance
        vertical
    }
`;

export const CONFIGURATION_TYPE_FIELDS = gql`
    fragment ConfigurationTypeFields on ConfigurationType {
        nodeId
        id
        type
        door
    }
`;

export const SYSTEM_TYPE_DETAIL_TYPE_CONFIGURATION_TYPE_FIELDS = gql`
    fragment SystemTypeDetailTypeConfigurationTypeFields on SystemTypeDetailTypeConfigurationType {
        nodeId
        mirrorable
        required
        presentationLevel
        overrideLevel
        systemTypeId
        detailTypeId
        configurationTypeId
    }
`;

export const SYSTEM_CONFIGURATION_OVERRIDE_FIELDS = gql`
    fragment SystemConfigurationOverrideFields on SystemConfigurationOverride {
        nodeId
        mirrorableOverride
        requiredOverride
        presentationLevelOverride
        overrideLevelOverride
        systemId
        systemTypeId
        detailTypeId
        configurationTypeId
    }
`;

export const SYSTEM_OPTION_FIELDS = gql`
    fragment SystemOptionFields on SystemOption {
        nodeId
        id
        name
        systemId
        optionOrder
        overrideLevel
        presentationLevel
    }
`;

export const OPTION_VALUE_FIELDS = gql`
    fragment OptionValueFields on OptionValue {
        nodeId
        id
        name
        value
    }
`;

export const INFILL_SIZE_FIELDS = gql`
    fragment InfillSizeFields on InfillSize {
        nodeId
        size
    }
`;

export const INFILL_POCKET_SIZE_FIELDS = gql`
    fragment InfillPocketSizeFields on InfillPocketSize {
        nodeId
        size
    }
`;

export const INFILL_POCKET_TYPE_FIELDS = gql`
    fragment InfillPocketTypeFields on InfillPocketType {
        nodeId
        id
        type
    }
`;

export const SYSTEM_FIELDS = gql`
    fragment SystemFields on System {
        nodeId
        id
        manufacturerId
        systemTypeId
        name
        depth
        shimSize
        defaultGlassSize
        defaultGlassBite
        defaultSightline
        inset
        frontInset
        topGap
        bottomGap
        sideGap
        glassGap
        meetingStileGap
    }
`;

// ALL OF TYPE

export const ALL_MANUFACTURERS = gql`
    fragment AllManufacturers on Query {
        allManufacturers {
            nodes {
                ...ManufacturerFields
            }
        }
    }
    ${MANUFACTURER_FIELDS}
`;

export const ALL_SYSTEM_TYPES = gql`
    fragment AllSystemTypes on Query {
        allSystemTypes {
            nodes {
                ...SystemTypeFields
            }
        }
    }
    ${SYSTEM_TYPE_FIELDS}
`;

export const ALL_SYSTEM_TAGS = gql`
    fragment AllSystemTags on Query {
        allSystemTags {
            nodes {
                ...SystemTagFields
            }
        }
    }
    ${SYSTEM_TAG_FIELDS}
`;

export const ALL_DETAIL_TYPES = gql`
    fragment AllDetailTypes on Query {
        allDetailTypes {
            nodes {
                ...DetailTypeFields
            }
        }
    }
    ${DETAIL_TYPE_FIELDS}
`;

export const ALL_CONFIGURATION_TYPES = gql`
    fragment AllConfigurationTypes on Query {
        allConfigurationTypes {
            nodes {
                ...ConfigurationTypeFields
            }
        }
    }
    ${CONFIGURATION_TYPE_FIELDS}
`;

export const ALL_SYSTEM_TYPE_DETAIL_TYPE_CONFIGURATION_TYPES = gql`
    fragment AllSystemTypeDetailTypeConfigurationTypes on Query {
        allSystemTypeDetailTypeConfigurationTypes {
            nodes {
                ...SystemTypeDetailTypeConfigurationTypeFields
            }
        }
    }
    ${SYSTEM_TYPE_DETAIL_TYPE_CONFIGURATION_TYPE_FIELDS}
`;

export const ALL_SYSTEM_CONFIGURATION_OVERRIDES = gql`
    fragment AllSystemConfigurationOverrides on Query {
        allSystemConfigurationOverrides {
            nodes {
                ...SystemConfigurationOverrideFields
            }
        }
    }
    ${SYSTEM_CONFIGURATION_OVERRIDE_FIELDS}
`;

export const ALL_SYSTEM_OPTIONS = gql`
    fragment AllSystemOptions on Query {
        allSystemOptions {
            nodes {
                ...SystemOptionFields
            }
        }
    }
    ${SYSTEM_OPTION_FIELDS}
`;

export const ALL_OPTION_VALUES = gql`
    fragment AllOptionValues on Query {
        allOptionValues {
            nodes {
                ...OptionValueFields
            }
        }
    }
    ${OPTION_VALUE_FIELDS}
`;

export const ALL_INFILL_SIZES = gql`
    fragment AllInfillSizes on Query {
        allInfillSizes(orderBy:SIZE_ASC) {
            nodes {
                ...InfillSizeFields
            }
        }
    }
    ${INFILL_SIZE_FIELDS}
`;

export const ALL_INFILL_POCKET_SIZES = gql`
    fragment AllInfillPocketSizes on Query {
        allInfillPocketSizes(orderBy:SIZE_ASC) {
            nodes {
                ...InfillPocketSizeFields
            }
        }
    }
    ${INFILL_POCKET_SIZE_FIELDS}
`;

export const ALL_INFILL_POCKET_TYPES = gql`
    fragment AllInfillPocketTypes on Query {
        allInfillPocketTypes {
            nodes {
                ...InfillPocketTypeFields
            }
        }
    }
    ${INFILL_POCKET_TYPE_FIELDS}
`;

export const ALL_SYSTEMS = gql`
    fragment AllSystems on Query {
        allSystems {
            nodes {
                ...SystemFields
            }
        }
    }
    ${SYSTEM_FIELDS}
`;



// COMPOSED FRAGMENTS

export const ENTIRE_SYSTEM_TYPE_DETAIL_TYPE_CONFIGURATION_TYPE = gql`
    fragment EntireSystemTypeDetailTypeConfigurationType on SystemTypeDetailTypeConfigurationType {
        ...SystemTypeDetailTypeConfigurationTypeFields
        detailTypeByDetailTypeId {
            ...DetailTypeFields
        }
        configurationTypeByConfigurationTypeId {
            ...ConfigurationTypeFields
        }
    }
    ${SYSTEM_TYPE_DETAIL_TYPE_CONFIGURATION_TYPE_FIELDS}
    ${DETAIL_TYPE_FIELDS}
    ${CONFIGURATION_TYPE_FIELDS}
`;

export const ENTIRE_SYSTEM_TYPE = gql`
    fragment EntireSystemType on SystemType {
        ...SystemTypeFields
        systemTypeDetailTypeConfigurationTypesBySystemTypeId {
            nodes {
                ...EntireSystemTypeDetailTypeConfigurationType
            }
        }
    }
    ${SYSTEM_TYPE_FIELDS}
    ${ENTIRE_SYSTEM_TYPE_DETAIL_TYPE_CONFIGURATION_TYPE}
`;

// DO NOT USE THIS ONE, NOT NECESSARY
// export const ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE = gql`
//     fragment EntireSystemConfigurationOverride on SystemConfigurationOverride {
//         ...SystemConfigurationOverrideFields
//         detailTypeByDetailTypeId {
//             ...DetailTypeFields
//         }
//         configurationTypeByConfigurationTypeId {
//             ...ConfigurationTypeFields
//         }
//     }
//     ${SYSTEM_CONFIGURATION_OVERRIDE_FIELDS}
//     ${DETAIL_TYPE_FIELDS}
//     ${CONFIGURATION_TYPE_FIELDS}
// `;

export const ENTIRE_SYSTEM_OPTION = gql`
    fragment EntireSystemOption on SystemOption {
        ...SystemOptionFields
        optionValuesBySystemOptionId {
            nodes {
                ...OptionValueFields
            }
        }
        systemOptionConfigurationTypesBySystemOptionId {
            nodes {
                nodeId
                configurationTypeId
                configurationTypeByConfigurationTypeId {
                    ...ConfigurationTypeFields
                }
            }
        }
    }
    ${SYSTEM_OPTION_FIELDS}
    ${OPTION_VALUE_FIELDS}
    ${CONFIGURATION_TYPE_FIELDS}
`;

export const ENTIRE_SYSTEM = gql`
    fragment EntireSystem on System {
        ...SystemFields
        manufacturerByManufacturerId {
            ...ManufacturerFields
        }
        systemTypeBySystemTypeId {
            ...EntireSystemType
        }
        systemSystemTagsBySystemId {
            nodes {
                nodeId
                systemTagId
                systemTagBySystemTagId {
                    ...SystemTagFields
                }
            }
        }
        systemInfillSizesBySystemId {
            nodes {
                nodeId
                infillSize
                infillSizeByInfillSize {
                    ...InfillSizeFields
                }
            }
        }
        systemInfillPocketSizesBySystemId {
            nodes {
                nodeId
                infillPocketSize
                infillPocketSizeByInfillPocketSize {
                    ...InfillPocketSizeFields
                }
            }
        }
        systemInfillPocketTypesBySystemId {
            nodes {
                nodeId
                infillPocketTypeId
                infillPocketTypeByInfillPocketTypeId {
                    ...InfillPocketTypeFields
                }
            }
        }
        invalidSystemConfigurationTypesBySystemId {
            nodes {
                nodeId
                invalidConfigurationTypeId
                configurationTypeByInvalidConfigurationTypeId {
                    ...ConfigurationTypeFields
                }
            }
        }
        systemOptionsBySystemId {
            nodes {
                ...EntireSystemOption
            }
        }
    }
    ${SYSTEM_FIELDS}
    ${MANUFACTURER_FIELDS}
    ${ENTIRE_SYSTEM_TYPE}
    ${SYSTEM_TAG_FIELDS}
    ${INFILL_SIZE_FIELDS}
    ${INFILL_POCKET_SIZE_FIELDS}
    ${INFILL_POCKET_TYPE_FIELDS}
    ${CONFIGURATION_TYPE_FIELDS}
    ${ENTIRE_SYSTEM_OPTION}
`;
