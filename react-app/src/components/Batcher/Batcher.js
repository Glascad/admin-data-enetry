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
        console.log("BATCHING A MUTATION");
        const previousMutation = this.state.batchedMutations[mutationKey];
        console.log({ args, mutate, mutationKey, previousMutation });
        console.log(this.state);
        // CHECK FOR DELETING A PREVIOUSLY-CREATED ITEM
        if (mutationKey.match(/^delete/)) {
            const createKey = mutationKey.replace(/^delete/, 'create');
            const createMutation = this.state.batchedMutations[createKey];
            console.log({ createKey, createMutation });
            if (createMutation) {
                const deletedSet = createMutation.argumentSets
                    .find(({ nodeId }) => nodeId === args.nodeId);
                console.log({ deletedSet });
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
            console.log({ deleteKey, deleteMutation });
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
                console.log({ createdSet });
                if (createdSet) {
                    console.log("REMOVING DELETE MUTATION")
                    this.setState({
                        batchedMutations: {
                            ...this.state.batchedMutations,
                            [deleteKey]: {
                                ...this.state.batchedMutations[deleteKey],
                                argumentSets: this.state.batchedMutations[deleteKey].argumentSets
                                    .filter(argSet => argSet !== createdSet)
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
            console.log({ updatedSet });
            if (updatedSet) {
                const updatedSetIndex = previousMutation.argumentSets.indexOf(updatedSet);
                console.log("UPDATING MUTATION");
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
        const batchedMutations = this.state.batchedMutations;
        const mutationKeys = Object.keys(batchedMutations);
        mutationKeys.forEach(mutationKey => {
            const mutation = batchedMutations[mutationKey];
            mutation.argumentSets.forEach(async argSet => {
                try {
                    await mutation.mutate({ variables: argSet });
                    this.setState({
                        batchedMutations: {
                            ...batchedMutations,
                            [mutationKey]: {
                                ...mutation,
                                argumentSets: mutation.argumentSets
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

        // console.log(this);

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
