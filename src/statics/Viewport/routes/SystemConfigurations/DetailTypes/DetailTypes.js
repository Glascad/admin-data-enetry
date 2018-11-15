import React from 'react';
import { Query } from 'react-apollo';

import DETAIL_TYPES_QUERY from './detail-types-query';

import { HeadedListContainer, Pill } from '../../../../../components';

export default function DetailTypes() {
    return (
        <Query
            query={DETAIL_TYPES_QUERY}
        >
            {({
                loading,
                error,
                data: {
                    allDetailTypes: {
                        nodes: detailTypes = [],
                    } = {},
                } = {},
            }) => (
                    <div>
                        <HeadedListContainer
                            title="Detail Types"
                            listItems={detailTypes}
                            renderListItem={({
                                nodeId,
                                type,
                            }) => (
                                    <Pill
                                        key={nodeId}
                                        nodeId={nodeId}
                                        tagname="li"
                                        title={type}
                                    />
                                )}
                        />
                    </div>
                )}
        </Query>
    );
}
