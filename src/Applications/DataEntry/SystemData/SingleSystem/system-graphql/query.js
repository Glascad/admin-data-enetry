import gql from 'graphql-tag';
import F from '../../../../../schema';

export default gql`
    query SystemById($id: Int!) {
        systemById(id: $id) {
            ...EntireSystem
        }
        # ...PresentationLevels
        ...AllManufacturers
        # ...AllSystemTypes
        # ...AllSystemTags
        # ...AllInfillSizes
        # ...AllInfillPocketTypes
        # ...AllInfillPocketSizes
        # ...AllConfigurationTypes
    }
    ${F.APP.ALL_MANUFACTURERS}
    ${F.SYS.ENTIRE_SYSTEM}
`;

// # ${F.CTRLD.PRESENTATION_LEVELS}
// # ${F.APP.ALL_SYSTEM_TYPES}
// # ${F.APP.ALL_SYSTEM_TAGS}
// # ${F.APP.ALL_INFILL_SIZES}
// # ${F.APP.ALL_INFILL_POCKET_SIZES}
// # ${F.APP.ALL_INFILL_POCKET_TYPES}
// # ${F.APP.ALL_CONFIGURATION_TYPES}
