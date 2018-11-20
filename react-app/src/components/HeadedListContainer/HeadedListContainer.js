import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeadedContainer from '../HeadedContainer/HeadedContainer';
import ListContainer from '../ListContainer/ListContainer';
import './HeadedListContainer.scss';

export default class HeadedListContainer extends Component {

    static propTypes = {
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
        onAddListItem: PropTypes.func,
    };

    state = {
        currentFilterIndex: -1,
        currentSortIndex: -1,
    };

    render = () => {
        const {
            props: {
                id,
                className,
                title,
                filters,
                filters: {
                    [currentFilterIndex]: {
                        name: currentFilterName,
                        callback: currentFilterCallback,
                    } = {}
                } = [],
                sorts,
                sorts: {
                    [currentSortIndex]: {
                        name: currentSortName,
                        callback: currentSortCallback,
                    } = {}
                } = [],
                listTitle,
                listItems,
                renderListItem,
                addButtonType,
                addButtonInputType,
                onAddListItem,
                beforeList,
                afterList,
            },
            state: {
                currentFilterIndex,
                currentSortIndex,
            }
        } = this;

        return (
            <HeadedContainer
                id={id}
                className={`HeadedListContainer ${className}`}
                title={(
                    <span className="title">{title}{currentFilterCallback ? ` | ${currentFilterName}` : ''}</span>
                )}
                right={(
                    <span>
                        {filters && filters.length ? (
                            <span>
                                <span>Filter: {currentFilterName}</span>
                                {/* INSERT REACT SELECT HERE */}
                            </span>
                        ) : null}
                        {sorts && sorts.length ? (
                            <span>
                                <span>Sort By: {currentSortName}</span>
                                {/* INSERT REACT SELECT HERE */}
                            </span>
                        ) : null}
                    </span>
                )}
            >
                {beforeList}
                <ListContainer
                    title={listTitle}
                    items={listItems}
                    renderItem={renderListItem}
                    addButtonType={addButtonType}
                    addButtonInputType={addButtonInputType}
                    onAddItem={onAddListItem}
                    filter={currentFilterCallback}
                    sort={currentSortCallback}
                />
                {afterList}
            </HeadedContainer>
        );
    }
}
