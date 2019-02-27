import gql from 'graphql-tag';

import F from '../../../schema/fragments';

export default gql`{
    allElevations {
        nodes {
            ...EntireElevation
        }
    }
} ${F.EL_DATA.ENTIRE_ELEVATION}`;
