import gql from 'graphql-tag';
import F from '../../../../schemas';

export const createProjectMutation = gql`
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
    `;

export const deleteProjectMutation = gql`
        mutation DeleteProject($projectId: Int!) {
            deleteEntireProject(
                input: {
                    projectId: $projectId
                    }
                ) {
                    integer
            }
        }
    `;
        
