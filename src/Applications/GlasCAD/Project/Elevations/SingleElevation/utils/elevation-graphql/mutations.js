import gql from 'graphql-tag';
import F from '../../../../../../../schema';
import query from './query';

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
            console.log({ data });
            const oldResult = cache.readQuery({ query, variables: { id } });
            console.log({ oldResult });

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
    },
};
