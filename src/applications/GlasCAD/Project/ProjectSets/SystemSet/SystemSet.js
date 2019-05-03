import React, {
    PureComponent,
    useReducer,
    useCallback,
    useEffect,
    useMemo,
} from 'react';

import { Link } from 'react-router-dom';

import {
    TabNavigator,
    TitleBar,
    ApolloWrapper,
} from '../../../../../components';

import SystemSetInfo from './views/SystemSetInfo';
import SystemSetOptions from './views/SystemSetOptions';
import SystemSetConfigurationTypes from './views/SystemSetConfigurationTypes';

import query from './system-set-graphql/query';
import updateEntireSystemSet from './system-set-graphql/mutation';

import { parseSearch } from '../../../../../utils';

const initialState = {
    filters: {
        manufacturerId: undefined,
        systemTypeId: undefined,
    },
    selectOptions: {
        manufacturers: [],
        systems: [],
        infillSizes: [],
    },
    systemSetInput: {
        systemId: undefined,
        infillSize: undefined,
        systemOptions: [],
        detailTypeConfigurationTypes: [],
        detailTypeConfigurationTypesToUnselect: [],
    },
};

const manufacturerChanged = (oldState, intermediateState) => (
    intermediateState.filters.manufacturerId !== oldState.filters.manufacturerId
);

const systemChanged = (oldState, intermediateState) => (
    intermediateState.systemSetInput.systemId !== oldState.systemSetInput.systemId
);

const removeSystemAfterManufacturerChange = (oldState, intermediateState) => {
    if (manufacturerChanged(oldState, intermediateState)) {
        return {
            ...intermediateState,
            systemSetInput: {
                ...intermediateState.systemSetInput,
                systemId: undefined,
            },
        };
    }
    else return intermediateState;
}

const removeInfillSizeAfterSystemChange = (oldState, intermediateState) => {
    if (systemChanged(oldState, intermediateState)) {
        return {
            ...intermediateState,
            systemSetInput: {
                ...intermediateState.systemSetInput,
                infillSize: undefined,
            },
        };
    }
    else return intermediateState;
}

const callbacks = [
    removeSystemAfterManufacturerChange,
    removeInfillSizeAfterSystemChange,
];

const reduceState = (state, intermediateState, queryStatus) => callbacks.reduce(
    (accumulatedState, cb) => cb(state, accumulatedState, queryStatus),
    intermediateState
);

const createReducer = queryStatus => (state, { action, payload } = {}) => reduceState(
    state,
    action(
        state,
        payload,
        queryStatus
    ) || state,
    queryStatus
);

function SystemSet({
    location: {
        search,
    },
    match: {
        path,
    },
    queryStatus,
}) {
    const reducer = useMemo(() => createReducer(queryStatus), [queryStatus]);

    const [state, rawDispatch] = useReducer(reducer, initialState);

    // map arguments to dispatch
    const dispatch = useCallback((action, payload) => rawDispatch({ action, payload }), [rawDispatch]);

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
