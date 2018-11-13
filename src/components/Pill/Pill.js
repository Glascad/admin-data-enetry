import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Pill.scss';

export default class Pill extends Component {

    static propTypes = {
        // BOOLEANS
        selected: PropTypes.bool,
        editable: PropTypes.bool,
        deletable: PropTypes.bool,
        default: PropTypes.bool,
        draggable: PropTypes.bool,
        // STRINGS
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        // CONTENT
        contents: PropTypes.any,
        // CALLBACKS
        onSelect: PropTypes.func,
        onEdit: PropTypes.func,
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
        this.setState(({ editing }) => ({ editing: !editing }));
    };

    handleDeleteClick = e => {
        e.stopPropagation();
        if (this.props.onDelete)
            this.props.onDelete();
    }

    handleClick = e => {
        e.stopPropagation();
        if (this.props.onSelect)
            this.props.onSelect(this.props.selected);
    }

    render = () => {
        const {
            props: {
                onSelect: selectable,
                selected,
                editable,
                deletable,
                default: defaulted,
                draggable,
                title,
                subtitle,
                contents,
                style,
            },
            state: {
                editing,
            },
            handleClick,
            handleEditClick,
            handleDeleteClick,
        } = this;
        return (
            <div
                className={`Pill
                    ${selected ? 'selected' :
                        selectable ? 'selectable' : ''}
                    ${defaulted ? 'default' : ''}
                    ${editing ? 'editing' : ''}
                `}
                style={style}
                onClick={handleClick}
            >
                {/* EDIT BUTTON */}
                {editable ? (
                    <button
                        className="edit"
                        onClick={handleEditClick}
                        children="edit"
                    />
                ) : null}
                {/* TITLE */}
                <h5>{title}</h5>
                {/* SUBTITLE */}
                {subtitle ? (
                    <h6>{subtitle}</h6>
                ) : null}
                {/* CONTENTS */}
                {contents}
                {/* DRAG BUTTON */}
                {draggable ? (
                    <button
                        className="drag"
                        children="drag"
                    />
                ) : null}
                {/* DELETE  BUTTON */}
                {deletable ? (
                    <button
                        className="delete"
                        onClick={handleDeleteClick}
                        children="delete"
                    />
                ) : null}
            </div>
        );
    }
}
