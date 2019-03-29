import gql from 'graphql-tag';
import F from '../../../../../schema';

export default gql`
    query SystemById($id: Int!) {
        systemById(id: $id) {
            ...EntireSystem
        }
        ...AllSystemTypes
        ...AllSystemTags
        ...AllInfillSizes
        ...AllInfillPocketTypes
        ...AllInfillPocketSizes
        ...AllConfigurationTypes
    }
    ${F.SYS_DATA.ENTIRE_SYSTEM}
    ${F.APP_DATA.ALL_SYSTEM_TYPES}
    ${F.APP_DATA.ALL_SYSTEM_TAGS}
    ${F.APP_DATA.ALL_INFILL_SIZES}
    ${F.APP_DATA.ALL_INFILL_POCKET_SIZES}
    ${F.APP_DATA.ALL_INFILL_POCKET_TYPES}
    ${F.APP_DATA.ALL_CONFIGURATION_TYPES}
`;
