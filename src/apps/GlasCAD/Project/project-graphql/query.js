import gql from 'graphql-tag';

import F from '../../../../schemas';

export default gql`
    query ProjectById($id:Int!) {
        projectById(id:$id) {
            ...EntireProject
        }
    }
    ${F.PROJ.ENTIRE_PROJECT}
`;
