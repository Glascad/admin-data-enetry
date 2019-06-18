import React, { PureComponent, createContext } from 'react';

import { unique } from '../../../../../../../utils';

import { withContext } from '../../../../../../../components';

import { withSelectionContext } from './SelectionContext';

import * as ACTIONS from '../ducks/actions';

import { DIRECTIONS } from '../../utils/recursive-elevation/directions';

export const ActionContext = createContext();

export const withActionContext = withContext(ActionContext, ({ context }) => ({ ACTIONS: context }), { pure: true });

class ActionProvider extends PureComponent {

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

                        const direction = Object.values(DIRECTIONS)
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
                }, 0);
            }
        }
    }

    // MOVE ENTIRELY INTO ACTIONS FOLDER
    performBulkAction = (ACTION, refIds, getPayloadFromRefId, { _replaceState, useTimeout } = {}) => {
        const {
            props: {
                updateElevation,
            },
        } = this;

        const performAction = ([refId, ...nextRefIds], prevRefIds = []) => {
            if (refId) {
                const {
                    props: {
                        elevation: {
                            getItemByRefId,
                        },
                    },
                } = this;

                const performNextAction = () => performAction(nextRefIds, prevRefIds.concat(refId));

                const payload = getPayloadFromRefId(refId, prevRefIds, getItemByRefId);

                if (payload) updateElevation(
                    ACTION,
                    payload,
                    useTimeout ?
                        () => setTimeout(performNextAction)
                        :
                        performNextAction,
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
        (refId, _, getItemByRefId) => ({
            container: getItemByRefId(refId),
        }),
        {
            useTimeout: true,
        },
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

            return ({
                container: containerRef,
                distance,
                vertical,
            })
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

            const firstDetailRefIds = unique(...containers
                .map(({ getDetailsByDirection }) => getDetailsByDirection(vertical, true)))
                .map(({ refId }) => `first: ${refId}`);

            const secondDetailRefIds = unique(...containers
                .map(({ getDetailsByDirection }) => getDetailsByDirection(vertical, false)))
                .map(({ refId }) => `second: ${refId}`);

            const refIdsToMove = moveFirst ? firstDetailRefIds : secondDetailRefIds;

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

    render = () => {
        const {
            props: {
                children,
            },
            deleteContainers,
            mergeContainers,
            addFrame,
            deleteFrames,
            moveFrames,
            extendFrames,
            addIntermediates,
            updateDimension,
        } = this;

        console.log(this);

        return (
            <ActionContext.Provider
                value={{
                    deleteContainers,
                    addFrame,
                    mergeContainers,
                    deleteFrames,
                    moveFrames,
                    extendFrames,
                    addIntermediates,
                    updateDimension,
                }}
            >
                {children}
            </ActionContext.Provider>
        );
    }
}

export default withSelectionContext(ActionProvider);
