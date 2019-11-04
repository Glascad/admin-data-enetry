import React from 'react';
import { Navigator, useQuery, ApolloWrapper, Ellipsis } from '../../../components';
import SingleSystem from './SingleSystem/SingleSystem';
import SystemSearch from './SystemSearch/SystemSearch';
import Parts from './Parts/Parts';
import gql from 'graphql-tag';
import F from '../../../schemas';
import { parseSearch } from '../../../utils';

const subroutes = {
    SystemSearch,
    Parts,
    SingleSystem,
};

Manufacturer.navigationOptions = ({
    location: {
        search,
    },
}) => ({
    subroutes,
    path: '/manufacturer',
    requiredURLParams: ['manufacturerId'],
    name: (
        <ApolloWrapper
            query={{
                query: gql`
                    query ManufacturerById($id: Int!) {
                        manufacturerById(id: $id) {
                            __typename
                            nodeId
                            id
                            name
                        }
                    }
                `,
                variables: {
                    id: +parseSearch(search).manufacturerId,
                },
            }}
        >
            {({
                queryResult: {
                    _manufacturer: {
                        name = '',
                    } = {},
                },
                rawQueryStatus: {
                    loading,
                },
            }) => loading ?
                    <Ellipsis />
                    :
                    name
            }
        </ApolloWrapper >
    ),
});

const query = gql`query ManufacturerById($id: Int!) {
    manufacturerById(id: $id) {
        ...EntireManufacturer
    }
}
${F.MNFG.ENTIRE_MANUFACTURER}
`;

export default function Manufacturer({
    location: {
        search,
    },
}) {
    const { manufacturerId } = parseSearch(search);
    const [fetchQuery, queryResult] = useQuery({ query, variables: { id: +manufacturerId } });
    const { _manufacturer } = queryResult;
    return (
        <Navigator
            routeProps={{ _manufacturer, fetchQuery }}
            routes={subroutes}
        />
    );
}
