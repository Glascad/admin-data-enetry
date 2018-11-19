import React, { Component } from 'react';
import PropTypes from 'prop-types';
import async from '../-higher-order/async';

class AsyncButton extends Component {

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
        return (
            <button
                {...props}
                onClick={onClick}
            />
        );
    }
}

export default async(mutate => ({ mutate }))(AsyncButton);
