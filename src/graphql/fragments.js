import gql from 'graphql-tag';

// ROOT FRAGMENTS

export const MANUFACTURER_FIELDS = gql`
    fragment ManufacturerFields on Manufacturer {
        __typename
        nodeId
        id
        name
    }
`;

export const SYSTEM_TYPE_FIELDS = gql`
    fragment SystemTypeFields on SystemType {
        __typename
        nodeId
        id
        type
    }
`;

export const SYSTEM_TAG_FIELDS = gql`
    fragment SystemTagFields on SystemTag {
        __typename
        nodeId
        id
        tag
    }
`;

export const DETAIL_TYPE_FIELDS = gql`
    fragment DetailTypeFields on DetailType {
        __typename
        nodeId
        id
        type
        entrance
        vertical
    }
`;

export const CONFIGURATION_TYPE_FIELDS = gql`
    fragment ConfigurationTypeFields on ConfigurationType {
        __typename
        nodeId
        id
        type
        door
    }
`;

export const SYSTEM_TYPE_DETAIL_TYPE_CONFIGURATION_TYPE_FIELDS = gql`
    fragment SystemTypeDetailTypeConfigurationTypeFields on SystemTypeDetailTypeConfigurationType {
        __typename
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
        __typename
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
        __typename
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
        __typename
        nodeId
        id
        name
        value
    }
`;

export const INFILL_SIZE_FIELDS = gql`
    fragment InfillSizeFields on InfillSize {
        __typename
        nodeId
        size
    }
`;

export const INFILL_POCKET_SIZE_FIELDS = gql`
    fragment InfillPocketSizeFields on InfillPocketSize {
        __typename
        nodeId
        size
    }
`;

export const INFILL_POCKET_TYPE_FIELDS = gql`
    fragment InfillPocketTypeFields on InfillPocketType {
        __typename
        nodeId
        id
        type
    }
`;

export const SYSTEM_FIELDS = gql`
    fragment SystemFields on System {
        __typename
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

export const ELEVATION_FIELDS = gql`
    fragment ElevationFields on Elevation {
        __typename
        nodeId
        id
        name
        finishedFloorOffset
        roughOpening {
            x
            y
        }
    }
`;

export const ELEVATION_CONTAINER_FIELDS = gql`
    fragment ElevationContainerFields on ElevationContainer {
        __typename
        nodeId
        id
        original
        contents
        bottomLeftOffset {
            x
            y
        }
        daylightOpening {
            x
            y
        }
    }
`;

export const CONTAINER_DETAIL_FIELDS = gql`
    fragment ContainerDetailFields on ContainerDetail {
        __typename
        nodeId
        vertical
        firstContainerId
        secondContainerId
    }
`;

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

export const ALL_SYSTEM_TYPES = gql`
    fragment AllSystemTypes on Query {
        __typename
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
        __typename
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
        __typename
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
        __typename
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
        __typename
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
        __typename
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
        __typename
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
        __typename
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
        __typename
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
        __typename
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
        __typename
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
        __typename
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
        systemConfigurationOverridesBySystemId {
            nodes {
                ...SystemConfigurationOverrideFields
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
    ${SYSTEM_CONFIGURATION_OVERRIDE_FIELDS}
    ${ENTIRE_SYSTEM_OPTION}
`;

export const ENTIRE_CONTAINER_DETAIL = gql`
    fragment EntireContainerDetail on ContainerDetail {
        ...ContainerDetailFields
        detailOptionValuesByContainerDetailId {
            nodes {
                nodeId
                optionValueId
            }
        }
    }
    ${CONTAINER_DETAIL_FIELDS}
`;

export const ENTIRE_ELEVATION = gql`
    fragment EntireElevation on Elevation {
        ...ElevationFields
        elevationContainersByElevationId {
            nodes {
                ...ElevationContainerFields
            }
        }
        containerDetailsByElevationId {
            nodes {
                ...EntireContainerDetail
            }
        }
    }
    ${ELEVATION_FIELDS}
    ${ELEVATION_CONTAINER_FIELDS}
    ${ENTIRE_CONTAINER_DETAIL}
`;
