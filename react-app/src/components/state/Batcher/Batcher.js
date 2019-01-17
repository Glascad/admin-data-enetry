import { Component } from 'react';
import PropTypes from 'prop-types';

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

export default class Batcher extends Component {

    state = {
        batchedMutations: {}
    };

    nodeId = 1;

    getNodeId = () => this.nodeId++;

    componentDidMount = () => window.addEventListener('keydown', this.save);

    componentWillUnmount = () => window.removeEventListener('keydown', this.save);

    registerQueryRefetch = refetch => {
        console.log("REGISTERING QUERY REFETCH");
        this.refetchQuery = () => {
            console.log("REFETCHING QUERY");
            refetch();
        };
    }

    // functional setstate is necessary when multiple are fired at once
    batchMutation = ({
        arguments: args,
        mutate,
        mutationKey
    }, refetch) => this.setState(({ batchedMutations }) => {
        console.log("BATCHING A MUTATION");
        console.log({ args, mutate, mutationKey });
        const previousMutation = batchedMutations[mutationKey];
        // REMOVE A PREVIOUS CREATE ARGSET
        if (mutationKey.match(/^delete/)) {
            const createKey = mutationKey.replace(/^delete/, 'create');
            const createMutation = batchedMutations[createKey];
            if (createMutation) {
                const deletedSet = createMutation.argumentSets
                    .find(({ nodeId }) => nodeId === args.nodeId);
                if (deletedSet) {
                    return {
                        batchedMutations: {
                            ...batchedMutations,
                            [createKey]: {
                                ...createMutation,
                                argumentSets: createMutation.argumentSets
                                    .filter(argSet => argSet !== deletedSet)
                            }
                        }
                    };
                }
            }
        }
        // REMOVE A PREVIOUS DELETE ARGSET
        if (mutationKey.match(/^create/)) {
            const deleteKey = mutationKey.replace(/^create/, 'delete');
            const deleteMutation = batchedMutations[deleteKey];
            if (deleteMutation) {
                const createdSet = deleteMutation.argumentSets
                    .find(argSet => Object.keys(args)
                        .every(key => (
                            key === 'nodeId'
                            ||
                            argSet[key] === args[key]
                            ||
                            typeof args[key] === 'object'
                        ))
                    );
                if (createdSet) {
                    return {
                        batchedMutations: {
                            ...batchedMutations,
                            [deleteKey]: {
                                ...batchedMutations[deleteKey],
                                argumentSets: batchedMutations[deleteKey].argumentSets
                                    .filter(argSet => argSet !== createdSet)
                            }
                        }
                    };
                }
            }
        }
        if (previousMutation) {
            const updatedSet = previousMutation.argumentSets
                .find(({ nodeId }) => nodeId === args.nodeId);
            // UPDATE AN EXISTING ARGSET
            if (updatedSet) {
                const updatedSetIndex = previousMutation.argumentSets.indexOf(updatedSet);
                return {
                    batchedMutations: {
                        ...batchedMutations,
                        [mutationKey]: {
                            ...previousMutation,
                            // See Array.prototype.replace in `public/index.html`
                            argumentSets: previousMutation.argumentSets
                                .replace(updatedSetIndex, {
                                    ...updatedSet,
                                    ...args,
                                })
                        }
                    }
                };
            }
            // CREATE A NEW ARGSET IN AN EXISTING/PREVIOUSLY USED MUTATION
            return {
                batchedMutations: {
                    ...batchedMutations,
                    [mutationKey]: {
                        ...previousMutation,
                        mutate,
                        argumentSets: previousMutation.argumentSets.concat(args)
                    }
                }
            };
        }
        // CREATE A MUTATION WITH AN ARGSET
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
                            console.log(`RUNNING MUTATION: ${mutationKey}`)
                            console.log(argSet);
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
                            }), () => console.log(`FILTERED OUT MUTATION: ${mutationKey}`, argSet, this.state));
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
                console.log({ subResult });
                return subResult;
            }));
        if (this.refetchQuery) {
            const refetch = await this.refetchQuery();
            console.log({ refetch });
        }
        console.log({ result })
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

        console.log(this);

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
