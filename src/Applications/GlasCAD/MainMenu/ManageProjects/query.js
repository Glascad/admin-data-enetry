import gql from 'graphql-tag';

import F from '../../../../schema';

export default gql`
    {
        ...AllProjects
    }
    ${F.PRJ.ALL_PROJECTS}
`;
