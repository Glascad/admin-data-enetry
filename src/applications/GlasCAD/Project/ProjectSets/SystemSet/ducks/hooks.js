import {
    useReducer,
    useCallback,
    useMemo,
} from 'react';

import merge from './merge';


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
        selectedOptionValues: [],
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

const createReducer = queryStatus => (
    (state, { action, payload } = {}) => (
        reduceState(
            state,
            action(
                state,
                payload,
                queryStatus
            ) || state,
            queryStatus
        )
    )
);

export default function useSystemSetReducer(queryStatus) {

    const reducer = useMemo(() => createReducer(queryStatus), [queryStatus]);

    const [state, rawDispatch] = useReducer(reducer, initialState);

    // map arguments to dispatch
    const dispatch = useCallback((action, payload) => rawDispatch({ action, payload }), [rawDispatch]);

    // merge system input
    const systemSet = useMemo(() => merge(state, queryStatus), [state, queryStatus]);

    return {
        state,
        dispatch,
        systemSet
    };
}
