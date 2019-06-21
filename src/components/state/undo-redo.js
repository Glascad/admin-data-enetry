import React, { useState, useEffect, useCallback } from 'react';

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

    const dispatch = useCallback((setStateCallback, afterSetState) => {
        setState(state => ({
            ...state,
            ...setStateCallback(state),
        }));
        setAfterSetState({ afterSetState });
    }, [setState, setAfterSetState]);

    const {
        currentIndex,
        states,
    } = wrappedState;

    const {
        [currentIndex]: currentState,
    } = states;

    const cancel = useCallback(() => dispatch(({ states: [initialState] }) => ({
        states: [initialState],
        currentIndex: 0,
    })), [dispatch]);

    const clearHistory = useCallback(() => dispatch(({ states, currentIndex }) => ({
        states: [states[currentIndex]],
        currentIndex: 0,
    })), [dispatch]);

    const undo = useCallback(() => dispatch(({ currentIndex }) => ({
        currentIndex: currentIndex > 0 ?
            currentIndex - 1
            :
            currentIndex,
    })), [dispatch]);

    const redo = useCallback(() => dispatch(({ states: { length }, currentIndex }) => ({
        currentIndex: currentIndex < length - 1 ?
            currentIndex + 1
            :
            currentIndex,
    })), [dispatch]);

    const pushState = useCallback((setStateCallback, ...args) => dispatch(({ states, currentIndex }) => ({
        states: states
            .slice(0, currentIndex + 1)
            .concat({
                ...states[currentIndex],
                ...setStateCallback(states[currentIndex]),
            }),
        currentIndex: currentIndex + 1,
    }), ...args), [dispatch]);

    const replaceState = useCallback((setStateCallback, ...args) => dispatch(({ states, currentIndex }) => ({
        states: states.slice(0, currentIndex)
            .concat({
                ...states[currentIndex],
                ...setStateCallback(states[currentIndex]),
            }),
    }), ...args), [dispatch]);

    const onKeyDown = useCallback(e => {
        const { key = '', ctrlKey, metaKey, shiftKey } = e;
        if ((ctrlKey || metaKey) && key.match(/^z$/i)) {
            e.preventDefault();
            if (shiftKey) redo();
            else undo();
        }
    }, [undo, redo]);

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onkeydown);
    }, [onkeydown]);

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
