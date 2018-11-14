import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Pill.scss';

export default class Pill extends Component {

    static propTypes = {
        type: PropTypes.oneOf(['pill', 'tile']),
        // BOOLEANS
        selected: PropTypes.bool,
        editable: PropTypes.bool,
        deletable: PropTypes.bool,
        default: PropTypes.bool,
        draggable: PropTypes.bool,
        // STRINGS
        align: PropTypes.oneOf(['left', 'right', 'center']),
        tagname: PropTypes.string,
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
                type,
                onSelect: selectable,
                selected,
                editable,
                deletable,
                default: defaulted,
                draggable,
                align,
                title,
                subtitle,
                contents,
                footer,
                style,
                tagname
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
                    editing ? 'editing' : ''
                    } ${
                    align ? `align-${align}` : ''
                    } ${
                    type === 'tile' ? 'tile' : ''
                    }`}
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
                    <button
                        className="delete"
                        onClick={handleDeleteClick}
                        children="delete"
                    />
                ) : null}
            </tag.name>
        );
    }
}
