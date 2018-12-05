import React from 'react';
import { CRUDListWrapper } from '../../../../../components';

import * as CRUDProps from './detail-types-graphql';

import DetailTypeInfo from './DetailTypeInfo';

export default function DetailTypes() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="Detail Type"
            extractList={({
                allDetailTypes: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({ type }) => ({
                title: type,
            })}
            mapCreateVariables={({ }, { input }) => ({
                type: input,
                vertical: false,
                entrance: false,
            })}
            extractCreatedNID={({
                createDetailType: {
                    detailType: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                type: input,
            })}
            extractName={({ type }) => type}
        >
            {({
                CRUD: {
                    updateItem,
                },
                selectedItem,
            }) => (
                    <DetailTypeInfo
                        detailType={selectedItem}
                        updateDetailType={updateItem}
                    />
                )}
        </CRUDListWrapper>
    );
}

// export default CRUDList(CRUDOptions, {
//     itemClass: "Detail Type",
//     extractList: ({
//         data: {
//             allDetailTypes: {
//                 nodes = [],
//             } = {},
//         } = {},
//     }) => nodes,
//     mapPillProps: ({
//         nodeId,
//         type,
//     }) => ({
//         nodeId,
//         key: nodeId,
//         title: type,
//         arguments: {
//             nodeId,
//         },
//     }),
//     mapCreateVariables: ({ }, { input }) => ({
//         type: input,
//         vertical: false,
//         entrance: false,
//     }),
//     mapUpdateVariables: ({ arguments: { nodeId } }, { input }) => ({
//         nodeId,
//         type: input,
//     }),
//     extractName: ({ type }) => type,
// });
