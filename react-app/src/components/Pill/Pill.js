import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import './Pill.scss';
import DeleteButton from '../DeleteButton/DeleteButton';
import ButtonTile from '../ButtonTile/ButtonTile';

export default class Pill extends Component {

    static propTypes = {
        type: PropTypes.oneOf([
            'pill',
            'tile'
        ]),
        inputValue: PropTypes.any,
        // BOOLEANS
        selected: PropTypes.bool,
        editing: PropTypes.bool,
        default: PropTypes.bool,
        danger: PropTypes.bool,
        disabled: PropTypes.bool,
        // STRINGS
        inputType: PropTypes.string,
        align: PropTypes.oneOf([
            'left',
            'right',
            'center'
        ]),
        tagname: PropTypes.string,
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        subtitle: PropTypes.string,
        // CONTENT
        children: PropTypes.any,
        // HOVER BUTTONS
        hoverButtons: PropTypes.arrayOf(PropTypes.object),
        // CALLBACKS
        onSelect: PropTypes.func,
        onDisabledSelect: PropTypes.func,
        onBlur: PropTypes.func,
        onEdit: PropTypes.func,
        onDrag: PropTypes.func,
        onDrop: PropTypes.func,
        // STYLES
        style: PropTypes.object,
    };

    state = {
        editing: this.props.editing || false,
        input: this.props.inputValue || this.props.title || "",
    };

    componentDidMount = () => {
        window.addEventListener('keydown', this.blurOnEsc);
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.blurOnEsc);
    }

    blurOnEsc = ({ key, target }) => {
        if (key === 'Escape')
            target.blur();
    }

    handleEditClick = e => {
        e.stopPropagation();
        if (
            !this.props.disabled
            &&
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

    handleInput = ({ target: { value } }) => this.setState({
        input: value
    });

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
                !this.props.disabled
                &&
                this.props.onBlur
            )
                this.props.onBlur(this.props, this.state)
        }
    }

    handleDeleteClick = e => {
        e.stopPropagation();
        if (
            !this.props.disabled
            &&
            this.props.onDelete
        )
            this.props.onDelete(this.props);
    }

    handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.props.disabled) {
            if (this.props.onSelect)
                this.props.onSelect(this.props);
        } else {
            if (this.props.onDisabledSelect)
                this.props.onDisabledSelect(this.props);
        }
    }

    render = () => {
        const {
            props: {
                type,
                inputType = "text",
                selectable,
                onSelect,
                onDelete: deletable,
                onEdit: editable,
                onDrag,
                selected,
                default: defaulted,
                danger,
                disabled,
                align,
                title,
                subtitle,
                children,
                footer,
                style,
                tagname,
                hoverButtons = []
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
        } = this;

        const tag = {
            name: tagname || 'div'
        };

        return (
            <tag.name
                className={`Pill ${
                    selectable !== false ?
                        selected ? 'selected' :
                            onSelect ? 'selectable' : ''
                        : ''
                    } ${
                    defaulted ? 'default' : ''
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
                    }`}
                style={style}
                onClick={handleClick}
                onBlur={handleBlur}
            >
                <div>
                    {/* TITLE */}
                    {editing ? (
                        inputType === 'select' ? (
                            <select
                                onChange={handleInput}
                                onKeyDown={saveEditOnEnter}
                                value={input}
                                onBlur={handleBlur}
                                autoFocus={true}
                            >
                            </select>
                        ) : (
                                <input
                                    type={inputType}
                                    className="title"
                                    onChange={handleInput}
                                    onKeyDown={saveEditOnEnter}
                                    value={input}
                                    onBlur={handleBlur}
                                    autoFocus={true}
                                />
                            )
                    ) : (
                            <h5
                                className="title"
                                onClick={handleEditClick}
                            >{title}</h5>
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
                {!editing ? (
                    type === 'tile'
                    &&
                    (
                        hoverButtons.length
                        +
                        Boolean(editable)
                        +
                        Boolean(deletable)
                    ) > 1
                ) ? (
                        <ButtonTile
                            buttonProps={[
                                ...hoverButtons,
                                editable ? {
                                    text: "Rename",
                                    onClick: beginEdit
                                } : null,
                                deletable ? {
                                    text: "Delete",
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
