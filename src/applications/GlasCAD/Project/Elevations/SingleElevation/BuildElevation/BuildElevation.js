import React, { PureComponent } from 'react';

import { StaticContext } from '../../../../../../Statics/Statics';

import RecursiveElevation from '../utils/recursive-elevation/elevation';
import mergeElevationInput from './ducks/merge-input';

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
            clearHistory,
        } = this;

        if (oldQueryStatus !== newQueryStatus) updateElevation(elevation => elevation, null, clearHistory);
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

    pushState = (setStateCallback, ...args) => this.setState(({ states, currentIndex }) => ({
        states: states
            .slice(0, currentIndex + 1)
            .concat(setStateCallback(states[currentIndex])),
        currentIndex: currentIndex + 1,
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

        console.log({ rawElevation });

        console.log({ elevationInput });

        const mergedElevation = mergeElevationInput(rawElevation, elevationInput);

        console.log({ mergedElevation });

        validateElevation(mergedElevation);

        const recursiveElevation = new RecursiveElevation(mergedElevation, _system);

        console.log({ recursiveElevation });

        return {
            elevationInput,
            rawElevation,
            mergedElevation,
            recursiveElevation,
        };
    }

    updateElevation = (ACTION, payload, cb) => this.pushState(state => this.createRecursiveElevation(ACTION(state, payload)), cb);

    cancel = () => this.updateElevation(() => ({ elevationInput: defaultElevationInput }), null, this.clearHistory);

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
            cancel,
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

        const result = await updateEntireElevation({
            elevation: {
                ...elevationInput,
                id: +parseSearch(search).elevationId,
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

        cancel();

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
                queryStatus: {
                    _elevation: {
                        name = ''
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

        return (
            <SelectionProvider
                elevation={recursiveElevation}
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
                    <InteractiveElevation
                        elevation={recursiveElevation}
                        updateElevation={updateElevation}
                    />
                    <RightSidebar
                        elevation={recursiveElevation}
                        updateElevation={updateElevation}
                    />
                </TransformProvider>
            </SelectionProvider>
        );
    }
}
