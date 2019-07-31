import gql from 'graphql-tag';

import * as AD from './application-data';

// FIELDS

export const SYSTEM_CONFIGURATION_OVERRIDE_FIELDS = gql`
    fragment SystemConfigurationOverrideFields on SystemConfigurationOverride {
        __typename
        nodeId
        mirrorableOverride
        requiredOverride
        presentationLevelOverride
        overrideLevelOverride
        systemId
        systemType
        detailType
        configurationType
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

// ALL OF TYPE

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

// ENTIRE TYPE

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
                configurationType
            }
        }
    }
    ${SYSTEM_OPTION_FIELDS}
    ${OPTION_VALUE_FIELDS}
`;

// # ${AD.CONFIGURATION_TYPE_FIELDS}

export const ENTIRE_SYSTEM = gql`
    fragment EntireSystem on System {
        ...SystemFields
        manufacturerByManufacturerId {
            ...ManufacturerFields
        }
        systemTypeBySystemTypeId {
            ...EntireSystemType
        }
        # systemSystemTagsBySystemId {
        #     nodes {
        #         nodeId
        #         systemTagId
        #         systemTagBySystemTagId {
        #             ...SystemTagFields
        #         }
        #     }
        # }
        # systemInfillSizesBySystemId {
        #     nodes {
        #         nodeId
        #         infillSize
        #         infillSizeByInfillSize {
        #             ...InfillSizeFields
        #         }
        #     }
        # }
        # systemInfillPocketSizesBySystemId {
        #     nodes {
        #         nodeId
        #         infillPocketSize
        #         infillPocketSizeByInfillPocketSize {
        #             ...InfillPocketSizeFields
        #         }
        #     }
        # }
        # systemInfillPocketTypesBySystemId {
        #     nodes {
        #         nodeId
        #         infillPocketTypeId
        #         infillPocketTypeByInfillPocketTypeId {
        #             ...InfillPocketTypeFields
        #         }
        #     }
        # }
        invalidSystemConfigurationTypesBySystemId {
            nodes {
                nodeId
                invalidConfigurationType
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
    ${AD.MANUFACTURER_FIELDS}
    ${AD.ENTIRE_SYSTEM_TYPE}
    ${SYSTEM_CONFIGURATION_OVERRIDE_FIELDS}
    ${ENTIRE_SYSTEM_OPTION}
`;

// # ${AD.SYSTEM_TAG_FIELDS}
// # ${AD.INFILL_SIZE_FIELDS}
// # ${AD.INFILL_POCKET_SIZE_FIELDS}
// # ${AD.INFILL_POCKET_TYPE_FIELDS}
// # ${AD.CONFIGURATION_TYPE_FIELDS}

