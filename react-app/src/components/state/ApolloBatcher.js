import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApolloWrapper from './ApolloWrapper';

/**
 * PURPOSE
 * 
 * The Batcher creates a layer of abstraction between updating the state of the UI and actually sending mutations to the database. It provides its children with methods to batch a mutation, to reset all batched mutations, and to complete all batched mutations. When the mutations are completed, a query may be refetched, if it has been registered through the `registerQueryRefetch` prop.
 * 
 * 
 * USAGE
 * 
 * The ApolloWrapper is built to be used with (or without) a Batcher. It will automatically wrap mutations in the `batchMutation` prop so that children may treat the mutations the same regardless of whether there is or isn't a Batcher.
 * 
 * In order to update the UI after batching a mutation, each mutation object given to the ApolloWrapper must contain a `mapResultToProps` method. -- This ought to be refactored to use Apollo's `optimisticResult` and `update` methods to update the cache.
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

    componentDidMount = () => window.addEventListener('keydown', this.save);

    componentWillUnmount = () => window.removeEventListener('keydown', this.save);

    registerQueryRefetch = refetch => {
        // console.log("REGISTERING QUERY REFETCH");
        this.refetchQuery = () => {
            // console.log("REFETCHING QUERY");
            refetch();
        };
    }

    // removeDeleteMutation({})

    // functional setstate is necessary when multiple are fired at once
    batchMutation = ({
        arguments: args,
        mutate,
        mutationKey
    }, refetch) => {
        this.setState(({ batchedMutations }) => {
            console.log("BATCHING A MUTATION");
            console.log({ args, mutate, mutationKey });

            const currentMutation = batchedMutations[mutationKey];

            const createKey = mutationKey.replace(/^(delete|update)/, 'create');
            const deleteKey = mutationKey.replace(/^create/, 'delete');

            const createMutation = batchedMutations[createKey];
            const deleteMutation = batchedMutations[deleteKey];

            // REMOVE A PREVIOUS CREATE ARGSET
            if (mutationKey.match(/^delete/)) {
                if (createMutation) {
                    const { argumentSets } = createMutation;
                    const deletedSet = argumentSets
                        .find(({ nodeId }) => nodeId === args.nodeId);
                    if (deletedSet) {
                        console.log(`removing create argset: ${createKey}`)
                        return {
                            batchedMutations: {
                                ...batchedMutations,
                                [createKey]: {
                                    ...createMutation,
                                    argumentSets: argumentSets
                                        .filter(argSet => argSet !== deletedSet)
                                }
                            }
                        };
                    }
                }
            }
            // REMOVE A PREVIOUS DELETE ARGSET
            if (mutationKey.match(/^create/)) {
                if (deleteMutation) {
                    const { argumentSets } = deleteMutation;
                    const createdSet = argumentSets
                        .find(argSet => Object.keys(args)
                            .every(key => (
                                key === 'nodeId'
                                ||
                                typeof args[key] === 'object'
                                ||
                                argSet[key] === args[key]
                            ))
                        );
                    if (createdSet) {
                        console.log(`removing delete argset ${deleteKey}`);
                        return {
                            batchedMutations: {
                                ...batchedMutations,
                                [deleteKey]: {
                                    ...deleteMutation,
                                    argumentSets: argumentSets
                                        .filter(argSet => argSet !== createdSet)
                                }
                            }
                        };
                    }
                }
            }
            if (mutationKey.match(/^update/)) {
                if (currentMutation) {
                    const { argumentSets } = currentMutation;
                    const updatedSet = argumentSets
                        .find(({ nodeId }) => nodeId === args.nodeId);
                    // UPDATE AN EXISTING ARGSET
                    if (updatedSet) {
                        const updatedSetIndex = argumentSets.indexOf(updatedSet);
                        console.log(`updating update argset ${mutationKey}`);
                        return {
                            batchedMutations: {
                                ...batchedMutations,
                                [mutationKey]: {
                                    ...currentMutation,
                                    // See Array.prototype.replace in `public/index.html`
                                    argumentSets: argumentSets
                                        .replace(updatedSetIndex, {
                                            ...updatedSet,
                                            ...args,
                                        })
                                }
                            }
                        };
                    }
                    // CREATE A NEW ARGSET IN AN EXISTING/PREVIOUSLY USED MUTATION
                    console.log(`creating update argset ${mutationKey}`);
                    return {
                        batchedMutations: {
                            ...batchedMutations,
                            [mutationKey]: {
                                ...currentMutation,
                                mutate,
                                argumentSets: currentMutation.argumentSets.concat(args)
                            }
                        }
                    };
                }
                // UPDATE A CREATE ARGSET
                if (createMutation) {
                    const { argumentSets } = createMutation;
                    const createdSet = argumentSets
                        .find(argSet => Object.keys(args)
                            .every(key => (
                                key === 'nodeId'
                                ||
                                typeof args[key] === 'object'
                                ||
                                argSet[key] === args[key]
                            ))
                        );
                    if (createdSet) {
                        const createdSetIndex = argumentSets.indexOf(createdSet);
                        console.log(`updating create argset ${createKey}`);
                        return {
                            batchedMutations: {
                                ...batchedMutations,
                                [mutationKey]: {
                                    ...currentMutation,
                                    // See Array.prototype.replace in `public/index.html`
                                    argumentSets: argumentSets
                                        .replace(createdSetIndex, {
                                            ...createdSet,
                                            ...args,
                                        })
                                }
                            }
                        };
                    }
                }
            }
            // CREATE A MUTATION WITH AN ARGSET
            console.log(`creating new mutation key ${mutationKey}`);
            return {
                batchedMutations: {
                    ...batchedMutations,
                    [mutationKey]: {
                        mutate,
                        refetch,
                        argumentSets: [args]
                    }
                }
            };
        });
    }

    resetMutations = () => this.setState({
        batchedMutations: {}
    });

    completeMutations = async () => {
        const batchedMutations = this.state.batchedMutations;
        const mutationKeys = Object.keys(batchedMutations);
        const result = await Promise.all(mutationKeys
            .map(async mutationKey => {
                const mutation = batchedMutations[mutationKey];
                const subResult = await Promise.all(mutation.argumentSets
                    .map(async argSet => {
                        try {
                            // console.log(`RUNNING MUTATION: ${mutationKey}`)
                            // console.log(argSet);
                            const subSubResult = await mutation.mutate({ variables: argSet });
                            // functional setstate is necessary when multiple are fired at once
                            this.setState(({ batchedMutations }) => ({
                                batchedMutations: {
                                    ...batchedMutations,
                                    [mutationKey]: {
                                        // must reference `batchedMutations[mutationKey]` inside functional setstate instead of enclosed `mutation` var.
                                        ...batchedMutations[mutationKey],
                                        argumentSets: batchedMutations[mutationKey].argumentSets
                                            .filter(set => set !== argSet)
                                    }
                                }
                            }),
                                // () => console.log(`FILTERED OUT MUTATION: ${mutationKey}`, argSet, this.state)
                            );
                            console.log({ subSubResult })
                            return subSubResult;
                        } catch (err) {
                            console.error(`ERROR WITH MUTATION: ${mutationKey}`)
                            console.error({ err });
                            console.error({ argSet });
                            console.error(this.state);
                            return err;
                        }
                    }));
                // console.log({ subResult });
                return subResult;
            }));
        if (this.refetchQuery) {
            const refetch = await this.refetchQuery();
            // console.log({ refetch });
        }
        // console.log({ result })
        return result;
    }

    save = e => {
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

        // console.log(this);

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
