import gql from 'graphql-tag';
import F from '../../../../../schema';

export default {
    updateEntireSystem: {
        mutation: gql`
            mutation UpdateEntireSystem($system: EntireSystemInput!) {
                updateEntireSystem(input: {
                    system: $system
                }) {
                    system {
                        ...EntireSystem
                    }
                }
            }
            ${F.SYS.ENTIRE_SYSTEM}
        `,
    },
};
