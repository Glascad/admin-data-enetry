import React, { PureComponent } from 'react';

import { StaticContext } from '../../../../../Statics/Statics';

import mergeElevationInput from './ducks/merge-input';

import ActionProvider from './contexts/ActionContext';
import SelectionProvider from './contexts/SelectionContext';
import ElevationTransformProvider from './contexts/ElevationTransformProvider';

import Header from './Header/Header';
import InteractiveElevation from './InteractiveElevation/InteractiveElevation';
import ElevationRightSidebar from './ElevationRightSidebar/ElevationRightSidebar';
import NavigationButtons from "./NavigationButtons/NavigationButtons";

import { parseSearch } from '../../../../../../utils';

import { ErrorBoundary, withRedoableState, Ellipsis } from '../../../../../../components';

import renderPreview from '../../ElevationPreview/render-preview';
import RecursiveElevation from '../utils/recursive-elevation/elevation';

export const defaultElevationInput = {
    containers: [],
    details: [],
};

class BuildElevation extends PureComponent {

    static contextType = StaticContext;

    mounted = false;

    componentDidMount = () => {
        this.context.sidebar.toggle(false);
        this.mounted = true;
        this.componentDidUpdate({});
    }

    componentWillUnmount = () => {
        this.context.sidebar.toggle(true);
        this.mounted = false;
    }

    componentDidUpdate = ({
        queryResult: {
            _elevation: oldElevation,
            bugReports: oldBugReports,
        } = {},
    }) => {
        const {
            props: {
                location: {
                    search,
                },
                queryResult: newQueryStatus,
                queryResult: {
                    _elevation: newElevation,
                    bugReports: newBugReports,
                } = {},
                resetState,
                loadStates,
            },
            updateElevation,
        } = this;

        // console.log("updated");
        if (
            (oldElevation !== newElevation)
            ||
            (
                newBugReports
                &&
                newBugReports.length
                &&
                (oldBugReports !== newBugReports)
            )
        ) {

            const { bugId } = parseSearch(search);

            if (bugId) {

                const { state = "[]" } = newBugReports.find(({ id }) => id === +bugId) || {};

                const parsedState = JSON.parse(state);

                const newStates = parsedState.map(state => ({
                    ...state,
                    recursiveElevation: new RecursiveElevation({ ...state.mergedElevation, bugId }),
                }));

                // console.log({
                //     bugId,
                //     state,
                //     parsedState,
                //     newStates,
                // });

                loadStates(newStates);
            } else {
                // console.log("resetting state");
                // console.log({ oldElevation, newElevation });
                const newState = mergeElevationInput({ elevationInput: defaultElevationInput }, newQueryStatus);
                // console.log({ newState });
                resetState(newState);
                // functional setstate may not yet be fully supported by usestate hook
                setTimeout(() => resetState(newState));
            }
        }
    }

    // ACTION MUST RETURN A NEW state OBJECT WITH KEYS elevationInput, rawElevation, mergedElevation and recursiveElevation

    updateElevation = (ACTION, payload, cb, shouldReplaceState) => {
        const {
            props: {
                replaceState,
                pushState,
                queryResult,
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

        return updateState(state => mergeElevationInput(ACTION(state, payload), queryResult), cb);
    }

    // updateElevation = (ACTION, payload, cb, shouldReplaceState) => {
    //     const {
    //         replaceState,
    //         pushState,
    //     } = this;

    //     const updateState = shouldReplaceState ? replaceState : pushState;

    //     updateState(state => ACTION(state, payload, updateAfterUpdate), cb);
    // }

    save = async () => {
        const {
            props: {
                location: {
                    search,
                },
                updateEntireElevation,
                currentState: {
                    elevationInput,
                    elevationInput: {
                        details,
                        containers,
                    },
                    recursiveElevation,
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
                        daylightOpening: {
                            __typename: dlo_typename,
                            ...daylightOpening
                        },
                        ...container
                    }) => ({
                            ...container,
                        daylightOpening,
                        [id > 0 ?
                            'id'
                            :
                            'fakeId']: id,
                    })),
                preview: renderPreview(recursiveElevation),
            },
        });

        if (this.mounted) {
            clearHistory();
        }

        return result;
    }

    render = () => {
        const {
            props: {
                history,
                location,
                location: {
                    search,
                },
                match: {
                    path,
                },
                project,
                refetch,
                queryResult,
                queryResult: {
                    _elevation: {
                        id,
                        name = '',
                    } = {},
                },
                states,
                currentIndex,
                currentState,
                currentState: {
                    elevationInput,
                    mergedElevation,
                    recursiveElevation,
                },
                cancel,
                updating,
            },
            updateElevation,
            save,
        } = this;

        // console.log({
        //     currentState,
        //     states,
        // });

        // console.log(this);

        return (
            <SelectionProvider
                elevation={recursiveElevation}
            >
                <ActionProvider
                    elevation={recursiveElevation}
                    updateElevation={updateElevation}
                >
                    <ElevationTransformProvider
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
                            updating={updating}
                            elevationInput={elevationInput}
                        />
                        <ElevationRightSidebar
                            currentIndex={currentIndex}
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
                                updating={updating}
                                refetch={refetch}
                            />
                        </ErrorBoundary>
                        <NavigationButtons
                            project={project}
                            elevationInput={elevationInput}
                        />
                    </ElevationTransformProvider>
                </ActionProvider>
            </SelectionProvider>
        );
    }
}

const BuildElevationWithUndoRedo = withRedoableState({ elevationInput: defaultElevationInput }, p => p)(BuildElevation);

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
    );
}
