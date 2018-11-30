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
    nestLevel: PropTypes.number,
};

export default function ListContainer({
    className,
    title,
    items,
    renderItem,
    creating,
    createItem,
    addButton,
    filter = () => true,
    sort = () => 0,
    nestLevel = 0,
}) {
    return (
        <div className={`ListContainer ${
            className
            } ${
            // Number.prototype[Symbol.iterator] is in `public/index.html`
            [...nestLevel]
                .map(() => "nested")
                .join("-")
            ||
            ""
            }`}>
            {title ? (
                <h5 className="title">{title}</h5>
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
