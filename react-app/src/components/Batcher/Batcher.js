import { Component } from 'react';
import PropTypes from 'prop-types';

/** NOTES
 * 
 * onDelete requires all of the same props as onCreate, for the sake of managing the state.
 *  -- maybe I should build some kind of flattened data structure like apollo, in order to find an item simply by nodeId
 */

export default class Batcher extends Component {

    state = {
        batchedMutations: {}
    };

    nodeId = 1;

    getNodeId = () => this.nodeId++;

    componentDidMount = () => window.addEventListener('keydown', this.save);

    componentWillUnmount = () => window.removeEventListener('keydown', this.save);

    // functional setstate is necessary when multiple are fired at once
    batchMutation = ({ arguments: args, mutate, mutationKey }) => this.setState(({ batchedMutations }) => {
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
        return await mutationKeys.map(async mutationKey => {
            const mutation = batchedMutations[mutationKey];
            return await mutation.argumentSets.map(async argSet => {
                try {
                    console.log(`RUNNING MUTATION: ${mutationKey}`)
                    console.log(argSet);
                    await mutation.mutate({ variables: argSet });
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
                } catch (err) {
                    console.error(`ERROR WITH MUTATION: ${mutationKey}`)
                    console.error(err);
                    console.error(argSet);
                    console.error(this.state);
                }
            });
        });
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
            batchMutation,
            resetMutations,
            replaceMutation,
            completeMutations,
        } = this;

        console.log(this);

        return children({
            getNodeId,
            batchedMutations,
            batchMutation,
            resetMutations,
            replaceMutation,
            completeMutations,
        });
    }
}
