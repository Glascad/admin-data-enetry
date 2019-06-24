import gql from 'graphql-tag';
import F from '../../../../../../../schema';
import query from './query';
import projectQuery from '../../../../project-graphql/query';
import { parseSearch } from '../../../../../../../utils';

export default {
    updateEntireElevation: {
        mutation: gql`
            mutation UpdateEntireElevation($elevation: EntireElevationInput!) {
                updateEntireElevation(
                    input: {
                        elevation: $elevation
                    }
                ) {
                    elevation: elevations {
                        ...EntireElevation
                    }
                }
            }
            ${F.EL_DATA.ENTIRE_ELEVATION}
        `,
        update(cache, {
            data,
            data: {
                updateEntireElevation: {
                    elevation: {
                        0: elevation,
                        0: {
                            id,
                        },
                    },
                },
            },
        }) {
            const oldResult = cache.readQuery({ query, variables: { id } });

            const newResult = {
                data: {
                    ...oldResult,
                    elevationById: elevation,
                },
            };
            cache.writeQuery({
                query,
                variables: {
                    id,
                },
                ...newResult,
            });
        },
        awaitRefetchQueries: true,
        refetchQueries: () => [{
            query: projectQuery,
            variables: {
                id: +parseSearch(window.location.search).projectId,
            },
        }],
    },
};
