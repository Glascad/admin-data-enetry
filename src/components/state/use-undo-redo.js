import React, { useState, useEffect, useCallback } from 'react';

export default function useUndoRedo(firstState, dependencies) {
    const initialState = {
        states: [firstState],
        currentIndex: 0,
    };

    const [wrappedState, setState] = useState(initialState);
    const [{ afterSetState }, setAfterSetState] = useState({ afterSetState() { } });

    // update initial state when dependencies change
    useEffect(() => {
        setState(initialState);
    }, dependencies);

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
        // n: console.log("CANCEL"),
        states: [initialState],
        currentIndex: 0,
    })), [dispatch]);

    const clearHistory = useCallback(() => dispatch(({ states, currentIndex }) => ({
        // n: console.log("CLEARHISTORY"),
        states: [states[currentIndex]],
        currentIndex: 0,
    })), [dispatch]);

    const undo = useCallback(() => setTimeout(() => dispatch(({ currentIndex }) => ({
        // n: console.log("UNDO"),
        currentIndex: currentIndex > 0 ?
            currentIndex - 1
            :
            currentIndex,
    }))), [dispatch]);

    const redo = useCallback(() => dispatch(({ states: { length }, currentIndex }) => ({
        // n: console.log("REDO"),
        currentIndex: currentIndex < length - 1 ?
            currentIndex + 1
            :
            currentIndex,
    })), [dispatch]);

    const pushState = useCallback((setStateCallback, ...args) => dispatch(({ states, currentIndex }) => ({
        // n: console.log("PUSHSTATE"),
        states: states
            .slice(0, currentIndex + 1)
            .concat({
                ...states[currentIndex],
                ...setStateCallback(states[currentIndex]),
            }),
        currentIndex: currentIndex + 1,
    }), ...args), [dispatch]);

    const replaceState = useCallback((setStateCallback, ...args) => dispatch(({ states, currentIndex }) => ({
        // n: console.log("REPLACESTATE"),
        states: states
            // .slice(0, currentIndex)
            .replace(currentIndex, {
                ...states[currentIndex],
                ...setStateCallback(states[currentIndex]),
            }),
    }), ...args), [dispatch]);

    const resetState = useCallback((newFirstState = firstState, ...args) => dispatch(() => ({
        states: [newFirstState],
        currentIndex: 0,
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
        window.addEventListener("keydown", onKeyDown, true);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    // console.log({
    //     currentIndex,
    //     states,
    // });

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
        resetState,
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
