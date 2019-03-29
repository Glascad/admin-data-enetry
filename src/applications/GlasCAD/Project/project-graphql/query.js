import gql from 'graphql-tag';

import F from '../../../../schema';

export default gql`
    query ProjectById($id:Int!) {
        projectById(id:$id) {
            ...EntireProject
        }
    }
    ${F.PR_DATA.ENTIRE_PROJECT}
`;
