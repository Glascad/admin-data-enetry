import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Batcher extends Component {

    mutations = [];

    batchMutation = mutation => this.mutations.push(mutation);

    resetMutations = () => this.mutations = [];

    // Array.prototype.replace is in `public/index.html`
    replaceMutation = (index, newMutation) => this.mutations.replace(index, newMutation);

    completeMutations = () => {
        this.mutations.forEach(mutation => mutation());
        this.resetMutations();
    }

    render = () => {
        const {
            props: {
                children,
            },
            batchMutation,
            resetMutations,
            replaceMutation,
            completeMutations,
        } = this;

        return children({
            batchMutation,
            resetMutations,
            replaceMutation,
            completeMutations,
        });
    }
}
