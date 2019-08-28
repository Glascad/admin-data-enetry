import gql from "graphql-tag";

export const CURRENT_USER = gql`
    fragment CurrentUser on Query { 
        currentUser: getCurrentUser {
            id
            username
            role
            projectId
        }
    }
`;
