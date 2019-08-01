import gql from 'graphql-tag';
import query from '../../project-graphql/query';
import F from '../../../../../schema';
import { parseSearch } from '../../../../../utils';

export default {
    mutation: gql`
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
    `,
    awaitRefetchQueries: true,
    refetchQueries: () => [{
        query,
        variables: {
            id: +parseSearch(window.location.search).projectId,
        },
    }],
};
