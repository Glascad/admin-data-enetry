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
    addButton: PropTypes.object,
    filter: PropTypes.func,
    sort: PropTypes.func,
    nestLevel: PropTypes.number,
};

export default function ListContainer({
    title,
    items,
    renderItem,
    addButton,
    filter = () => true,
    sort = () => 0,
    nestLevel = 0,
}) {
    return (
        <div className={`ListContainer ${[...nestLevel].map(() => "nested").join("-") || ""}`}>
            {title ? (
                <h5 className="title">{title}</h5>
            ) : null}
            <ul>
                {items.slice()
                    .sort(sort)
                    .filter(filter)
                    .map(renderItem)}
                {addButton ? (
                    <AddButton
                        {...addButton}
                    />
                ) : null}
            </ul>
        </div>
    );
}
