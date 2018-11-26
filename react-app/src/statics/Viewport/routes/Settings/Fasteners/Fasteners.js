import React from 'react';
import { Query } from 'react-apollo';

import FASTENER_QUERY from './fastener-query';

import { HeadedListContainer, Pill } from '../../../../../components';

export default function Fasteners() {
    return (
        <Query
            query={FASTENER_QUERY}
        >
            {({

            }) => (
                    <div>
                        <HeadedListContainer
                            title="Fastener Types"
                            list={{
                                items: [],
                                renderItem: () => null
                            }}
                        />
                        <HeadedListContainer
                            title="Fastener Head Types"
                            list={{
                                items: [],
                                renderItem: () => null
                            }}
                        />
                        <HeadedListContainer
                            title="Fastener Thread Representations"
                            list={{
                                items: [],
                                renderItem: () => null
                            }}
                        />
                        <HeadedListContainer
                            title="Thread Diameters"
                            list={{
                                items: [],
                                renderItem: () => null
                            }}
                        />
                    </div>
                )}
        </Query>
    );
}
