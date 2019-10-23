import gql from 'graphql-tag';
import F from '../../../../../schemas';

export default gql`
    query SystemById($id: Int!) {
        systemById(id: $id) {
            ...EntireSystem
        }
        # ...PresentationLevels
        ...AllManufacturers
        ...SystemTypes
        ...DetailTypes
        ...ConfigurationTypes
        ...ValidOptions
        # ...AllSystemTags
        # ...AllInfillSizes
        # ...AllInfillPocketTypes
        # ...AllInfillPocketSizes
        # ...AllConfigurationTypes
    }
    ${F.MNFG.ENTIRE_SYSTEM}
    ${F.MNFG.ALL_MANUFACTURERS}
    ${F.CTRLD.SYSTEM_TYPES}
    ${F.CTRLD.DETAIL_TYPES}
    ${F.CTRLD.CONFIGURATION_TYPES}
    ${F.CTRLD.VALID_OPTIONS}
`;

// # ${F.CTRLD.PRESENTATION_LEVELS}
// # ${F.MNFG.ALL_SYSTEM_TAGS}
// # ${F.MNFG.ALL_INFILL_SIZES}
// # ${F.MNFG.ALL_INFILL_POCKET_SIZES}
// # ${F.MNFG.ALL_INFILL_POCKET_TYPES}
// # ${F.MNFG.ALL_CONFIGURATION_TYPES}
