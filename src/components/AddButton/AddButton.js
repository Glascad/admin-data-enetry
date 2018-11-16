import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddButton.scss';

export default class AddButton extends Component {

    static propTypes = {
        type: PropTypes.oneOf([
            'small',
            'large',
            'input'
        ]),
        inputType: PropTypes.string,
        onAdd: PropTypes.func.isRequired,
    };

    state = {
        editing: false
    };

    handleClick = e => this.props.type === "input" ?
        this.setState({ editing: true })
        :
        this.props.onAdd(this.props);

    render = () => {
        const {
            state: {
                editing,
            },
            props: {
                type = '',
                inputType = '',
                onAdd,
            },
            handleClick
        } = this;

        return (
            <div className={`AddButton ${type} ${inputType ? `input-${inputType}` : ''} ${editing ? 'editing' : ''}`}>
                <button
                    onClick={handleClick}
                >
                    <div className="vertical-plus" />
                    <div className="horizontal-plus" />
                </button>
            </div>
        )
    }
}
