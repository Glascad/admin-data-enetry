
import { CRUDList } from '../../../../../components';

import * as CRUDOptions from './detail-types-graphql';

export default CRUDList(CRUDOptions, {
    itemClass: "Detail Type",
    extractList: ({
        data: {
            allDetailTypes: {
                nodes = [],
            } = {},
        } = {},
    }) => nodes,
    mapPillProps: ({
        nodeId,
        type,
    }) => ({
        nodeId,
        key: nodeId,
        title: type,
        arguments: {
            nodeId,
        },
    }),
    mapCreateVariables: ({ }, { input }) => ({
        type: input,
        vertical: false,
        entrance: false,
    }),
    mapUpdateVariables: ({ arguments: { nodeId } }, { input }) => ({
        nodeId,
        type: input,
    }),
    extractName: ({ type }) => type,
});
