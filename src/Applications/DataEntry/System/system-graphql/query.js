import gql from 'graphql-tag';
import F from '../../../../schema';

export default gql`
    query SystemById($id: Int!) {
        systemById(id: $id) {
            ...EntireSystem
        }
        # ...PresentationLevels
        ...AllManufacturers
        ...AllSystemTypes
        ...ValidOptions
        # ...AllSystemTags
        # ...AllInfillSizes
        # ...AllInfillPocketTypes
        # ...AllInfillPocketSizes
        # ...AllConfigurationTypes
    }
    ${F.SYS.ENTIRE_SYSTEM}
    ${F.APP.ALL_MANUFACTURERS}
    ${F.APP.ALL_SYSTEM_TYPES}
    ${F.CTRLD.VALID_OPTIONS}
`;

// # ${F.CTRLD.PRESENTATION_LEVELS}
// # ${F.APP.ALL_SYSTEM_TAGS}
// # ${F.APP.ALL_INFILL_SIZES}
// # ${F.APP.ALL_INFILL_POCKET_SIZES}
// # ${F.APP.ALL_INFILL_POCKET_TYPES}
// # ${F.APP.ALL_CONFIGURATION_TYPES}
