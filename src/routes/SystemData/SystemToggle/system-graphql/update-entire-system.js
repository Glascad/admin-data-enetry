import gql from 'graphql-tag';
import { ENTIRE_SYSTEM } from '../../../../graphql/fragments';

export default gql`
    mutation UpdateEntireSystem($updateEntireSystemInput:UpdateEntireSystemInput){
        updateEntireSystem(input:$updateEntireSystemInput){
            system:systems{
                    ...EntireSystem
                }
            }
        }
    }
    ${ENTIRE_SYSTEM}
`;
