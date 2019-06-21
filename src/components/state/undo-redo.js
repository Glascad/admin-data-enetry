import React, { useState, useEffect } from 'react';

export default function useUndoRedo(firstState) {
    const initialState = {
        states: [firstState],
        currentIndex: 0,
    };

    const [wrappedState, setState] = useState(initialState);
    const [{ afterSetState }, setAfterSetState] = useState({ afterSetState() { } });

    // to simulate behavior of setState(newState, --> callback <--)
    // which is not available in the hook
    useEffect(() => {
        if (afterSetState) afterSetState();
    }, [afterSetState || null]);

    const dispatch = (setStateCallback, afterSetState) => {
        setState(state => ({
            n: console.log(state),
            ...state,
            ...setStateCallback(state),
        }));
        setAfterSetState({ afterSetState });
    }

    const {
        currentIndex,
        states,
    } = wrappedState;

    const {
        [currentIndex]: currentState,
    } = states;

    console.log({
        wrappedState,
        currentIndex,
        states,
        currentState,
    });

    const cancel = () => dispatch(({ states: [initialState] }) => ({
        states: [initialState],
        currentIndex: 0,
    }));

    const clearHistory = () => dispatch(({ states, currentIndex }) => ({
        states: [states[currentIndex]],
        currentIndex: 0,
    }));

    const undo = () => dispatch(({ currentIndex }) => ({
        currentIndex: currentIndex > 0 ?
            currentIndex - 1
            :
            currentIndex,
    }));

    const redo = () => dispatch(({ states: { length }, currentIndex }) => ({
        currentIndex: currentIndex < length - 1 ?
            currentIndex + 1
            :
            currentIndex,
    }));

    const pushState = (setStateCallback, ...args) => dispatch(({ states, currentIndex }) => ({
        states: states
            .slice(0, currentIndex + 1)
            .concat(setStateCallback(states[currentIndex])),
        currentIndex: currentIndex + 1,
    }), ...args);

    const replaceState = (setStateCallback, ...args) => dispatch(({ states, currentIndex }) => ({
        states: states.slice(0, currentIndex)
            .concat(setStateCallback(states[currentIndex])),
    }), ...args);

    return {
        currentState,
        currentIndex,
        clearHistory,
        cancel,
        states,
        cancel,
        undo,
        redo,
        pushState,
        replaceState,
    };
}

export const withUndoRedo = (firstState, mapProps = p => ({ undoRedo: p })) => WrappedComponent => props => {
    const undoRedo = useUndoRedo(firstState);
    return (
        <WrappedComponent
            {...props}
            {...mapProps(undoRedo)}
        />
    );
}
