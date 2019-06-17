import gql from 'graphql-tag';

export default {
    mutation: gql`
        mutation DeleteElevation($elevationId: Int) {
            deleteEntireElevation(
                input: {
                    elevationId: $elevationId
                }
            ) {
                integer
            }
        }`,
};
