// import React, { Component } from 'react';
// import { Query } from 'react-apollo';
// import { query } from './practice-gql';

// import {
//     Pill,
//     HeadedListContainer
// } from '../../../../components';

// export default class Practice extends Component {
//     //Normally we would get the mnfg. id through some other query. This was added here because with PostGraphile you can't query by a string, only by a nodeId.
//     state = {
//         nodeId: 'WyJtYW51ZmFjdHVyZXJzIiwxXQ=='
//     };
//     render = () => {
//         const {
//             state: {
//                 nodeId
//             }
//         } = this;
        
//         return (
//             <Query 
//                 query={query}
//                 variables={{nodeId}}
//             >
//             {({
//                 loading,
//                 error,
//                 data: {
//                    manufacturer: {
//                        systemsByManufacturerId: {
//                            nodes: systems = []
//                        } = {}
//                    } = {}
//                 } = {}
//             }) => {
//                 return (
//                     <HeadedListContainer 
//                         title="Systems by Manufacturer"
//                         list={{
//                             items: systems,
//                             renderItem: ({
//                                 nodeId,
//                                 id,
//                                 name
//                             }) => ( 
//                                 <Pill 
//                                     key={nodeId}
//                                     nodeId={nodeId}
//                                     align="left"
//                                     tagname="li"
//                                     title={name} 
//                                 />
//                             )
//                         }}
//                     />
//                 )
//             }} 
//             </Query>
//         )
//     }
// }