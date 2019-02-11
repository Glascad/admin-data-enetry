import gql from 'graphql-tag';
import {
    ENTIRE_SYSTEM,
    SYSTEM_TYPE_FIELDS,
    SYSTEM_TAG_FIELDS,
    INFILL_SIZE_FIELDS,
    INFILL_POCKET_SIZE_FIELDS,
    INFILL_POCKET_TYPE_FIELDS,
} from '../../../../graphql/fragments';

export default gql`
    query System($nodeId:ID!){
        system(nodeId:$nodeId){
            ...EntireSystem
        }
        allSystemTypes{
            nodes{
                ...SystemTypeFields
            }
        }
        allSystemTags{
            nodes{
                ...SystemTagFields
            }
        }
        allInfillSizes{
            nodes{
                ...InfillSizeFields
            }
        }
        allInfillPocketTypes{
            nodes{
                ...InfillPocketTypeFields
            }
        }
        allInfillPocketSizes{
            nodes{
                ...InfillPocketSizeFields
            }
        }
        allConfigurationTypes{
            nodes{
                ...ConfigurationTypeFields
            }
        }
    }
    ${ENTIRE_SYSTEM}
    ${SYSTEM_TYPE_FIELDS}
    ${SYSTEM_TAG_FIELDS}
    ${INFILL_SIZE_FIELDS}
    ${INFILL_POCKET_SIZE_FIELDS}
    ${INFILL_POCKET_TYPE_FIELDS}
`;
