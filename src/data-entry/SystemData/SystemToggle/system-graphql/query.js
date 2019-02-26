import gql from 'graphql-tag';
import {
    ENTIRE_SYSTEM,
    ALL_SYSTEM_TYPES,
    ALL_SYSTEM_TAGS,
    ALL_INFILL_SIZES,
    ALL_INFILL_POCKET_SIZES,
    ALL_INFILL_POCKET_TYPES,
    ALL_CONFIGURATION_TYPES,
} from '../../../../graphql/fragments';

export default gql`
    query SystemById($id:Int!){
        systemById(id:$id){
            ...EntireSystem
        }
        ...AllSystemTypes
        ...AllSystemTags
        ...AllInfillSizes
        ...AllInfillPocketTypes
        ...AllInfillPocketSizes
        ...AllConfigurationTypes
    }
    ${ENTIRE_SYSTEM}
    ${ALL_SYSTEM_TYPES}
    ${ALL_SYSTEM_TAGS}
    ${ALL_INFILL_SIZES}
    ${ALL_INFILL_POCKET_SIZES}
    ${ALL_INFILL_POCKET_TYPES}
    ${ALL_CONFIGURATION_TYPES}
`;
