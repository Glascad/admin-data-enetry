import gql from 'graphql-tag';
import F from '../../../../../../../schemas';
import query from './query';
import projectQuery from '../../../../project-graphql/query';
import { parseSearch } from '../../../../../../../utils';

export default gql`
        mutation UpdateEntireElevation($elevation: EntireElevationInput!) {
            updateEntireElevation(
                input: {
                    elevation: $elevation
                }
            ) {
                elevation {
                    ...EntireElevation
                }
            }
        }
        ${F.ELVTN.ENTIRE_ELEVATION}
    `;

export const updateEntireElevationOptions = {
    update(cache, {
        data: {
            updateEntireElevation: {
                elevation,
                elevation: {
                    id,
                },
            },
        },
    }) {

        const oldResult = (() => {
            try {
                return cache.readQuery({ query, variables: { id } });
            } catch (err) {
                console.log({ err });
                return {};
            }
        })();

        console.log({ oldResult });

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
                elevation: {
                    id,
                },
            },
        },
    }) => [{
        query: projectQuery,
        variables: {
            id: parseSearch(window.location.search).projectId,
        },
    }, {
        query,
        variables: {
            id,
        },
    }],
}