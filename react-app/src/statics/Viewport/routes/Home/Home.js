import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import SYSTEMS_QUERY from './home-query';

import { HeadedListContainer, Pill } from '../../../../components';

export default function Home() {
    return (
        <Query
            query={SYSTEMS_QUERY}
        >
            {({
                loading,
                error,
                data: {
                    allSystems: {
                        nodes: systems = [],
                    } = {},
                } = {},
            }) => (
                    <HeadedListContainer
                        id="Home"
                        title="Recently Updated Systems"
                        list={{
                            items: systems,
                            renderItem: ({
                                nodeId: systemNID,
                                name: systemName,
                                manufacturerByManufacturerId: {
                                    nodeId: mnfgNID,
                                    name: mnfgName
                                },
                                id
                            }) => (
                                    <Link
                                        key={id}
                                        to={`/system/${mnfgNID}/${systemNID}`}
                                    >
                                        <Pill
                                            tagname="li"
                                            type="tile"
                                            align="left"
                                            title={mnfgName}
                                            subtitle={systemName}
                                            footer={`Last Updated: `}
                                        />
                                    </Link>
                                )
                        }}
                    />
                )}
        </Query>
    );
}
