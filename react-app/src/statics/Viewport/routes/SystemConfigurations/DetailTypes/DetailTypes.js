import React from 'react';
import { Query } from 'react-apollo';

import {
    query,
} from './detail-types-gql';

import { HeadedListContainer, Pill } from '../../../../../components';

export default function DetailTypes() {
    return (
        <Query
            query={query}
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
