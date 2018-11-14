import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeadedContainer from '../HeadedContainer/HeadedContainer';
import ListContainer from '../ListContainer/ListContainer';
import './HeadedListContainer.scss';

export default class HeadedListContainer extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        filters: PropTypes.arrayOf(PropTypes.exact({
            name: PropTypes.string.isRequired,
            callback: PropTypes.func.isRequired,
        })),
        sorts: PropTypes.arrayOf(PropTypes.exact({
            name: PropTypes.string.isRequired,
            callback: PropTypes.func.isRequired
        })),
        listTitle: PropTypes.string,
        listItems: PropTypes.array.isRequired,
        renderListItem: PropTypes.func.isRequired,
        addListItem: PropTypes.func,
    };

    state = {
        currentFilterIndex: -1,
        currentSortIndex: -1,
    };

    render = () => {
        const {
            props: {
                title,
                filters,
                sorts,
                listTitle,
                listItems,
                renderListItem,
                addListItem,
                childrenBeforeList,
                childrenAfterList,
            },
            state: {
                currentFilterIndex,
                currentSortIndex,
            }
        } = this;

        const currentFilter = (filters || [])[currentFilterIndex];
        const currentSort = (sorts || [])[currentSortIndex];

        return (
            <HeadedContainer
                className="HeadedListContainer"
                title={(
                    <span className="title">{title}{currentFilter ? ` | ${currentFilter.name}` : ''}</span>
                )}
                right={(
                    <span>
                        {filters && filters.length ? (
                            <span>
                                <span>Filter: </span>
                                {/* INSERT REACT SELECT HERE */}
                            </span>
                        ) : null}
                        {sorts && sorts.length ? (
                            <span>
                                <span>Sort By: </span>
                                {/* INSERT REACT SELECT HERE */}
                            </span>
                        ) : null}
                    </span>
                )}
            >
                {childrenBeforeList}
                <ListContainer
                    title={listTitle}
                    items={listItems}
                    renderItem={renderListItem}
                    addItem={addListItem}
                    filter={currentFilter ? currentFilter.callback : undefined}
                    sort={currentSort ? currentSort.callback : undefined}
                />
                {childrenAfterList}
            </HeadedContainer>
        );
    }
}
