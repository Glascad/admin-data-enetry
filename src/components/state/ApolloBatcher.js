import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ApolloWrapper from './ApolloWrapper';

import {
    arraysContainEqualValues,
    mergeArguments,
} from '../../utils';

/**
 * PURPOSE
 * 
 * The Batcher creates a layer of abstraction between updating the state of the UI and actually sending mutations to the database. It provides its children with methods to batch a mutation, to reset all batched mutations, and to complete all batched mutations. When the mutations are completed, a query may be refetched, if it has been registered through the `registerQueryRefetch` prop.
 * console.log("t has been registered through the `registerQueryRefetch` pr");
 * 
 * 
 * USAGE
 * 
 * The ApolloWrapper is built to be used with (or without) a Batcher. It will automatically wrap mutations in the `batchMutation` prop so that children may treat the mutations the same regardless of whether there is or isn't a Batcher.
 * 
 * In order to update the UI after batching a mutation, each mutation object given to the ApolloWrapper must contain a `mapMutationArgumentsToProps` method. -- This ought to be refactored to use Apollo's `optimisticResult` and `update` methods to update the cache.
 * 
 * 
 * NOTES
 * 
 * onDelete requires all of the same props as onCreate, for the sake of managing the state.
 *  -- maybe I should build some kind of flattened data structure like apollo, in order to find an item simply by nodeId
 * 
 */


class Batcher extends Component {

    state = {
        batchedMutations: {}
    };

    nodeId = 1;

    getNodeId = () => this.nodeId++;

    componentDidMount = () => window.addEventListener('keydown', this._saveOnCtrlS);

    componentWillUnmount = () => window.removeEventListener('keydown', this._saveOnCtrlS);

    _saveOnCtrlS = e => {
        const {
            key,
            ctrlKey,
            metaKey,
        } = e;
        if (key === "s" && (ctrlKey || metaKey)) {
            e.preventDefault();
            this.completeMutations();
        }
    }

    registerQueryRefetch = refetch => {
        this.refetchQuery = () => {
            refetch();
        };
    }

    _getAllArgumentSets = ({ batchedMutations } = this.state) => Object.values(batchedMutations)
        .reduce((all, { mutate, mutationKey, argumentSets, transformArgumentsBeforeMutation, refetch }) => all
            .concat(argumentSets
                .map(argumentSet => ({
                    mutate,
                    mutationKey,
                    argumentSet,
                    transformArgumentsBeforeMutation,
                    refetch,
                }))
            ), []);

    completeMutations = async () => {
        await Promise.all(this._getAllArgumentSets()
            .map(async ({
                mutate,
                mutationKey,
                argumentSet,
                transformArgumentsBeforeMutation = a => a,
            }) => {
                try {
                    await mutate({
                        variables: transformArgumentsBeforeMutation(argumentSet)
                    });
                    this.setState(({
                        batchedMutations,
                        batchedMutations: {
                            [mutationKey]: mutation,
                            [mutationKey]: {
                                argumentSets,
                            },
                        },
                    }) => ({
                        batchedMutations: {
                            ...batchedMutations,
                            [mutationKey]: {
                                ...mutation,
                                argumentSets: argumentSets
                                    .filter(set => set !== argumentSet),
                            },
                        },
                    }));
                } catch (err) {
                    console.error(err);
                    console.error(`ERROR WITH MUTATION: ${mutationKey}`)
                    console.error({ err });
                    console.error({ argumentSet });
                    console.error(this.state);
                }
            }));

        try {
            if (this.refetchQuery) {
                this.refetchQuery();
            }
        } catch (err) {
            console.error(err);
        }
    }

    _removeOppositeMutation = ({
        mutation: {
            arguments: args,
            mutationKey
        },
        batchedMutations,
    }) => {
        const [oppositeKey, deleting] = mutationKey.match(/^delete/) ?
            [mutationKey.replace(/^delete/, 'create'), true]
            :
            [mutationKey.replace(/^create/, 'delete'), false];

        if (oppositeKey === mutationKey) return false;

        const { [oppositeKey]: oppositeMutation } = batchedMutations;

        if (!oppositeMutation) return false;

        const { argumentSets } = oppositeMutation;

        const argumentSetToRemove = argumentSets
            .find(deleting ?
                ({ nodeId }) => nodeId === args.nodeId
                :
                set => Object.keys(set)
                    .every(key => key === 'nodeId'
                        ||
                        (
                            typeof set[key] === 'object'
                            &&
                            (
                                !Array.isArray(set[key])
                                ||
                                arraysContainEqualValues(set[key], args[key])
                            )
                        )
                        ||
                        set[key] === args[key]
                    )
            );

        if (!argumentSetToRemove) return false;

        return {
            batchedMutations: {
                ...batchedMutations,
                [oppositeKey]: {
                    ...oppositeMutation,
                    argumentSets: argumentSets
                        .filter(set => set === argumentSetToRemove)
                }
            },
        };
    }

    _updateExistingMutation = ({
        mutation: {
            arguments: args,
            mutationKey,
        },
        batchedMutations,
    }) => {

        const createKey = mutationKey.match(/^update/) ?
            mutationKey.replace(/^update/, 'create')
            :
            mutationKey;

        const {
            [mutationKey]: existingMutation,
            [createKey]: createMutation,
        } = batchedMutations;

        if (!existingMutation && !createMutation) return false;

        const updateMutation = existingMutation || createMutation;

        const { argumentSets } = updateMutation;

        const updateKey = existingMutation ? mutationKey : createKey;

        const argumentSetToUpdate = argumentSets
            .find(({ nodeId }) => nodeId === args.nodeId);

        const updateIndex = argumentSets.indexOf(argumentSetToUpdate);

        if (!argumentSetToUpdate) return false;

        const updatedArguments = mergeArguments({
            previous: argumentSetToUpdate,
            incoming: args,
        });

        return {
            batchedMutations: {
                ...batchedMutations,
                [updateKey]: {
                    ...updateMutation,
                    argumentSets: argumentSets
                        .replace(updateIndex, updatedArguments),
                },
            },
        };
    }

    _addNewMutation = ({
        mutation: {
            mutationKey,
            mutate,
            arguments: args,
            transformArgumentsBeforeMutation,
        },
        batchedMutations,
        refetch,
    }) => ({
        batchedMutations: {
            ...batchedMutations,
            [mutationKey]: {
                mutationKey,
                mutate,
                argumentSets: [args],
                transformArgumentsBeforeMutation,
                refetch,
            },
        },
    });

    // functional setstate is necessary when multiple are fired at once
    batchMutation = (mutation, refetch) => this.setState(({ batchedMutations }) => (
        this._removeOppositeMutation({ mutation, batchedMutations, refetch })
        ||
        this._updateExistingMutation({ mutation, batchedMutations, refetch })
        ||
        this._addNewMutation({ mutation, batchedMutations, refetch })
    ));

    resetMutations = () => this.setState({
        batchedMutations: {}
    });

    render = () => {
        const {
            state: {
                batchedMutations,
            },
            props: {
                children,
            },
            getNodeId,
            registerQueryRefetch,
            batchMutation,
            resetMutations,
            completeMutations,
        } = this;

        return children({
            getNodeId,
            registerQueryRefetch,
            batchedMutations,
            batchMutation,
            resetMutations,
            completeMutations,
        });
    }
}

export default function ApolloBatcher(props) {
    return (
        <Batcher>
            {batcher => (
                <ApolloWrapper
                    {...props}
                    batcher={batcher}
                />
            )}
        </Batcher>
    )
}
