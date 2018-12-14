import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Batcher extends Component {

    state = {
        batchedMutations: {
            mutationKey: {
                mutate: () => { },
                argumentSets: [
                    {
                        variables: {
                            nodeId: ""
                        }
                    }
                ]
            }
        }
    };

    componentDidMount = () => window.addEventListener('keydown', this.save);

    componentWillUnmount = () => window.removeEventListener('keydown', this.save);

    batchMutation = ({ arguments: args, mutate, mutationKey }) => {
        console.log({ args, mutate, mutationKey });
        if (mutationKey.match(/^delete/)) {
            const createKey = mutationKey.replace(/^delete/, 'create');
            const createMutation = this.state.batchedMutations[createKey];
            if (
                createMutation
                &&
                createMutation.argumentSets
            ) {
                const deletedSet = createMutation.argumentSets
                    .find(({ nodeId }) => nodeId === args.nodeId);
                if (deletedSet) {
                    console.log("REMOVING MUTATION");
                    this.setState({
                        batchedMutations: {
                            ...this.state.batchedMutations,
                            [createKey]: {
                                ...this.state.batchedMutations[createKey],
                                argumentSets: this.state.batchedMutations[createKey].argumentSets
                                    .filter(argSet => argSet !== deletedSet)
                            }
                        }
                    });
                    return;
                }
            }
        }
        const updateMutation = this.state.batchedMutations[mutationKey];
        if (
            updateMutation
            &&
            updateMutation.argumentSets
        ) {
            const updatedSet = updateMutation.argumentSets
                .find(({ nodeId }) => nodeId === args.nodeId);
            if (updatedSet) {
                const updatedSetIndex = updateMutation.argumentSets.indexOf(updatedSet);
                console.log("UPDATING MUTATION");
                console.log({
                    batchedMutations: {
                        ...this.state.batchedMutations,
                        [mutationKey]: {
                            ...updateMutation,
                            // See Array.prototype.replace in `public/index.html`
                            argumentSets: updateMutation.argumentSets
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
                            ...updateMutation,
                            // See Array.prototype.replace in `public/index.html`
                            argumentSets: updateMutation.argumentSets
                                .replace(updatedSetIndex, {
                                    ...updatedSet,
                                    ...args,
                                })
                        }
                    }
                });
                return;
            }
        }
        console.log("CREATING MUTATION");
        this.setState({
            batchedMutations: {
                ...this.state.batchedMutations,
                [mutationKey]: {
                    ...this.state[mutationKey],
                    mutate,
                    argumentSets: [args]
                }
            }
        });
    }

    completeMutations = () => {
        const mutationKeys = Object.keys(this.state.batchedMutations);
        mutationKeys.forEach(mutationKey => {
            const mutation = this.state.batchedMutations[mutationKey];
            mutation.argumentSets.forEach(async argSet => {
                try {
                    await mutation.mutate(argSet);
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
        console.log({ key, ctrlKey, metaKey });
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
            batchMutation,
            resetMutations,
            replaceMutation,
            completeMutations,
        } = this;

        console.log({
            batchedMutations,
            batchMutation,
            resetMutations,
            replaceMutation,
            completeMutations,
        });

        return children({
            batchedMutations,
            batchMutation,
            resetMutations,
            replaceMutation,
            completeMutations,
        });
    }
}
