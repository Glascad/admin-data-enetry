import gql from 'graphql-tag';
import F from '../../../../../schema/fragments';

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
    },
};
