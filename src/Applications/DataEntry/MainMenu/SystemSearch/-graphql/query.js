import gql from 'graphql-tag';
import F from '../../../../../schemas';

export default {
    query: gql`
        {
            ...AllSystems
            ...AllManufacturers
            # ...AllSystemTypes
        }
        ${F.SYS.ALL_SYSTEMS}
        ${F.APP.ALL_MANUFACTURERS}
    `,
    // ${F.APP.ALL_SYSTEM_TYPES}
};
