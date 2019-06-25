import gql from 'graphql-tag';
import F from '../../../../../../../schema';
import query from './query';
import projectQuery from '../../../../project-graphql/query';
import { parseSearch } from '../../../../../../../utils';

export default {
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

        const data = {
            ...oldResult,
            elevationById: elevation,
        };

        cache.writeQuery({
            query,
            variables: {
                id,
            },
            data,
        });
    },
    awaitRefetchQueries: true,
    refetchQueries: ({
        data: {
            updateEntireElevation: {
                elevation: [
                    {
                        id,
                    },
                ],
            },
        },
    }) => [{
        query: projectQuery,
        variables: {
            id: +parseSearch(window.location.search).projectId,
        },
    }, {
        query,
        variables: {
            id,
        },
    }],
};
