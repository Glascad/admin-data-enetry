import React, { PureComponent, createContext } from 'react';

import { unique } from '../../../../../../../utils';

import { withContext } from '../../../../../../../components';

import { SelectionContext } from './SelectionContext';

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
            }
        }
    }

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
                    _replaceState,
                );
                else performNextAction();
            }
        }

        performAction(refIds);
    }

    deleteContainers = () => this.performBulkAction(
        ACTIONS.DELETE_CONTAINER,
        Object.keys(this.props.context.itemsByRefId),
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

    deleteFrames = () => this.performBulkAction(
        ACTIONS.DELETE_FRAME,
        Object.keys(this.props.context.itemsByRefId),
        (refId, _, getItemByRefId) => ({
            _frame: getItemByRefId(refId),
        }),
        {
            useTimeout: true,
        },
    );

    moveFrames = ({ distance }) => this.performBulkAction(
        ACTIONS.MOVE_FRAME,
        Object.keys(this.props.context.itemsByRefId),
        (refId, _, getItemByRefId) => ({
            _frame: getItemByRefId(refId),
            distance,
        }),
    );

    updateDimension = ({ newDimension }) => {
        const {
            props: {
                context: {
                    dimension: {
                        vertical,
                        dimension,
                        containers,
                    },
                },
            },
        } = this;

        const firstDetailRefIds = unique(...containers
            .map(({ getDetailsByDirection }) => getDetailsByDirection(vertical, true)))
            .map(({ refId }) => `first: ${refId}`);

        const secondDetailRefIds = unique(...containers
            .map(({ getDetailsByDirection }) => getDetailsByDirection(vertical, false)))
            .map(({ refId }) => `second: ${refId}`);

        this.performBulkAction(
            ACTIONS.MOVE_FRAME,
            [
                ...firstDetailRefIds,
                ...secondDetailRefIds,
            ],
            (firstOrSecondRefId, prevRefIds, getItemByRefId) => {
                const frameRefId = firstOrSecondRefId.replace(/^(first|second): /, '');

                const { _frame } = getItemByRefId(frameRefId) || {};

                const first = firstOrSecondRefId.match(/first: /);

                console.log({ _frame });

                if (_frame) {

                    const alreadyMovedThisFrame = prevRefIds
                        .some(detailRefId => _frame.refId.includes(detailRefId.replace(/[^_\d]/g, '')));

                    const log = item => { console.log(item); return item; };

                    if (!alreadyMovedThisFrame) return log({
                        _frame,
                        distance: (dimension - newDimension) / (first ? -2 : 2),
                    });
                }
            },
        );
    }

    render = () => {
        const {
            props: {
                children,
            },
            deleteContainers,
            mergeContainers,
            deleteFrames,
            moveFrames,
            updateDimension,
        } = this;

        console.log(this);

        return (
            <ActionContext.Provider
                value={{
                    deleteContainers,
                    mergeContainers,
                    deleteFrames,
                    moveFrames,
                    updateDimension,
                }}
            >
                {children}
            </ActionContext.Provider>
        );
    }
}

export default withContext(SelectionContext, undefined, { pure: true })(ActionProvider);
