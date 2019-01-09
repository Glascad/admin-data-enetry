import { Component } from 'react';

export default class StateManager extends Component {

    state = {};

    update = key => ({ arguments: args }) => this.setState({
        [key]: args,
    });

    render = () => {
        const {
            state,
            props,
            props: {
                children,
            },
            update,
        } = this;

        console.log(state);

        return children({
            ...props,
            state,
            update,
        });
    }
}
