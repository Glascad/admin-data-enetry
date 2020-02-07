import gql from 'graphql-tag';

export default gql`
        mutation DeleteElevation($elevationId: Int) {
            deleteEntireElevation(
                input: {
                    elevationId: $elevationId
                }
            ) {
                integer
            }
        }
    `;
    
