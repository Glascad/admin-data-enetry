import gql from 'graphql-tag';
import F from '../../../../../../schemas';

export default {
    query: gql`{
        # ...PresentationLevels
        ...DetailTypes
        ...ConfigurationTypes
        ...AllSystemTypes
    }
    # ${F.CTRLD.PRESENTATION_LEVELS}
    ${F.CTRLD.DETAIL_TYPES}
    ${F.CTRLD.CONFIGURATION_TYPES}
    ${F.APP.ALL_SYSTEM_TYPES}
    `,
};
