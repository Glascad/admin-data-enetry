import { Component } from 'react';

/**
 * PURPOSE
 * 
 * This allows a functional component to have state without being converted to a class Component.
 * 
 * It also relies on the convention of passing props into methods and using an `arguments` key in props.
 * 
 */

export default class StateManager extends Component {

    state = {};

    update = key => ({ arguments: args }) => {
        this.setState({
            [key]: args,
        });
    }

    render = () => {
        const {
            state,
            props,
            props: {
                children,
            },
            update,
        } = this;

        return children({
            ...props,
            state,
            update,
        });
    }
}
