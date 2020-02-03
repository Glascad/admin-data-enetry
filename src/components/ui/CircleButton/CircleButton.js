import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './CircleButton.scss';
import ButtonTile from '../ButtonTile/ButtonTile';
import customPropTypes from '../../utils/custom-prop-types';

export default class CircleButton extends PureComponent {

    static propTypes = {
        text: PropTypes.string,
        className: PropTypes.string,
        type: PropTypes.oneOf([
            'small',
            'tile',
            // 'input',
        ]),
        actionType: PropTypes.oneOf([
            'add',
            'delete',
            'arrow',
        ]),
        otherButtons: PropTypes.shape(ButtonTile.propTypes),
        onBlur: PropTypes.func,
        onClick: PropTypes.func.isRequired,
        renderTextInsteadOfButton: customPropTypes.renderable,
    };

    static defaultProps = {
        text: "Create",
        type: "small",
        actionType: "",
        otherButtons: [],
    };

    handleClick = () => this.props.onClick(this.props);

    render = () => {
        const {
            props: {
                text,
                type,
                actionType,
                otherButtons,
                onBlur,
                onClick,
                className,
                renderTextInsteadOfButton,
                "data-cy": dataCy,
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
                    otherButtons.length ?
                        'with-other-buttons'
                        :
                        ''
                    }`}
                onBlur={onBlur}
            >
                {renderTextInsteadOfButton ? (
                    <div
                        className="button-text"
                        data-cy={dataCy}
                    >
                        <div className="text">
                            {renderTextInsteadOfButton}
                        </div>
                    </div>
                ) : (
                        <>
                            <button
                                className="circle-button"
                                onClick={handleClick}
                                data-cy={dataCy}
                            >
                                <div className="block-one" />
                                <div className="block-two" />
                                <div className="block-three" />
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
                                            }))
                                        )}
                                />
                            ) : null}
                        </>
                    )}
            </div>
        );
    }
}
