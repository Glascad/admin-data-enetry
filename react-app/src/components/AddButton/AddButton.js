import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddButton.scss';
import ButtonTile from '../ButtonTile/ButtonTile';

export default class AddButton extends Component {

    static propTypes = {
        type: PropTypes.oneOf([
            'small',
            'large',
            'input'
        ]),
        text: PropTypes.string,
        inputType: PropTypes.string,
        onAdd: PropTypes.func.isRequired,
        otherButtons: PropTypes.arrayOf(PropTypes.object)
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
                text = "Create",
                type = "",
                inputType = "",
                otherButtons = [],
            },
            handleClick
        } = this;

        return (
            <div
                className={`AddButton ${
                    type
                    } ${
                    inputType ? `input-${inputType}` : ''
                    } ${
                    editing ? 'editing' : ''
                    }`}
            >
                <button
                    className="add-button"
                    onClick={handleClick}
                >
                    <div className="vertical-plus" />
                    <div className="horizontal-plus" />
                </button>
                {otherButtons.length ? (
                    <ButtonTile
                        buttonProps={[
                            {
                                text,
                                onClick: handleClick
                            },
                            ...otherButtons
                        ]}
                    />
                ) : null}
            </div>
        )
    }
}
