import React, { PureComponent } from 'react';

import { StaticContext } from '../../../../../Statics/Statics';


import RecursiveElevation from '../utils/recursive-elevation/elevation';
import mergeElevationInput from './ducks/merge-input';

import ActionProvider from './contexts/ActionContext';
import SelectionProvider from './contexts/SelectionContext';
import TransformProvider from './contexts/TransformContext';

import Header from './Header/Header';
import validateElevation from './ducks/validate-elevation';
import InteractiveElevation from './InteractiveElevation/InteractiveElevation';
import RightSidebar from './RightSidebar/RightSidebar';

import { parseSearch } from '../../../../../../utils';

const defaultElevationInput = {
    containers: [],
    details: [],
};

export default class BuildElevation extends PureComponent {

    static contextType = StaticContext;

    state = {
        states: [
            {
                elevationInput: defaultElevationInput,
            },
        ],
        currentIndex: 0,
    };

    componentDidMount = () => {
        this.context.sidebar.toggle(false);
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount = () => {
        this.context.sidebar.toggle(true);
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    componentDidUpdate = ({ queryStatus: oldQueryStatus }) => {
        const {
            props: {
                queryStatus: newQueryStatus,
            },
            updateElevation,
        } = this;

        if (oldQueryStatus !== newQueryStatus) updateElevation(elevation => elevation, null, null, true);
    }

    clearHistory = () => this.setState(({ states, currentIndex }) => ({
        states: [states[currentIndex]],
        currentIndex: 0,
    }));

    undo = () => this.setState(({ currentIndex }) => ({
        currentIndex: currentIndex > 0 ?
            currentIndex - 1
            :
            currentIndex,
    }));

    redo = () => this.setState(({ states: { length }, currentIndex }) => ({
        currentIndex: currentIndex < length - 1 ?
            currentIndex + 1
            :
            currentIndex,
    }));

    _pushState = (setStateCallback, ...args) => this.setState(({ states, currentIndex }) => ({
        states: states
            .slice(0, currentIndex + 1)
            .concat(setStateCallback(states[currentIndex])),
        currentIndex: currentIndex + 1,
    }), ...args);

    _replaceState = (setStateCallback, ...args) => this.setState(({ states, currentIndex }) => ({
        states: states.slice(0, currentIndex)
            .concat(setStateCallback(states[currentIndex])),
    }), ...args);

    handleKeyDown = ({ key, shiftKey, ctrlKey, metaKey }) => (
        typeof key === 'string'
        &&
        key.match(/z/i)
        &&
        (ctrlKey || metaKey)
    ) && (
            shiftKey ?
                this.redo()
                :
                this.undo()
        );

    createRecursiveElevation = ({ elevationInput } = this.state.states[this.state.currentIndex]) => {
        const {
            props: {
                queryStatus: {
                    _elevation: rawElevation,
                    _system,
                } = {},
            },
        } = this;

        const mergedElevation = mergeElevationInput(rawElevation, elevationInput);

        validateElevation(mergedElevation);

        const recursiveElevation = new RecursiveElevation(mergedElevation, _system);

        return {
            elevationInput,
            rawElevation,
            mergedElevation,
            recursiveElevation,
        };
    }

    // ACTION MUST RETURN A NEW state OBJECT WITH KEYS elevationInput, rawElevation, mergedElevation and recursiveElevation

    updateElevation = (ACTION, payload, cb, shouldReplaceState) => {
        const {
            _replaceState,
            _pushState,
            updateElevation,
            createRecursiveElevation,
        } = this;

        const updateState = shouldReplaceState ?
            _replaceState
            :
            _pushState;

        // all actions must have access to the raw elevation in the query status on props
        // further actions must be able to execute with a second (and third, etc...) payload
        // further actions may have a different replace state boolean
        // further actions must have access to the resulting recursive elevation of the previous action

        // const dispatch = (newPayload, newCb, newReplaceState) => updateElevation(ACTION, newPayload, newCb, newReplaceState);

        return updateState(state => createRecursiveElevation(ACTION(state, payload)), cb);
    }

    // updateElevation = (ACTION, payload, cb, shouldReplaceState) => {
    //     const {
    //         _replaceState,
    //         _pushState,
    //     } = this;

    //     const updateState = shouldReplaceState ? _replaceState : _pushState;

    //     updateState(state => ACTION(state, payload, updateAfterUpdate), cb);
    // }

    cancel = () => this.setState(({ states: [initialState] }) => ({
        states: [initialState],
        currentIndex: 0,
    }));

    save = async () => {
        const {
            state: {
                states,
                currentIndex,
            },
            props: {
                location: {
                    search,
                },
                mutations: {
                    updateEntireElevation,
                },
            },
            clearHistory,
        } = this;

        const {
            [currentIndex]: {
                elevationInput,
                elevationInput: {
                    details,
                    containers,
                },
            },
        } = states;

        const id = +parseSearch(search).elevationId

        const result = await updateEntireElevation({
            elevation: {
                ...elevationInput,
                id,
                details: details
                    .map(({
                        _detailOptionValues,
                        nodeId,
                        __typename,
                        ...detail
                    }) => detail),
                containers: containers
                    .map(({
                        nodeId,
                        __typename,
                        ...container
                    }) => container),
            },
        });

        clearHistory();

        return result;
    }

    render = () => {
        const {
            state: {
                states,
                currentIndex,
            },
            props: {
                history,
                location: {
                    search,
                },
                match: {
                    path,
                },
                queryStatus,
                queryStatus: {
                    _elevation: {
                        name = '',
                    } = {},
                },
            },
            updateElevation,
            cancel,
            save,
        } = this;

        const {
            [currentIndex]: {
                recursiveElevation,
            },
        } = states;

        console.log(this);

        return (
            <SelectionProvider
                elevation={recursiveElevation}
            >
                <ActionProvider
                    elevation={recursiveElevation}
                    updateElevation={updateElevation}
                >
                    <TransformProvider
                        elevation={recursiveElevation}
                    >
                        <Header
                            name={name}
                            path={path}
                            search={search}
                            history={history}
                            elevation={recursiveElevation}
                            save={save}
                            cancel={cancel}
                        />
                        <RightSidebar
                            elevation={recursiveElevation}
                            updateElevation={updateElevation}
                        />
                        <InteractiveElevation
                            elevation={recursiveElevation}
                            updateElevation={updateElevation}
                        />
                    </TransformProvider>
                </ActionProvider>
            </SelectionProvider>
        );
    }
}
