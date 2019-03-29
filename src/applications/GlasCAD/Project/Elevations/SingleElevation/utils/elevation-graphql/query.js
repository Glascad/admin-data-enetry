import gql from 'graphql-tag';
import F from '../../../../../../../schema';

export default gql`
    query ElevationById($id: Int!) {
        elevationById(id: $id) {
            ...EntireElevation
        }
        systemById(id: 1) {
            ...EntireSystem
        }
    }
    ${F.EL_DATA.ENTIRE_ELEVATION}
    ${F.SYS_DATA.ENTIRE_SYSTEM}
`;
