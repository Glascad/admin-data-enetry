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
        list: PropTypes.object.isRequired,
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
                nestLevel,
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
                list,
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
                nestLevel={nestLevel}
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
                    filter={currentFilterCallback}
                    sort={currentSortCallback}
                    {...list}
                />
                {afterList}
            </HeadedContainer>
        );
    }
}
