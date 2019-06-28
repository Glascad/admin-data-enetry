import React, { PureComponent, createRef } from 'react';
// import PropTypes from 'prop-types';
import './Pill.scss';
import DeleteButton from '../DeleteButton/DeleteButton';
import ButtonTile from '../ButtonTile/ButtonTile';

export default class Pill extends PureComponent {

    // static propTypes = {
    //     type: PropTypes.oneOf([
    //         'pill',
    //         'tile'
    //     ]),
    //     inputValue: PropTypes.any,
    //     // BOOLEANS
    //     selected: PropTypes.bool,
    //     editing: PropTypes.bool,
    //     default: PropTypes.bool,
    //     danger: PropTypes.bool,
    //     disabled: PropTypes.bool,
    //     // STRINGS
    //     inputType: PropTypes.string,
    //     align: PropTypes.oneOf([
    //         'left',
    //         'right',
    //         'center'
    //     ]),
    //     tagname: PropTypes.string,
    //     title: PropTypes.oneOfType([
    //         PropTypes.string,
    //         PropTypes.number,
    //     ]),
    //     subtitle: PropTypes.string,
    //     // CONTENT
    //     children: PropTypes.any,
    //     // HOVER BUTTONS
    //     hoverButtons: PropTypes.arrayOf(PropTypes.object),
    //     // CALLBACKS
    //     onSelect: PropTypes.func,
    //     onDisabledSelect: PropTypes.func,
    //     onBlur: PropTypes.func,
    //     onEdit: PropTypes.func,
    //     onDrag: PropTypes.func,
    //     onDrop: PropTypes.func,
    //     // STYLES
    //     style: PropTypes.object,
    // };

    static defaultProps = {
        editing: false,
        inputType: "text",
        hoverButtons: [],
        title: "",
    };

    state = {
        editing: this.props.editing,
        input: this.props.inputValue || this.props.title,
    };

    ref = createRef();

    componentDidMount = () => {
        window.addEventListener('keydown', this.blurOnEsc);
        this.componentDidUpdate({});
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.blurOnEsc);
    }

    componentDidUpdate = ({ editing: oldEditing }) => {
        const {
            props: {
                editing: newEditing,
            },
            ref,
        } = this;

        if (newEditing !== oldEditing) {
            this.setState({
                editing: newEditing,
                input: this.props.inputValue || this.props.title,
            });
        }

        if (
            ref
            &&
            ref.current
            &&
            ref.current.style
        ) {
            ref.current.style.width = 0;
            ref.current.style.width = `${ref.current.scrollWidth}px`;
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
                                    ref={ref}
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
