import gql from 'graphql-tag';
import query from '../../project-graphql/query';
import { parseSearch } from '../../../../../utils';

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
        }
    `,
    awaitRefetchQueries: true,
    refetchQueries: () => [{
        query,
        variables: {
            id: +parseSearch(window.location.search).projectId,
        },
    }],
};
