import React, { PureComponent } from 'react';

import { StaticContext } from '../../../../../Statics/Statics';

import mergeElevationInput from './ducks/merge-input';

import ActionProvider from './contexts/ActionContext';
import SelectionProvider from './contexts/SelectionContext';
import TransformProvider from './contexts/TransformContext';

import Header from './Header/Header';
import InteractiveElevation from './InteractiveElevation/InteractiveElevation';
import RightSidebar from './RightSidebar/RightSidebar';

import { parseSearch } from '../../../../../../utils';
import { ErrorBoundary, withUndoRedo } from '../../../../../../components';

const defaultElevationInput = {
    containers: [],
    details: [],
};

class BuildElevation extends PureComponent {

    static contextType = StaticContext;

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

    handleKeyDown = ({ key, shiftKey, ctrlKey, metaKey }) => (
        typeof key === 'string'
        &&
        key.match(/z/i)
        &&
        (ctrlKey || metaKey)
    ) && (
            shiftKey ?
                this.props.redo()
                :
                this.props.undo()
        );

    // ACTION MUST RETURN A NEW state OBJECT WITH KEYS elevationInput, rawElevation, mergedElevation and recursiveElevation

    updateElevation = (ACTION, payload, cb, shouldReplaceState) => {
        const {
            props: {
                replaceState,
                pushState,
                queryStatus,
            },
            updateElevation,
        } = this;

        const updateState = shouldReplaceState ?
            replaceState
            :
            pushState;

        // all actions must have access to the raw elevation in the query status on props
        // further actions must be able to execute with a second (and third, etc...) payload
        // further actions may have a different replace state boolean
        // further actions must have access to the resulting recursive elevation of the previous action

        // const dispatch = (newPayload, newCb, newReplaceState) => updateElevation(ACTION, newPayload, newCb, newReplaceState);

        return updateState(state => mergeElevationInput(ACTION(state, payload), queryStatus), cb);
    }

    // updateElevation = (ACTION, payload, cb, shouldReplaceState) => {
    //     const {
    //         replaceState,
    //         pushState,
    //     } = this;

    //     const updateState = shouldReplaceState ? replaceState : pushState;

    //     updateState(state => ACTION(state, payload, updateAfterUpdate), cb);
    // }

    // cancel = () => this.setState(({ states: [initialState] }) => ({
    //     states: [initialState],
    //     currentIndex: 0,
    // }));

    save = async () => {
        const {
            props: {
                location: {
                    search,
                },
                mutations: {
                    updateEntireElevation,
                },
                currentState: {
                    elevationInput,
                    elevationInput: {
                        details,
                        containers,
                    },
                },
                clearHistory,
                cancel,
            },
        } = this;

        const id = +parseSearch(search).elevationId;

        cancel();

        const result = await updateEntireElevation({
            elevation: {
                ...elevationInput,
                id,
                details: details
                    .map(({
                        nodeId,
                        __typename,
                        _detailOptionValues,
                        firstContainerId,
                        secondContainerId,
                        id,
                        ...detail
                    }) => ({
                        ...detail,
                        ...(id > 0 ?
                            { id }
                            :
                            null),
                        [firstContainerId > 0 ?
                            'firstContainerId'
                            :
                            'firstContainerFakeId']: firstContainerId,
                        [secondContainerId > 0 ?
                            'secondContainerId'
                            :
                            'secondContainerFakeId']: secondContainerId,
                    })),
                containers: containers
                    .map(({
                        nodeId,
                        __typename,
                        id,
                        ...container
                    }) => ({
                        ...container,
                        [id > 0 ?
                            'id'
                            :
                            'fakeId']: id,
                    })),
            },
        });

        clearHistory();

        return result;
    }

    render = () => {
        const {
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
                states,
                currentState: {
                    recursiveElevation,
                },
                cancel,
            },
            updateElevation,
            save,
        } = this;

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
                            states={states}
                            elevation={recursiveElevation}
                            updateElevation={updateElevation}
                        />
                        <ErrorBoundary
                            renderError={(error, info) => (
                                <div>
                                    <div>Error: {error}</div>
                                    <div>Info: {info}</div>
                                </div>
                            )}
                        >
                            <InteractiveElevation
                                elevation={recursiveElevation}
                                updateElevation={updateElevation}
                            />
                        </ErrorBoundary>
                    </TransformProvider>
                </ActionProvider>
            </SelectionProvider>
        );
    }
}

const BuildElevationWithUndoRedo = withUndoRedo({ elevationInput: defaultElevationInput }, p => p)(BuildElevation);

export default function ErrorBoundedBuildElevation(props) {
    return (
        <ErrorBoundary
            renderError={(error, info) => (
                <div className="card">
                    <div>Error: {error}</div>
                    <div>Info: {info}</div>
                </div>
            )}
        >
            <BuildElevationWithUndoRedo {...props} />
        </ErrorBoundary>
    )
}
