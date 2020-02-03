import gql from 'graphql-tag';

import F from '../../../../schemas';

export default gql`
    {
        ...AllProjects
    }
    ${F.PROJ.ALL_PROJECTS}
`;
