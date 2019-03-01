import gql from 'graphql-tag';
import F from '../../../../../schema/fragments';

export default gql`
    query ElevationById($id: Int!) {
        elevationById(id: $id) {
            ...EntireElevation
        }
    }
    ${F.EL_DATA.ENTIRE_ELEVATION}
`;
