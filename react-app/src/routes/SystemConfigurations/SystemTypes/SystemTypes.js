import React from 'react';

import { CRUDListWrapper } from '../../../components';

import * as CRUDProps from './system-types-graphql';

import DetailTypes from './DetailTypes/DetailTypes';

export default function SystemTypes() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="System Type"
            extractList={({
                allSystemTypes: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({ type }) => ({
                title: type,
            })}
            mapCreateVariables={({ }, { input }) => ({
                type: input,
            })}
            extractCreatedNID={({
                createSystemType: {
                    configurationType: {
                        nodeId,
                    },
                },
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                type: input,
            })}
            extractName={({ type }) => type}
        >
            {({ selectedItem }) => (
                selectedItem.nodeId ? (
                    <DetailTypes
                        systemType={selectedItem}
                    />
                ) : null)}
        </CRUDListWrapper>
    );
}

// import { Query } from 'react-apollo';

// import query from './query';

// import SysTypes from './SysTypes/SysTypes';
// import SysTags from './SysTags/SysTags';

// export default function SystemTypes() {
//     return (
//         <Query
//             query={query}
//         >
//             {({
//                 loading,
//                 error,
//                 data: {
//                     allSystemTypes: {
//                         nodes: systemTypes = [],
//                     } = {},
//                     allSystemTags: {
//                         nodes: systemTags = []
//                     } = {}
//                 } = {},
//             }) => (
//                     <div>
//                         <SysTypes
//                             systemTypes={systemTypes}
//                         />
//                         <SysTags
//                             systemTags={systemTags}
//                         />
//                     </div>
//                 )}
//         </Query>
//     );
// }
