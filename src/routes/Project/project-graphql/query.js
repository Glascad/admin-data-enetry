import gql from 'graphql-tag';

import { ENTIRE_ELEVATION } from '../../../graphql/fragments';

export default gql`{
    allElevations {
        nodes {
            ...EntireElevation
        }
    }
} ${ENTIRE_ELEVATION}`;
