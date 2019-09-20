import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import './Pill.scss';
import DeleteButton from '../DeleteButton/DeleteButton';
import ButtonTile from '../ButtonTile/ButtonTile';
import { normalCase } from '../../../utils';
import customPropTypes from '../../utils/custom-prop-types';
import Input from '../Input/Input';

export default class Pill extends PureComponent {

    static propTypes = {
        // text
        title: customPropTypes.renderable,
        subtitle: customPropTypes.renderable,
        children: customPropTypes.renderable,
        footer: customPropTypes.renderable,
        // passed props
        hoverButtons: ButtonTile.propTypes.buttonProps,
        inputValue: Input.propTypes.value,
        // styles
        type: PropTypes.oneOf([
            'pill',
            'tile',
        ]),
        inputType: PropTypes.oneOf([
            // 'select',
            'text',
            'number',
        ]),
        align: PropTypes.oneOf([
            'left',
            'center',
            'right',
        ]),
        className: PropTypes.string,
        style: PropTypes.object,
        tagname: PropTypes.string,
        // booleans
        selected: PropTypes.bool,
        danger: PropTypes.bool,
        disabled: PropTypes.bool,
        editing: PropTypes.bool,
        // event handlers
        onDelete: PropTypes.func,
        onEdit: PropTypes.func,
        onDrag: PropTypes.func,
        onSelect: PropTypes.func,
        onEdit: PropTypes.func,
        onBlur: PropTypes.func,
    };

    static defaultProps = {
        editing: false,
        inputType: "text",
        className: '',
        hoverButtons: [],
        title: "",
    };

    state = {
        editing: this.props.editing,
        input: this.props.inputValue || this.props.title,
    };

    ref = createRef();
    inputRef = createRef();

    componentDidMount = () => {
        window.addEventListener('keydown', this.blurOnEsc);
        this.componentDidUpdate({});
        setTimeout(() => {
            if (this.ref && this.ref.current) this.ref.current.style.opacity = 1;
        });
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.blurOnEsc);
    }

    componentDidUpdate = ({ editing: oldEditing }) => {
        const {
            props: {
                editing: newEditing,
            },
            inputRef,
        } = this;

        if (newEditing !== oldEditing) {
            this.setState({
                editing: newEditing,
                input: this.props.inputValue || this.props.title,
            });
        }

        if (
            inputRef
            &&
            inputRef.current
            &&
            inputRef.current.style
        ) {
            inputRef.current.style.width = 0;
            inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
        }
    }

    blurOnEsc = ({ key, target }) => {
        if (key === 'Escape')
            target.blur();
    }

    handleEditClick = e => {
        e.stopPropagation();
        if (
            this.props.onEdit
            &&
            (this.props.selected || !this.props.onSelect)
        ) {
            this.beginEdit(e);
        } else {
            this.handleClick(e);
        }
    }

    beginEdit = e => {
        e.stopPropagation();
        this.setState({
            editing: true,
        });
    }

    handleInput = ({ target: { value } }) => {
        this.setState({
            input: value,
        });
    }

    saveEditOnEnter = ({ key, target }) => {
        if (key === "Enter") {
            this.setState({
                editing: false
            });
            this.props.onEdit(this.props, this.state);
            target.blur();
        }
    }

    handleBlur = () => {
        if (this.state.editing) {
            this.setState({
                editing: false
            });
            if (
                this.props.onBlur
            )
                this.props.onBlur(this.props, this.state)
        }
    }

    handleDeleteClick = e => {
        e.stopPropagation();
        if (
            this.props.onDelete
        )
            this.props.onDelete(this.props);
    }

    handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.onSelect)
            this.props.onSelect(this.props);
    }

    render = () => {
        const {
            props: {
                className,
                type,
                inputType,
                onDelete: deletable,
                onEdit: editable,
                onDrag,
                selected,
                danger,
                disabled,
                align,
                title,
                subtitle,
                children,
                footer,
                style,
                tagname,
                hoverButtons,
            },
            state: {
                editing,
                input,
            },
            handleInput,
            handleClick,
            handleEditClick,
            beginEdit,
            saveEditOnEnter,
            handleDeleteClick,
            handleBlur,
            inputRef,
            ref,
        } = this;

        const tag = {
            name: tagname || 'div'
        };

        const buttonTile = type === 'tile'
            &&
            (
                hoverButtons.length
                ||
                (
                    !!editable
                    &&
                    !!deletable
                )
            );

        return (
            <tag.name
                ref={ref}
                className={`Pill ${
                    className
                    } ${
                    selected ? 'selected' : ''
                    } ${
                    danger ? 'danger' : ''
                    } ${
                    editing ? 'editing' : ''
                    } ${
                    align ? `align-${align}` : ''
                    } ${
                    disabled ? 'disabled' : ''
                    } ${
                    type === 'tile' ? 'tile' : ''
                    } ${
                    buttonTile ? 'with-button-tile' : ''
                    }`}
                style={style}
                onClick={handleClick}
                onBlur={handleBlur}
            >
                <div>
                    {/* TITLE */}
                    {editing ? (
                        // inputType === 'select' ? (
                        //     <select
                        //         onChange={handleInput}
                        //         onKeyDown={saveEditOnEnter}
                        //         value={input}
                        //         onBlur={handleBlur}
                        //         autoFocus={true}
                        //     >
                        //     </select>
                        // ) : (
                        <input
                            ref={inputRef}
                            type={inputType}
                            className="title"
                            onChange={handleInput}
                            onKeyDown={saveEditOnEnter}
                            value={input}
                            onBlur={handleBlur}
                            autoFocus={true}
                        />
                        // )
                    ) : (
                            <h5
                                className="title"
                                onClick={handleEditClick}
                            >{normalCase(title)}</h5>
                        )}
                    {/* SUBTITLE */}
                    {subtitle ? (
                        <h6 className="subtitle">{subtitle}</h6>
                    ) : null}
                </div>
                {/* CONTENTS */}
                {children}
                {/* FOOTER */}
                {footer ? (
                    <h6 className="footer">{footer}</h6>
                ) : null}
                {/* DRAG BUTTON */}
                {onDrag ? (
                    <button
                        className="drag"
                        children="drag"
                    />
                ) : null}
                {/* HOVER BUTTONS */}
                {!editing ?
                    buttonTile ? (
                        <ButtonTile
                            buttonProps={[
                                ...hoverButtons,
                                editable ? {
                                    text: "Rename",
                                    onClick: beginEdit
                                } : null,
                                deletable ? {
                                    text: "Delete",
                                    className: "danger",
                                    onClick: handleDeleteClick
                                } : null,
                            ]}
                        />
                    ) : (
                            deletable ? (
                                <DeleteButton
                                    className="delete"
                                    onClick={handleDeleteClick}
                                    children="x"
                                />
                            ) : null
                        ) : null}
            </tag.name>
        );
    }
}
