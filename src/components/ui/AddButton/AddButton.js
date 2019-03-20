import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './AddButton.scss';
import ButtonTile from '../ButtonTile/ButtonTile';

export default class AddButton extends Component {

    // static propTypes = {
    //     type: PropTypes.oneOf([
    //         'small',
    //         'large',
    //         'input'
    //     ]),
    //     text: PropTypes.string,
    //     inputType: PropTypes.string,
    //     onAdd: PropTypes.func.isRequired,
    //     onBlur: PropTypes.func,
    //     otherButtons: PropTypes.arrayOf(PropTypes.object)
    // };

    static defaultProps = {
        text: "Create",
        type: "",
        inputType: "",
        otherButtons: [],
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
                text,
                type,
                inputType,
                otherButtons,
                onBlur,
                onAdd,
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
                    } ${
                    otherButtons.length ?
                        'with-other-buttons'
                        :
                        ''
                    }`}
                onBlur={onBlur}
            >
                <button
                    className="add-button"
                    onClick={handleClick}
                >
                    <div className="vertical-plus text-color" />
                    <div className="horizontal-plus text-color" />
                </button>
                {otherButtons.length ? (
                    <ButtonTile
                        buttonProps={(onAdd ? [{
                            className: "no-class-name",
                            text,
                            onClick: handleClick
                        }] : [])
                            .concat(otherButtons
                                .map(button => ({
                                    className: "no-class-name",
                                    ...button,
                                })))}
                    />
                ) : null}
            </div>
        )
    }
}
