import gql from 'graphql-tag';
import F from '../../../../schemas';
import query from "./query";

export const createProjectMutation = {
    mutation: gql`
        mutation CreateProject($name: String!) {
            createOrUpdateProject(
                input: {
                    projectUpdate: {
                        name: $name
                    }
                }
            ) {
                project {
                    ...ProjectFields    
                }
            }
        }
        ${F.PROJ.PROJECT_FIELDS}
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
