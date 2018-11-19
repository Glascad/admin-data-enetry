import React, { Component } from 'react';
import PropTypes from 'prop-types';
import async from '../-higher-order/async';

class AsyncButton extends Component {

    static propTypes = {
        onClick: PropTypes.func,
    };

    onClick = e => {
        this.props.onClick && this.props.onClick(this.props);
        this.props.mutate(this.props);
    }

    render = () => {
        const {
            props: {
                mutate,
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
