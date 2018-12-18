import React from 'react';
import PropTypes from 'prop-types';
import './ListContainer.scss';
import AddButton from '../AddButton/AddButton';

ListContainer.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    className: PropTypes.string,
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    creating: PropTypes.bool,
    createItem: PropTypes.any,
    addButton: PropTypes.object,
    filter: PropTypes.func,
    sort: PropTypes.func,
};

export default function ListContainer({
    className = '',
    title,
    label,
    items,
    renderItem,
    creating,
    createItem,
    addButton,
    filter = () => true,
    sort = () => -1, // ({ nodeId: a }, { nodeId: b }) => a < b,
}) {
    return (
        <div className={`ListContainer ${className}`}>
            {title ? (
                <h5 className="title">{title}</h5>
            ) : null}
            {label ? (
                <div className="label">{label}</div>
            ) : null}
            <ul>
                {items.slice()
                    .sort(sort)
                    .filter(filter)
                    .map(renderItem)}
                {creating ? createItem : null}
                {addButton ? (
                    <AddButton
                        {...addButton}
                    />
                ) : null}
            </ul>
        </div>
    );
}
