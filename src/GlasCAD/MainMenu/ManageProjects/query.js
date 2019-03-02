import gql from 'graphql-tag';

import F from '../../../schema/fragments';

export default gql`
    {
        ...AllProjects
    }
    ${F.PR_DATA.ALL_PROJECTS}
`;
