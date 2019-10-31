import gql from 'graphql-tag';
import F from '../../../../../../../schemas';

export default gql`
    query ElevationById($id: Int!) {
        elevationById(id: $id) {
            ...EntireElevation
        }
        systemById(id: 6) {
            ...EntireSystem
        }
    }
    ${F.ELVTN.ENTIRE_ELEVATION}
    ${F.MNFG.ENTIRE_SYSTEM}
`;

export const bugReportQuery = gql`
    {
        bugReports: getBugReports {
            id
            report
            username
            location
            timestamp
            state
        }
    }
`;
