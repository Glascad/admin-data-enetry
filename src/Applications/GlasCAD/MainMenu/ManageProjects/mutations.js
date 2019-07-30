import gql from 'graphql-tag';
import F from '../../../../schema';
import query from "./query";

export const createProjectMutation = {
    mutation: gql`
        mutation CreateProject($name: String!) {
            createOrUpdateProject(
                input: {
                    name: $name
                }
            ) {
                project {
                    ...ProjectFields    
                }
            }
        }
        ${F.PR_DATA.PROJECT_FIELDS}
    `,
    awaitRefetchQueries: true,
    refetchQueries: [{ query }],
};

export const deleteProjectMutation = {
    mutation: gql`
        mutation DeleteProject($projectId: Int!) {
            deleteEntireProject(
                input: {
                    projectId: $projectId
                    }
                ) {
                    integer
            }
        }
    `,
    awaitRefetchQueries: true,
    refetchQueries: [{ query }],
};
