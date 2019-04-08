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
        elevationInput: defaultElevationInput,
    };

    // undo states [oldest, ...latest]
    previousStates = [];

    // redo states [latest, ...oldest]
    futureStates = [];

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
        } = this;

        if (oldQueryStatus !== newQueryStatus) this.updateElevation(
            // recreate recursive elevation with new props
            state => state,
            // no payload necessary
            null,
            // remove all previous / future states
            () => {
                this.previousStates.forEach(() => this.previousStates.pop());
                this.futureStates.forEach(() => this.futureStates.pop());
            },
        );
    }

    // track all interactions
    pushState = (setStateCallback, cb) => this.setState(state => {
        this.previousStates.push(state);
        this.futureStates.forEach(() => this.futureStates.pop());
        return setStateCallback(state);
    }, cb);

    // handle undo
    popState = () => this.setState(state => {
        if (!this.previousStates.length) return state;
        else {
            this.futureStates.push(state);
            return this.previousStates.pop();
        }
    });

    // handle redo
    shiftState = () => this.setState(state => {
        if (!this.futureStates.length) return state;
        else {
            this.previousStates.push(state);
            return this.futureStates.pop();
        }
    });

    undo = this.popState;
    redo = this.shiftState;

    handleKeyDown = ({ key, shiftKey, ctrlKey, metaKey }) => {
        console.log({
            key,
            shiftKey,
            ctrlKey,
            metaKey,
            previousStates: this.previousStates,
            futureStates: this.futureStates,
        });
        if (typeof key === 'string' && key.match(/z/i)) {
            if (ctrlKey || metaKey) {
                if (shiftKey) {
                    console.log("redo");
                    this.redo();
                } else {
                    console.log("undo");
                    this.undo();
                }
            }
        }
    }

    createRecursiveElevation = ({ elevationInput } = this.state) => {
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

    cancel = () => this.updateElevation(() => ({ elevationInput: defaultElevationInput }));

    save = async () => {
        const elevationInput = {
            elevation: {
                ...this.state.elevationInput,
                id: +parseSearch(this.props.location.search).elevationId,
                details: this.state.elevationInput.details
                    .map(({
                        _detailOptionValues,
                        nodeId,
                        __typename,
                        ...detail
                    }) => detail),
                containers: this.state.elevationInput.containers
                    .map(({
                        nodeId,
                        __typename,
                        ...container
                    }) => container),
            },
        };

        const result = await this.props.mutations.updateEntireElevation(elevationInput);

        this.cancel();

        return result;
    }

    render = () => {
        const {
            state: {
                recursiveElevation,
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

        console.log(this);

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
