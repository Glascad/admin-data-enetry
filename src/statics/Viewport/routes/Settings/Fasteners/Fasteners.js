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
                            sorts={[]}
                            listItems={[]}
                            renderListItem={() => null}
                        />
                        <HeadedListContainer
                            title="Fastener Head Types"
                            sorts={[]}
                            listItems={[]}
                            renderListItem={() => null}
                        />
                        <HeadedListContainer
                            title="Fastener Thread Representations"
                            sorts={[]}
                            listItems={[]}
                            renderListItem={() => null}
                        />
                        <HeadedListContainer
                            title="Thread Diameters"
                            sorts={[]}
                            listItems={[]}
                            renderListItem={() => null}
                        />
                    </div>
                )}
        </Query>
    );
}
