import React from 'react';
import PropTypes from 'prop-types';
import './ListContainer.scss';

ListContainer.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    addItem: PropTypes.func,
    filter: PropTypes.func,
    sort: PropTypes.func,
};

export default function ListContainer({
    title,
    items,
    renderItem,
    addItem,
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
                {addItem ? (
                    <button
                        className="add"
                        children="+"
                        onClick={addItem}
                    />
                ) : null}
            </ul>
        </div>
    );//];
}
