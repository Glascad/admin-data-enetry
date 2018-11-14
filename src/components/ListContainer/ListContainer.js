import React from 'react';
import PropTypes from 'prop-types';
import './ListContainer.scss';

ListContainer.propTypes = {
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    addItem: PropTypes.func,
    filter: PropTypes.func,
    sort: PropTypes.func,
};

export default function ListContainer({
    items,
    renderItem,
    addItem,
    filter = () => true,
    sort = () => 0,
}) {
    return (
        <ul className="ListContainer">
            {items.slice()
                .sort(sort)
                .filter(filter)
                .map(renderItem)}
            {addItem ? (
                <button
                    className="add"
                    children="+"
                    onClick={addItem}
                />
            ) : null}
        </ul>
    );
}
