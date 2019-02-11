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
