import gql from 'graphql-tag';
import F from '../../../../../schemas';

export default gql`
        mutation CopyElevation($elevationId: Int!, $newName: String!) {
            copyElevation(
                input: {
                    elevationId: $elevationId
                    newName: $newName
                }
            ) {
                elevation {
                    ...EntireElevation
                }
            }
        }
        ${F.ELVTN.ENTIRE_ELEVATION}
    `;