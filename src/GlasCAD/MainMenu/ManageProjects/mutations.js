import gql from 'graphql-tag';
import F from '../../../schema/fragments';

export default {
    createProject: {
        mutation: gql`
            mutation CreateProject($name: String!) {
                createProject(
                    input: {
                        project: {
                            name: $name
                        }
                    }
                ) {
                    project {
                        ...ProjectFields
                    }
                }
            }
            ${F.PR_DATA.PROJECT_FIELDS}
        `,
    },
};
