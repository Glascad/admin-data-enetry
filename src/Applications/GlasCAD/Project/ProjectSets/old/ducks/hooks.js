import {
    useReducer,
    useCallback,
    useMemo,
} from 'react';

import merge from './merge';

/**
 * Initial State
 */

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
    // update system set input object
    systemSetInput: {
        systemId: undefined,
        infillSize: undefined,
        selectedOptionValues: [],
        detailTypeConfigurationTypes: [],
        detailTypeConfigurationTypesToUnselect: [],
    },
};

/**
 * Utility functions
 */

const manufacturerChanged = (oldState, intermediateState) => (
    intermediateState.filters.manufacturerId !== oldState.filters.manufacturerId
);

const systemChanged = (oldState, intermediateState) => (
    intermediateState.systemSetInput.systemId !== oldState.systemSetInput.systemId
);

/**
 * Callbacks for reducing state after certain changes
 */

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

/**
 * Using the callbacks to reduce state after each change
 */

const callbacks = [
    removeSystemAfterManufacturerChange,
    removeInfillSizeAfterSystemChange,
];

const reduceState = (state, intermediateState, queryResult) => callbacks.reduce(
    (accumulatedState, cb) => cb(state, accumulatedState, queryResult),
    intermediateState
);

/**
 * REDUX
 */

const createReducer = queryResult => (
    (state, { action, payload } = {}) => (
        reduceState(
            state,
            action(
                state,
                payload,
                queryResult
            ) || state,
            queryResult
        )
    )
);

/**
 * CUSTOM HOOK
 */

export default function useSystemSetReducer(queryResult) {

    const reducer = useMemo(() => createReducer(queryResult), [queryResult]);

    const [state, rawDispatch] = useReducer(reducer, initialState);
    
    // map arguments to dispatch
    const dispatch = useCallback((action, payload) => rawDispatch({ action, payload }), [rawDispatch]);
    
    // merge system input
    const systemSet = useMemo(() => merge(state, queryResult), [state, queryResult]);
    
    // console.log({ state, systemSet });

    // expose state object, dispatch function, and merged system set
    return {
        state,
        dispatch,
        systemSet
    };
}
