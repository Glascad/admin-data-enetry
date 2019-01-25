import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ListContainer.scss';
import _ from 'lodash';

import TitleBar from '../TitleBar/TitleBar';

import Select from 'react-select';

const noFilter = {
    label: "None",
    value: () => true,
};

const noSort = {
    label: "None",
    value: () => -1,
};

const noGroupBy = {
    label: "None",
    value: () => null,
};


export default class ListContainer extends Component {

    static propTypes = {
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

    state = {
        selectedFilter: noFilter,
        selectedSort: noSort,
        selectedGroupBy: noGroupBy,
    };

    render = () => {
        const {
            state: {
                selectedFilter,
                selectedSort,
                selectedGroupBy,
                selectedFilter: {
                    label: filterName,
                    value: filterCb,
                },
                selectedSort: {
                    label: sortName,
                    value: sortCb,
                },
                selectedGroupBy: {
                    label: groupByName,
                    value: groupByCb,
                },
            },
            props: {
                className = '',
                titleBar,
                label,
                items,
                renderItem,
                filters = [],
                sorts = [],
                groups = [],
                afterList,
            },
        } = this;

        const filtered = items.filter(filterCb);
        const sorted = filtered.sort(sortCb);

        const grouped = _.groupBy(sorted, groupByCb);
        const groupKeys = Object.keys(grouped);

        return (
            // <div className={`ListContainer ${className}`}>
            <>
                {titleBar && titleBar.title ? (
                    <TitleBar
                        {...titleBar}
                        right={(
                            <>
                                {filters.length ? (
                                    <span>
                                        <span>Filter By: {filterName}</span>
                                        <Select
                                            value={selectedFilter}
                                            options={[
                                                noFilter,
                                                ...filters
                                            ]}
                                            onChange={selectedFilter => this.setState({
                                                selectedFilter
                                            })}
                                        />
                                    </span>
                                ) : null}
                                {sorts.length ? (
                                    <span>
                                        <span>Sort By: {sortName}</span>
                                        <Select
                                            value={selectedSort}
                                            options={[
                                                noSort,
                                                ...sorts
                                            ]}
                                            onChange={selectedSort => this.setState({
                                                selectedSort
                                            })}
                                        />
                                    </span>
                                ) : null}
                                {groups.length ? (
                                    <span>
                                        <span>Group By: {groupByName}</span>
                                        <Select
                                            value={selectedGroupBy}
                                            options={[
                                                noGroupBy,
                                                ...groups
                                            ]}
                                            onChange={selectedGroupBy => this.setState({
                                                selectedGroupBy
                                            })}
                                        />
                                    </span>
                                ) : null}
                            </>
                        )}
                    />
                ) : label ? (
                    <div className="label">
                        {label}
                    </div>
                ) : null}
                <ul className="list-container">
                    {groupKeys.length > 1 ? (
                        groupKeys.map(label => {
                            const list = grouped[label];
                            return (
                                <div className="grouped-list">
                                    <div className="label">
                                        {label}
                                    </div>
                                    <ul>
                                        {list.map(renderItem)}
                                    </ul>
                                </div>
                            )
                        })
                    ) : (
                            sorted.map(renderItem)
                        )}
                    {afterList}
                </ul>
            </>
            // </div>
        );
    }
}
