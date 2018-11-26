import React from 'react';
import { Query } from 'react-apollo';

import INFILL_TYPES_QUERY from './infill-types-query';

import { HeadedListContainer, Pill } from '../../../../../components';

export default function InfillTypes() {
    return (
        <Query
            query={INFILL_TYPES_QUERY}
        >
            {({
                loading,
                error,
                data: {
                    allInfillPocketTypes: {
                        nodes: types = []
                    } = {},
                    allInfillPocketSizes: {
                        nodes: sizes = []
                    } = {},
                } = {}
            }) => (
                    <div>
                        <HeadedListContainer
                            title="Infill Pocket Types"
                            list={{
                                items: types,
                                renderItem: ({
                                    nodeId,
                                    type,
                                }) => (
                                        <Pill
                                            key={nodeId}
                                            tagname="li"
                                            title={type}
                                        />
                                    )
                            }}
                        />
                        <HeadedListContainer
                            title="Infill Pocket Sizes"
                            list={{
                                items: sizes,
                                renderItem: ({
                                    nodeId,
                                    size
                                }) => (
                                        <Pill
                                            key={nodeId}
                                            tagname="li"
                                            title={size}
                                        />
                                    )
                            }}
                        />
                    </div>
                )}
        </Query>
    );
}
