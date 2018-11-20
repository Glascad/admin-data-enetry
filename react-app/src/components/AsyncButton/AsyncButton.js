import React, { Component } from 'react';
import PropTypes from 'prop-types';
import async from '../-higher-order/async';

class Button extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        customMutation: PropTypes.func,
    };

    onClick = e => {
        if (this.props.customMutation)
            this.props.customMutation(this.props);
        else
            this.props.mutate(this.props);
        this.props.onClick && this.props.onClick(this.props);
    }

    render = () => {
        const {
            props: {
                mutate,
                customMutation,
                ...props
            },
            onClick,
        } = this;
        console.log(this);
        return (
            <button
                {...props}
                onClick={onClick}
            />
        );
    }
}

const AsyncButton = async(({ mutate }) => ({ mutate }))(Button);

export default AsyncButton;

export const DualButton = async(({
    firstMutation,
    firstUpdate,
    firstVariables,
    afterUpdate,
    variables,
    mutate,
}) => ({
    mutation: firstMutation,
    update: firstUpdate,
    variables: firstVariables,
    afterUpdate(props) {
        mutate({ variables });
        afterUpdate(props);
    }
}))(AsyncButton);
