import React from 'react';
import PropTypes from 'prop-types';
import './ListContainer.scss';
import AddButton from '../AddButton/AddButton';

ListContainer.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    addButtonType: PropTypes.string,
    addButtonInputType: PropTypes.string,
    onAddItem: PropTypes.func,
    filter: PropTypes.func,
    sort: PropTypes.func,
};

export default function ListContainer({
    title,
    items,
    renderItem,
    addButtonType,
    addButtonInputType,
    onAddItem,
    filter = () => true,
    sort = () => 0,
}) {
    return (//[
        <div className="ListContainer">
            {title ? (
                <h5 className="title">{title}</h5>
            ) : null}
            <ul>
                {items.slice()
                    .sort(sort)
                    .filter(filter)
                    .map(renderItem)}
                {onAddItem ? (
                    <AddButton
                        type={addButtonType}
                        inputType={addButtonInputType}
                        onAdd={onAddItem}
                    />
                ) : null}
            </ul>
        </div>
    );//];
}
