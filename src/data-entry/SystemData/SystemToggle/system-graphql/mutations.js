import gql from 'graphql-tag';
import { ENTIRE_SYSTEM } from '../../../../graphql/fragments';

export default {
    updateEntireSystem: {
        mutation: gql`
            mutation UpdateEntireSystem($system: EntireSystemInput!) {
                updateEntireSystem(input: {
                    system: $system
                }) {
                    system: systems {
                        ...EntireSystem
                    }
                }
            }
            ${ENTIRE_SYSTEM}
        `,
    },
};


/**

id: Int
manufacturerId: Int
systemTypeId: Int
name: String
depth: Float
defaultGlassSize: Float
defaultGlassBite: Float
defaultSightline: Float
topGap: Float
bottomGap: Float
sideGap: Float
meetingStileGap: Float
inset: Float
glassGap: Float
shimSize: Float
frontInset: Boolean
systemTagIds: [Int]
systemTagIdsToDelete: [Int]
infillSizes: [Float]
infillSizesToDelete: [Float]
infillPocketTypeIds: [Int]
infillPocketTypeIdsToDelete: [Int]
infillPocketSizes: [Float]
infillPocketSizesToDelete: [Float]
invalidConfigurationTypeIds: [Int]
invalidConfigurationTypeIdsToDelete: [Int]
configurationOverrides: [EntireSystemConfigurationOverrideInput]
configurationOverridesToDelete: [EntireSystemConfigurationOverrideInput]
systemOptions: [EntireSystemOptionInput]
systemOptionIdsToDelete: [Int]

 */
