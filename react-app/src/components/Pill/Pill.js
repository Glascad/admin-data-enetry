import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Pill.scss';
import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';

export default class Pill extends Component {

    static propTypes = {
        type: PropTypes.oneOf([
            'pill',
            'tile'
        ]),
        // BOOLEANS
        selected: PropTypes.bool,
        deletable: PropTypes.bool,
        editable: PropTypes.bool,
        default: PropTypes.bool,
        danger: PropTypes.bool,
        draggable: PropTypes.bool,
        invalid: PropTypes.bool,
        // STRINGS
        align: PropTypes.oneOf([
            'left',
            'right',
            'center'
        ]),
        tagname: PropTypes.string,
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        subtitle: PropTypes.string,
        // CONTENT
        contents: PropTypes.any,
        // CALLBACKS
        onSelect: PropTypes.func,
        onBlur: PropTypes.func,
        onEdit: PropTypes.func,
        onEditComplete: PropTypes.func,
        onDelete: PropTypes.func,
        onDrag: PropTypes.func,
        onDrop: PropTypes.func,
        // STYLES
        style: PropTypes.object
    };

    state = {
        editing: false,
    };

    handleEditClick = e => {
        e.stopPropagation();
        console.log(this.props);
        if (this.props.editable)
            this.setState(({ editing }) => ({ editing: !editing }));
        if (this.props.onEdit)
            this.props.onEdit(this.props);
    };

    handleDeleteClick = e => {
        e.stopPropagation();
        if (this.props.onDelete)
            this.props.onDelete(this.props);
    }

    handleClick = e => {
        e.stopPropagation();
        if (this.props.onSelect)
            this.props.onSelect(this.props);
    }

    render = () => {
        const {
            props: {
                type,
                onSelect: selectable,
                onDelete: deletable,
                onEdit,
                onBlur,
                selected,
                editable,
                default: defaulted,
                danger,
                draggable,
                invalid,
                align,
                title,
                subtitle,
                contents,
                footer,
                style,
                tagname,
            },
            state: {
                editing,
            },
            handleClick,
            handleEditClick,
            handleDeleteClick,
        } = this;

        const tag = {
            name: tagname || 'div'
        };

        return (
            <tag.name
                className={`Pill ${
                    selected ? 'selected' :
                        selectable ? 'selectable' : ''
                    } ${
                    defaulted ? 'default' : ''
                    } ${
                    danger ? 'danger' : ''
                    } ${
                    editing ? 'editing' : ''
                    } ${
                    align ? `align-${align}` : ''
                    } ${
                    invalid ? 'invalid' : ''
                    } ${
                    type === 'tile' ? 'tile' : ''
                    }`}
                style={style}
                onClick={handleClick}
                onBlur={onBlur}
            >
                {/* EDIT BUTTON */}
                {editable || onEdit ? (
                    <EditButton
                        className="edit"
                        onClick={handleEditClick}
                        children="edit"
                    />
                ) : null}
                <div>
                    {/* TITLE */}
                    <h5 className="title">{title}</h5>
                    {/* SUBTITLE */}
                    {subtitle ? (
                        <h6 className="subtitle">{subtitle}</h6>
                    ) : null}
                </div>
                {/* CONTENTS */}
                {contents}
                {/* FOOTER */}
                {footer ? (
                    <h6 className="footer">{footer}</h6>
                ) : null}
                {/* DRAG BUTTON */}
                {draggable ? (
                    <button
                        className="drag"
                        children="drag"
                    />
                ) : null}
                {/* DELETE  BUTTON */}
                {deletable ? (
                    <DeleteButton
                        className="delete"
                        onClick={handleDeleteClick}
                        children="x"
                    />
                ) : null}
            </tag.name>
        );
    }
}
