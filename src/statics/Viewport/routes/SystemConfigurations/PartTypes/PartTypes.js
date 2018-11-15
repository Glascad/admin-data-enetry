import React from 'react';
import { Query } from 'react-apollo';

import PART_TYPES_QUERY from './part-types-query';

import { HeadedListContainer, Pill } from '../../../../../components';

export default function PartTypes() {
    return (
        <Query
            query={PART_TYPES_QUERY}
        >
            {({
                loading,
                error,
                data: {
                    allPartTypes: {
                        nodes: types = []
                    } = {},
                    allPartTags: {
                        nodes: tags = []
                    } = {},
                } = {}
            }) => (
                    <div>
                        <HeadedListContainer
                            title="Part Types"
                            listItems={types}
                            renderListItem={({
                                nodeId,
                                type
                            }) => (
                                    <Pill
                                        key={nodeId}
                                        tagname="li"
                                        title={type}
                                    />
                                )}
                        />
                        <HeadedListContainer
                            title="Part Types"
                            listItems={tags}
                            renderListItem={({
                                nodeId,
                                tag
                            }) => (
                                    <Pill
                                        key={nodeId}
                                        tagname="li"
                                        title={tag}
                                    />
                                )}
                        />
                    </div>
                )}
        </Query>
    );
}