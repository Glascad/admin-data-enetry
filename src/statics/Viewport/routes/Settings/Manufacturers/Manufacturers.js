import React from 'react';
import { Query } from 'react-apollo';

import MNFG_QUERY from './mnfg-query';

import { HeadedListContainer, Pill } from '../../../../../components';

export default function Manufacturers() {
    return (
        <Query
            query={MNFG_QUERY}
        >
            {({
                loading,
                error,
                data: {
                    allManufacturers: {
                        nodes: manufacturers = []
                    } = {}
                } = {}
            }) => (
                    <HeadedListContainer
                        id="Manufacturers"
                        title="Manufacturers"
                        sorts={[
                            {
                                name: "Alphabetical",
                                callback: () => 0,
                            }
                        ]}
                        listItems={manufacturers}
                        renderListItem={({
                            nodeId,
                            id,
                            name
                        }) => (
                                <Pill
                                    key={nodeId}
                                    type="tile"
                                    align="left"
                                    tagname="li"
                                    title={name}
                                    footer="Last Updated:"
                                />
                            )}
                    />
                )}
        </Query>
    );
}
