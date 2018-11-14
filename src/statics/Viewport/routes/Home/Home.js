import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import HeadedListContainer from '../../../../components/HeadedListContainer/HeadedListContainer';
import Pill from '../../../../components/Pill/Pill';

function Home({
    data,
    data: {
        allSystems: {
            nodes: systems = [],
        } = {},
    },
}) {
    console.log(systems);
    return (
        <HeadedListContainer
            id="Home"
            title="Recently Updated Systems"
            listItems={systems}
            renderListItem={({
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
                )}
        />
    );
}

export default graphql(gql`
    query{
        allSystems{
            nodes{
                id
                nodeId
                name
                manufacturerByManufacturerId{
                    id
                    nodeId
                    name
                }
            }
        }
    }
`)(Home);
