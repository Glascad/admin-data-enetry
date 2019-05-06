import gql from 'graphql-tag';

export const PRESENTATION_LEVELS = gql`
    fragment PresentationLevels on Query {
        PresentationLevels: __type(name: "PresentationLevel") {
            enumValues {
                name
            }
        }
    }
`;
