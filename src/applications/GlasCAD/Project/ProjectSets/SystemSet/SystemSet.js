import React, { PureComponent, useReducer, useCallback } from 'react';

import { Link } from 'react-router-dom';

import { TabNavigator, TitleBar, ApolloWrapper } from '../../../../../components';

import SystemSetInfo from './views/SystemSetInfo';
import SystemSetOptions from './views/SystemSetOptions';
import SystemSetConfigurationTypes from './views/SystemSetConfigurationTypes';

import query from './system-set-graphql/query';
import updateEntireSystemSet from './system-set-graphql/mutation';

import { parseSearch } from '../../../../../utils';

// class SystemSet extends PureComponent {

//     state = {
//         filters: {
//             manufacturerId: 0,
//             systemTypeId: 0,
//         },
//         systemSetInput: {
//             systemId: 0,
//             infillSize: 0,
//             systemOptions: [],
//             detailTypeConfigurationTypes: [],
//             detailTypeConfigurationTypesToUnselect: [],
//         },
//     };

//     updateSystemSet = (ACTION, payload) => this.setState(state => ACTION(state, payload, this.props.queryStatus));

//     save = async () => {
//         const {
//             state: {
//                 systemSetInput,
//             },
//             props: {
//                 mutations: {
//                     updateEntireSystemSet,
//                 },
//             },
//         } = this;

//         const result = await updateEntireSystemSet({ systemSetInput });

//         console.log({ result });
//     }

//     render = () => {
//         const {
//             state: {
//                 filters,
//                 systemSetInput,
//             },
//             props: {
//                 location: {
//                     search,
//                 },
//                 match: {
//                     path,
//                 },
//                 queryStatus,
//             },
//             updateSystemSet,
//         } = this;

//         console.log(this.state);

//         return (
//             <>
//                 <TitleBar
//                     title="System Set"
//                     right={(
//                         <>
//                             <Link
//                                 to={`${path.replace(/\/system-set/, '')}${search}`}
//                             >
//                                 <button>
//                                     Cancel
//                                 </button>
//                             </Link>
//                             <button>
//                                 Reset
//                             </button>
//                             <button
//                                 className="action"
//                             >
//                                 Save
//                             </button>
//                         </>
//                     )}
//                 />
//                 <TabNavigator
//                     routes={{
//                         SystemSetInfo,
//                         SystemSetOptions,
//                         SystemSetConfigurationTypes,
//                     }}
//                     routeProps={{
//                         queryStatus,
//                         filters,
//                         systemSetInput,
//                         updateSystemSet,
//                     }}
//                 />
//             </>
//         );
//     }
// }

const initialState = {
    filters: {
        manufacturerId: 0,
        systemTypeId: 0,
    },
    systemSetInput: {
        systemId: 0,
        infillSize: 0,
        systemOptions: [],
        detailTypeConfigurationTypes: [],
        detailTypeConfigurationTypesToUnselect: [],
    },
};

const createReducer = queryStatus => (state, { action, ...payload }) => {

    const {
        filters: oldFilters,
        filters: {
            manufacturerId: oldManufacturerId,
            systemTypeId: oldSystemTypeId,
        },
        systemSetInput: oldSystemSetInput,
        systemSetInput: {
            systemId: oldSystemId,
        },
    } = state;

    const intermediateState = action ?
        action(queryStatus, state, payload)
        :
        {
            ...state,
            ...payload,
        };

    const {
        filters: newFilters,
        filters: {
            manufacturerId: newManufacturerId,
            systemTypeId: newSystemTypeId,
        },
        systemSetInput: newSystemSetInput,
    } = intermediateState;

    const {
        allManufacturers,
    } = queryStatus;

    const manufacturerChanged = newManufacturerId && newManufacturerId !== oldManufacturerId;
    const systemTypeChanged = newSystemTypeId && newSystemTypeId !== oldSystemTypeId;

    if (!(manufacturerChanged || systemTypeChanged)) return state;

    else {
        const manufacturerId = newManufacturerId || oldManufacturerId;
        const systemTypeId = newSystemTypeId || oldSystemTypeId;

        const manufacturer = manufacturerChanged && allManufacturers.find(({ id }) => id === manufacturerId);

        const systems = (manufacturer || {})._systems || []

        const systemId = manufacturerChanged ?
            (
                systems.find(({ id }) => id === oldSystemId)
                ||
                systems[0] || {}
            ).id
            :
            oldSystemId;

        return {
            ...state,
            ...intermediateState,
            filters: {
                ...oldFilters,
                ...newFilters,
                manufacturerId,
                systemTypeId,
            },
            systemSetInput: {
                ...oldSystemSetInput,
                ...newSystemSetInput,
                systemId,
            },
        };
    }
};

function SystemSet({
    location: {
        search,
    },
    match: {
        path,
    },
    queryStatus,
}) {
    const reducer = useCallback(() => createReducer(queryStatus), queryStatus);

    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        filters,
        systemSetInput,
    } = state;

    return (
        <>
            <TitleBar
                title="System Set"
                right={(
                    <>
                        <Link
                            to={`${path.replace(/\/system-set/, '')}${search}`}
                        >
                            <button>
                                Cancel
                            </button>
                        </Link>
                        <button>
                            Reset
                        </button>
                        <button
                            className="action"
                        >
                            Save
                        </button>
                    </>
                )}
            />
            <TabNavigator
                routes={{
                    SystemSetInfo,
                    SystemSetOptions,
                    SystemSetConfigurationTypes,
                }}
                routeProps={{
                    queryStatus,
                    filters,
                    systemSetInput,
                    dispatch,
                }}
            />
        </>
    );
}

export default function SystemSetWrapper(props) {
    const {
        location: {
            search,
        },
        queryStatus: queryStatusOne,
    } = props;

    const { projectId, systemSetId } = parseSearch(search);

    return (
        <ApolloWrapper
            query={{
                query,
                variables: {
                    projectId: +projectId || 0,
                    systemSetId: +systemSetId || 0,
                },
            }}
            mutations={{ updateEntireSystemSet }}
        >
            {({
                queryStatus: queryStatusTwo,
                mutations,
            }) => (
                    <SystemSet
                        {...props}
                        queryStatus={{
                            ...queryStatusOne,
                            ...queryStatusTwo,
                        }}
                        mutations={mutations}
                    />
                )}
        </ApolloWrapper>
    );
}
