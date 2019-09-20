import gql from 'graphql-tag';

import F from '../../../../schemas';

export default gql`
    {
        ...AllProjects
    }
    ${F.PRJ.ALL_PROJECTS}
`;
