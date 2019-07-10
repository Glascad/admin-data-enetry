import React, { PureComponent, createContext } from 'react';

import { unique } from '../../../../../../../utils';

import { withContext } from '../../../../../../../components';

import { withSelectionContext } from './SelectionContext';

import * as ACTIONS from '../ducks/actions';

import { DIRECTIONS } from '../../utils/recursive-elevation/directions';
import RecursiveContainer from '../../utils/recursive-elevation/container';
import RecursiveFrame from '../../utils/recursive-elevation/frame';

export const ActionContext = createContext();

export const withActionContext = withContext(ActionContext, ({ context }) => ({ ACTIONS: context }), { pure: true });

class ActionProvider extends PureComponent {

    componentDidMount = () => {
        window.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount = () => {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = ({ key }) => {
        const {
            props: {
                selection: {
                    items: {
                        0: {
                            class: SelectedClass,
                        } = {},
                    },
                },
            },
        } = this;

        if (key === 'Delete' || key === 'Backspace') {
            if (SelectedClass === RecursiveContainer) this.deleteContainers();
            else if (SelectedClass === RecursiveFrame) this.deleteFrames();
        }
    }

    // merge deleted containers automatically
    componentDidUpdate = ({ elevation: oldElevation }) => {
        const {
            props: {
                elevation: newElevation,
                elevation: {
                    allContainers
                } = {},
                updateElevation,
            },
        } = this;

        if (oldElevation !== newElevation) {
            // IMPLEMENT ACTION: MERGE DELETED CONTAINERS
            const { containerToMerge, directionToMerge } = allContainers
                .reduce(({ containerToMerge, directionToMerge }, container) => {
                    if (containerToMerge) return { containerToMerge, directionToMerge };
                    else if (container.customRoughOpening) {

                        const direction = [DIRECTIONS.UP, DIRECTIONS.DOWN]
                            .find(direction => (
                                container.canMergeByDirection(...direction, true)
                                &&
                                container.getImmediateContainersByDirection(...direction)[0].customRoughOpening
                            ));

                        if (direction) {
                            return {
                                containerToMerge: container,
                                directionToMerge: direction,
                            };
                        }
                        else return {};
                    }
                    else return {};
                }, {});

            if (containerToMerge) {
                setTimeout(() => {
                    updateElevation(
                        ACTIONS.MERGE_CONTAINERS,
                        {
                            container: containerToMerge,
                            direction: directionToMerge,
                            allowCustomRoughOpenings: true,
                        },
                        undefined,
                        // replace state instead of pushing
                        true
                    );
                });
            }
        }
    }

    // updateElevationAndSelection = (ACTION, payload, cb, shouldReplaceState, ) => {

    // }

    // MOVE ENTIRELY INTO ACTIONS FOLDER
    performBulkAction = (ACTION, refIds, getPayloadFromRefId, { _replaceState, useTimeout } = {}) => {
        // console.log({
        //     ACTION,
        //     refIds,
        //     getPayloadFromRefId,
        //     _replaceState,
        //     useTimeout,
        // });
        const performAction = ([refId, ...nextRefIds], prevRefIds = []) => {
            // console.log({
            //     refId,
            //     nextRefIds,
            //     prevRefIds,
            // });
            if (refId) {
                const {
                    props: {
                        elevation: {
                            getItemByRefId,
                        },
                        updateElevation,
                    },
                } = this;

                const performNextAction = () => performAction(nextRefIds, prevRefIds.concat(refId));

                const payload = getPayloadFromRefId(refId, prevRefIds, getItemByRefId);

                // console.log({ payload });

                if (payload) updateElevation(
                    ACTION,
                    payload,
                    () => {
                        if (ACTION.getSelectedItems) {
                            const reselect = () => {
                                ACTION.getSelectedItems(payload)(this.props.elevation, refId).forEach(item => {
                                    this.props.selection.selectItem(item);
                                });
                            }
                            if (prevRefIds.length) reselect();
                            else this.props.selection.cancelSelection(reselect);
                        }
                        if (useTimeout) setTimeout(performNextAction);
                        else performNextAction();
                    },
                    _replaceState || (
                        !useTimeout && refId !== refIds[0]
                    ),
                );
                else performNextAction();
            }
        }

        performAction(refIds);
    }

    deleteContainers = () => this.performBulkAction(
        ACTIONS.DELETE_CONTAINER,
        Object.keys(this.props.selection.itemsByRefId),
        (refId, _, getItemByRefId) => {
            const item = getItemByRefId(refId);
            console.log(item)

            return item instanceof RecursiveContainer ?

                { container: item }

                :

                { container: item.details[0].firstContainer || item.details[0].secondContainer }


            // { useTimeout: true }

        }
    );

    alterRoughOpening = ({ distance, first }) => this.performBulkAction(
        ACTIONS.ALTER_ROUGH_OPENING,
        Object.keys(this.props.selection.itemsByRefId),
        (refId, _, getItemByRefId) => ({
            container: refId.match(/Container/i) ?
                getItemByRefId(refId)
                :
                getItemByRefId(refId).getContainersByDirection(!first)[0],
            distance,
            first,
        }),
    );

    mergeContainers = ({ container, direction }) => this.props.updateElevation(
        ACTIONS.MERGE_CONTAINERS,
        {
            container,
            direction,
        },
    );

    addFrame = ({ container, distance, vertical }) => this.props.updateElevation(
        ACTIONS.ADD_FRAME,
        {
            distance,
            vertical,
            container,
        },
    );

    deleteFrames = () => this.performBulkAction(
        ACTIONS.DELETE_FRAME,
        Object.keys(this.props.selection.itemsByRefId),
        (refId, _, getItemByRefId) => ({
            _frame: getItemByRefId(refId),
        }),
        {
            useTimeout: true,
        },
    );

    moveFrames = ({ distance }) => this.performBulkAction(
        ACTIONS.MOVE_FRAME,
        Object.keys(this.props.selection.itemsByRefId),
        (refId, _, getItemByRefId) => ({
            _frame: getItemByRefId(refId),
            distance,
        }),
    );

    addIntermediates = ({ vertical, distance }) => this.performBulkAction(
        ACTIONS.ADD_FRAME,
        Object.keys(this.props.selection.itemsByRefId),
        (refId, _, getItemByRefId) => ({
            container: getItemByRefId(refId),
            distance,
            vertical,
        }),
    );

    extendFrames = (first) => this.performBulkAction(
        ACTIONS.ADD_FRAME,
        Object.keys(this.props.selection.itemsByRefId),
        (refId, _, getItemByRefId) => {
            const _frame = getItemByRefId(refId);
            const container = _frame.findExtendedContainer(true, first);
            const containerRef = getItemByRefId(container.refId);
            const distance = _frame.firstOrLastDistanceByExtend(first);
            const vertical = _frame.vertical;

            return {
                container: containerRef,
                distance,
                vertical,
            };
        },
    );

    updateDimension = ({ newDimension: dimensionInput }) => {
        const {
            props: {
                selection: {
                    dimension: {
                        vertical,
                        dimension,
                        containers,
                        elevation: {
                            minimumDaylightOpening,
                        },
                    },
                },
            },
            performBulkAction,
        } = this;

        const moveFirst = dimensionInput < 0;

        const newDimension = Math.abs(dimensionInput)

        if (newDimension >= minimumDaylightOpening) {

            const refIdsToMove = unique(...containers
                .map(({ getDetailsByDirection }) => getDetailsByDirection(vertical, moveFirst)))
                .map(({ refId }) => `${moveFirst ? 'first' : 'second'}: ${refId}`);

            const getPayloadFromRefId = (firstOrSecondRefId, prevRefIds, getItemByRefId) => {
                const frameRefId = firstOrSecondRefId.replace(/^(first|second): /, '');

                const { _frame } = getItemByRefId(frameRefId) || {};

                const first = firstOrSecondRefId.match(/^first: /);

                if (_frame) {

                    const alreadyMovedThisFrame = prevRefIds
                        .some(detailRefId => _frame.refId.includes(detailRefId.replace(/[^_\d]/g, '')));

                    if (!alreadyMovedThisFrame) return {
                        _frame,
                        distance: (dimension - newDimension) / (first ? -1 : 1),
                    };
                }
            }

            performBulkAction(
                ACTIONS.MOVE_FRAME,
                refIdsToMove,
                getPayloadFromRefId,
            );
        }
    }

    addBay = ({ first, distance }) => this.performBulkAction(
        ACTIONS.ADD_BAY,
        Object.keys(this.props.selection.itemsByRefId),
        (refId, _, getItemByRefId) => ({
            container: getItemByRefId(refId),
            distance,
            first,
        }),
    );

    render = () => {
        const {
            props: {
                children,
            },
            deleteContainers,
            alterRoughOpening,
            mergeContainers,
            addFrame,
            deleteFrames,
            moveFrames,
            extendFrames,
            addIntermediates,
            updateDimension,
            addBay
        } = this;

        // console.log(this);

        return (
            <ActionContext.Provider
                value={{
                    deleteContainers,
                    alterRoughOpening,
                    addFrame,
                    mergeContainers,
                    deleteFrames,
                    moveFrames,
                    extendFrames,
                    addIntermediates,
                    updateDimension,
                    addBay,
                }}
            >
                {children}
            </ActionContext.Provider>
        );
    }
}

export default withSelectionContext(ActionProvider);
