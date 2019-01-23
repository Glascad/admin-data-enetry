import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NavLink } from 'react-router-dom';

import { removeNullValues } from '../../utils';

export default function SystemLink({
    systemNID,
}) {
    return (
        <Query
            query={gql`query System($systemNID:ID!){
                system(nodeId:$systemNID){
                    nodeId
                    id
                    name
                    manufacturerByManufacturerId{
                        nodeId
                        id
                        name
                    }
                }
            }`}
            variables={{
                systemNID
            }}
        >
            {status => {
                const {
                    data,
                    data: {
                        system: {
                            nodeId,
                            name = "",
                            manufacturerByManufacturerId: {
                                name: mnfgName = "",
                            } = {},
                        } = {},
                    } = {},
                } = removeNullValues(status);
                return (name || mnfgName ? (
                    <NavLink
                        to={`/system-data/info/database?systemNID=${nodeId}`}
                        id="SystemLink"
                        className="item"
                    >
                        {
                            mnfgName
                        } {
                            name
                        }
                    </NavLink>
                ) : null);
            }}
        </Query>
    );
}
