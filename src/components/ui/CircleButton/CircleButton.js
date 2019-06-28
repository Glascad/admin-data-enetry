import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import './CircleButton.scss';
import ButtonTile from '../ButtonTile/ButtonTile';

export default class CircleButton extends PureComponent {

    // static propTypes = {
    //     type: PropTypes.oneOf([
    //         'small',
    //         "tile",
    //         'input'
    //     ]),
    //     text: PropTypes.string,
    //     inputType: PropTypes.string,
    //     onClick: PropTypes.func.isRequired,
    //     onBlur: PropTypes.func,
    //     otherButtons: PropTypes.arrayOf(PropTypes.object)
    // };

    static defaultProps = {
        text: "Create",
        type: "",
        actionType: "",
        inputType: "",
        otherButtons: [],
    };

    state = {
        editing: false
    };

    handleClick = e => this.props.type === "input" ?
        this.setState({ editing: true })
        :
        this.props.onClick(this.props);

    render = () => {
        const {
            state: {
                editing,
            },
            props: {
                text,
                type,
                actionType,
                inputType,
                otherButtons,
                onBlur,
                onClick,
                className,
                renderTextInsteadOfButton,
            },
            handleClick
        } = this;

        return (
            <div
                className={`CircleButton ${
                    className
                    } ${
                    type ? `type-${type}` : ''
                    } ${
                    actionType ? `action-type-${actionType}` : ''
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
                {renderTextInsteadOfButton ? (
                    <div className="button-text">
                        <div className="text">
                            {renderTextInsteadOfButton}
                        </div>
                    </div>
                ) : (
                        <>
                            <button
                                className="circle-button"
                                onClick={handleClick}
                            >
                                <div className="block-one" />
                                <div className="block-two" />
                            </button>
                            {otherButtons.length ? (
                                <ButtonTile
                                    buttonProps={(onClick ? [{
                                        className: "no-class-name",
                                        text,
                                        onClick: handleClick,
                                    }] : [])
                                        .concat(otherButtons
                                            .map(button => ({
                                                className: "no-class-name",
                                                ...button,
                                            })))}
                                />
                            ) : null}
                        </>
                    )}
            </div>
        )
    }
}
