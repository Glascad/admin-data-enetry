import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Batcher extends Component {

    state = {
        batchedMutations: {}
    };

    nodeId = 1;

    getNodeId = () => this.nodeId++;

    componentDidMount = () => window.addEventListener('keydown', this.save);

    componentWillUnmount = () => window.removeEventListener('keydown', this.save);

    batchMutation = ({ arguments: args, mutate, mutationKey }) => {
        const previousMutation = this.state.batchedMutations[mutationKey];
        console.log({ args, mutate, mutationKey });
        console.log(this.state);
        // CHECK FOR DELETING A PREVIOUSLY-CREATED ITEM
        if (mutationKey.match(/^delete/)) {
            const createKey = mutationKey.replace(/^delete/, 'create');
            const createMutation = this.state.batchedMutations[createKey];
            if (createMutation) {
                const deletedSet = createMutation.argumentSets
                    .find(({ nodeId }) => nodeId === args.nodeId);
                if (deletedSet) {
                    console.log("REMOVING CREATE MUTATION");
                    this.setState({
                        batchedMutations: {
                            ...this.state.batchedMutations,
                            [createKey]: {
                                ...createMutation,
                                argumentSets: createMutation.argumentSets
                                    .filter(argSet => argSet !== deletedSet)
                            }
                        }
                    });
                    return;
                }
            }
        }
        // CHECK FOR CREATING A PREVIOUSLY-DELETED ITEM
        if (mutationKey.match(/^create/)) {
            const deleteKey = mutationKey.replace(/^create/, 'delete');
            const deleteMutation = this.state.batchedMutations[deleteKey];
            if (deleteMutation) {
                const createdSet = deleteMutation.argumentSets
                    .find(({ nodeId }) => nodeId === args.nodeId);
                if (createdSet) {
                    console.log("REMOVING DELETE MUTATION")
                    this.setState({
                        batchedMutations: {
                            ...this.state.batchedMutations,
                            [deleteKey]: {
                                ...this.state.batchedMutations[deleteKey],
                                argumentSets: this.state.batchedMutations[deleteKey].argumentSets
                                    .filter(argSet => Object.keys(argSet)
                                        .every(key => (
                                            key === 'nodeId'
                                            ||
                                            createdSet[key] === argSet[key]
                                            ||
                                            typeof argSet[key] === 'object'
                                        )))
                            }
                        }
                    });
                    return;
                }
            }
        }
        // CHECK FOR UPDATING AN UPDATED ITEM
        if (previousMutation) {
            const updatedSet = previousMutation.argumentSets
                .find(({ nodeId }) => nodeId === args.nodeId);
            if (updatedSet) {
                const updatedSetIndex = previousMutation.argumentSets.indexOf(updatedSet);
                console.log("UPDATING MUTATION");
                console.log({
                    batchedMutations: {
                        ...this.state.batchedMutations,
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
                })
                this.setState({
                    batchedMutations: {
                        ...this.state.batchedMutations,
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
                });
                return;
            }
            console.log("ADDING AN ARGSET");
            this.setState({
                batchedMutations: {
                    ...this.state.batchedMutations,
                    [mutationKey]: {
                        ...previousMutation,
                        mutate,
                        argumentSets: previousMutation.argumentSets.concat(args)
                    }
                }
            });
            return;
        }
        // CREATE A MUTATION
        console.log("CREATING MUTATION");
        this.setState({
            batchedMutations: {
                ...this.state.batchedMutations,
                [mutationKey]: {
                    mutate,
                    argumentSets: [args]
                }
            }
        });
    }

    resetMutations = () => this.setState({
        batchedMutations: {}
    });

    completeMutations = () => {
        const mutationKeys = Object.keys(this.state.batchedMutations);
        mutationKeys.forEach(mutationKey => {
            const mutation = this.state.batchedMutations[mutationKey];
            mutation.argumentSets.forEach(async argSet => {
                try {
                    await mutation.mutate({ variables: argSet });
                    this.setState({
                        batchedMutations: {
                            ...this.state.batchedMutations,
                            [mutationKey]: {
                                ...this.state.batchedMutations[mutationKey],
                                argumentSets: this.state.batchedMutations[mutationKey].argumentSets
                                    .filter(set => set !== argSet)
                            }
                        }
                    });
                } catch (err) {
                    console.error(err);
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
